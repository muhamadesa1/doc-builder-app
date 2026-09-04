"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import * as fabric from "fabric";
import * as pdfjsLib from "pdfjs-dist";
import { jsPDF } from "jspdf";

export default function VisualPDFEditor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const fabricCanvas = useRef<fabric.Canvas | null>(null);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = new fabric.Canvas(canvasRef.current, {
      height: 800,
      width: 1000,
      backgroundColor: "#ffffff",
    });
    fabricCanvas.current = canvas;

    return () => { 
      canvas.dispose(); 
    };
  }, []);

  const handlePdfUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPdfFile(file);
    setIsLoading(true);

    try {
      pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`;

      const reader = new FileReader();
      reader.onload = async () => {
        try {
          const typedarray = new Uint8Array(reader.result as ArrayBuffer);
          const loadingTask = pdfjsLib.getDocument({ data: typedarray });
          const pdf = await loadingTask.promise;
          
          let totalHeight = 0;
          let maxPageWidth = 0;
          const pageDataUrls: { url: string; height: number; width: number }[] = [];

          for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const viewport = page.getViewport({ scale: 1.3 });
            
            const tempCanvas = document.createElement("canvas");
            const context = tempCanvas.getContext("2d");
            tempCanvas.height = viewport.height;
            tempCanvas.width = viewport.width;
            
            await page.render({ canvasContext: context!, viewport }).promise;

            pageDataUrls.push({
              url: tempCanvas.toDataURL(),
              height: viewport.height,
              width: viewport.width,
            });

            totalHeight += viewport.height;
            if (viewport.width > maxPageWidth) {
              maxPageWidth = viewport.width;
            }
          }

          // Tambahkan margin ekstra (+ 120px) di sebelah kanan supaya tidak terpotong
          const extraMarginRight = 120;
          const spacing = 30;

          if (fabricCanvas.current) {
            fabricCanvas.current.setDimensions({ 
              width: maxPageWidth + extraMarginRight, 
              height: totalHeight + (pdf.numPages * spacing) + 20 
            });
            fabricCanvas.current.clear();
          }

          let currentTop = 700;
          for (const pageData of pageDataUrls) {
            const img = await fabric.FabricImage.fromURL(pageData.url);
            
            const automaticLeft = 500;

            img.set({
              left: automaticLeft,
              top: currentTop,
              selectable: false,
              evented: false,
            });
            
            fabricCanvas.current?.add(img);
            currentTop += pageData.height + spacing;
          }

          fabricCanvas.current?.requestRenderAll();
          setIsLoading(false);
        } catch (err) {
          console.error("Gagal merender PDF:", err);
          alert("Gagal merender file PDF.");
          setIsLoading(false);
        }
      };
      reader.readAsArrayBuffer(file);
    } catch (err) {
      console.error("Gagal membaca file PDF:", err);
      alert("Gagal membaca file PDF.");
      setIsLoading(false);
    }
  };

  const handleCancelPDF = () => {
    setPdfFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    if (fabricCanvas.current) {
      fabricCanvas.current.clear();
      fabricCanvas.current.setDimensions({ width: 1000, height: 800 });
      fabricCanvas.current.requestRenderAll();
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      const dataUrl = event.target?.result as string;
      try {
        const img = await fabric.FabricImage.fromURL(dataUrl);
        img.scale(0.3);
        fabricCanvas.current?.add(img);
        fabricCanvas.current?.setActiveObject(img);
        fabricCanvas.current?.requestRenderAll();
      } catch (err) {
        console.error("Gagal memuat gambar:", err);
        alert("Gagal memuat file gambar.");
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDownloadPDF = () => {
    if (!fabricCanvas.current) return;
    setIsDownloading(true);

    try {
      fabricCanvas.current.discardActiveObject();
      fabricCanvas.current.requestRenderAll();

      // FIXED: Menambahkan multiplier: 1 agar sesuai dengan tipe data TDataUrlOptions di Fabric.js terbaru
      const dataURL = fabricCanvas.current.toDataURL({
        format: "png",
        quality: 1.0,
        multiplier: 1,
      });

      const canvasWidth = fabricCanvas.current.width || 1000;
      const canvasHeight = fabricCanvas.current.height || 800;

      const pdf = new jsPDF({
        orientation: canvasWidth > canvasHeight ? "landscape" : "portrait",
        unit: "px",
        format: [canvasWidth, canvasHeight],
      });

      pdf.addImage(dataURL, "PNG", 0, 0, canvasWidth, canvasHeight);
      pdf.save("dokumen-hasil-edit.pdf");
      setIsDownloading(false);
    } catch (err) {
      console.error("Gagal mendownload PDF:", err);
      alert("Terjadi kesalahan saat mendownload PDF.");
      setIsDownloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <header className="mb-4">
        <Link href="/" className="text-indigo-600 font-bold text-sm">← Kembali</Link>
        <h1 className="text-2xl font-bold mt-1">Visual PDF Editor (Drag & Drop)</h1>
      </header>

      {/* Panel Kontrol Atas */}
      <div className="bg-white p-4 rounded-xl shadow mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-6 flex-wrap">
          <div>
            <label className="block text-xs font-bold text-slate-500 mb-1">1. Upload PDF</label>
            <div className="flex items-center gap-2">
              <input 
                ref={fileInputRef} 
                type="file" 
                accept="application/pdf" 
                onChange={handlePdfUpload} 
                className="text-xs" 
              />
              {pdfFile && (
                <button
                  onClick={handleCancelPDF}
                  className="px-2.5 py-1 bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs rounded shadow transition duration-200"
                  title="Batalkan / Hapus PDF"
                >
                  ✕ Batalkan
                </button>
              )}
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 mb-1">2. Upload Tanda Tangan/Gambar</label>
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleImageUpload} 
              className="text-xs" 
            />
          </div>
        </div>

        {/* Tombol Download PDF */}
        <div>
          <button
            onClick={handleDownloadPDF}
            disabled={isDownloading || !pdfFile}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-lg shadow transition duration-200 disabled:opacity-50"
          >
            {isDownloading ? "Menyiapkan PDF..." : "📥 Download PDF Hasil Edit"}
          </button>
        </div>

        {isLoading && (
          <p className="text-xs text-indigo-600 font-semibold animate-pulse w-full">Menyesuaikan ukuran otomatis & merender halaman PDF...</p>
        )}
        
        <p className="text-[10px] text-slate-400 italic w-full">Tips: Sisi kanan kanvas kini diperlebar otomatis agar tidak ada teks yang terpotong.</p>
      </div>

      {/* Area Kanvas di Bawah */}
      <div ref={containerRef} className="w-full bg-white border-2 border-slate-300 rounded shadow-2xl p-4 overflow-auto max-h-[75vh] flex justify-start">
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
}