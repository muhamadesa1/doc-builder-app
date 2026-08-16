"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PDFDocument } from "pdf-lib";

export default function CombinePdfPage() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setSelectedFiles((prev) => [...prev, ...filesArray]);
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles(selectedFiles.filter((_, i) => i !== index));
  };

  const handleCombine = async () => {
    if (selectedFiles.length < 1) {
      alert("Pilih file PDF atau gambar terlebih dahulu!");
      return;
    }

    setIsProcessing(true);
    try {
      const mergedPdf = await PDFDocument.create();

      for (const file of selectedFiles) {
        const arrayBuffer = await file.arrayBuffer();

        if (file.type === "application/pdf") {
          // Kalau filenya PDF
          const pdf = await PDFDocument.load(arrayBuffer);
          const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
          copiedPages.forEach((page) => mergedPdf.addPage(page));
        } else if (file.type === "image/png" || file.type === "image/jpeg" || file.type === "image/jpg") {
          // Kalau filenya Gambar (PNG/JPG) dimasukkan jadi halaman PDF
          let image;
          if (file.type === "image/png") {
            image = await mergedPdf.embedPng(arrayBuffer);
          } else {
            image = await mergedPdf.embedJpg(arrayBuffer);
          }

          const page = mergedPdf.addPage([image.width, image.height]);
          page.drawImage(image, {
            x: 0,
            y: 0,
            width: image.width,
            height: image.height,
          });
        } else {
          alert(`Format file ${file.name} tidak didukung (hanya PDF, PNG, JPG).`);
        }
      }

      const mergedPdfBytes = await mergedPdf.save();
      const blob = new Blob([mergedPdfBytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);
    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan saat memproses file.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-100 flex flex-col">
      <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 px-6 py-3 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <Link href="/" className="text-sm font-medium text-slate-500 hover:text-slate-800 dark:hover:text-slate-200">
            ← Kembali ke Menu Utama
          </Link>
          <h1 className="text-lg font-bold">Tool Combine PDF & Gambar</h1>
        </div>
      </header>

      <div className="flex-1 max-w-3xl w-full mx-auto p-6 space-y-6">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 space-y-4">
          <h2 className="text-xl font-bold text-indigo-600">Gabungkan PDF & Gambar Jadi Satu PDF</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Kamu bisa pilih banyak file sekaligus (Format: <b>PDF, PNG, JPG</b>). Urutan file sesuai dengan daftar di bawah.
          </p>

          <input
            type="file"
            accept="application/pdf,image/png,image/jpeg,image/jpg"
            multiple
            onChange={handleFileChange}
            className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 cursor-pointer"
          />

          {selectedFiles.length > 0 && (
            <div className="space-y-2 mt-4">
              <h3 className="font-semibold text-sm">Daftar File Dipilih ({selectedFiles.length}):</h3>
              <ul className="space-y-2 max-h-60 overflow-y-auto pr-2">
                {selectedFiles.map((file, idx) => (
                  <li key={idx} className="flex justify-between items-center p-2 bg-slate-50 dark:bg-slate-700 rounded text-xs">
                    <span className="truncate flex-1">{idx + 1}. {file.name} ({Math.round(file.size / 1024)} KB)</span>
                    <button onClick={() => removeFile(idx)} className="text-rose-600 hover:text-rose-800 font-bold ml-2 px-2">Hapus</button>
                  </li>
                ))}
              </ul>

              <div className="pt-4 flex gap-4">
                <button
                  onClick={handleCombine}
                  disabled={isProcessing}
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm rounded-lg shadow transition-all disabled:opacity-50"
                >
                  {isProcessing ? "Sedang Memproses..." : "Gabungkan Semua File Sekarang 🚀"}
                </button>
              </div>
            </div>
          )}

          {downloadUrl && (
            <div className="mt-6 p-4 bg-emerald-50 dark:bg-emerald-950 border border-emerald-200 rounded-lg text-center space-y-3">
              <p className="font-semibold text-emerald-700 dark:text-emerald-300 text-sm">Yeay, File Berhasil Digabung!</p>
              <a
                href={downloadUrl}
                download="combined-document.pdf"
                className="inline-block px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-lg shadow transition-all"
              >
                📥 Download PDF Gabungan
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}