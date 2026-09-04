"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { PDFDocument } from "pdf-lib";

interface PDFFileItem {
  id: string;
  file: File;
  name: string;
  size: string;
}

export default function CombinePdfPage() {
  const [pdfFiles, setPdfFiles] = useState<PDFFileItem[]>([]);
  const [isMerging, setIsMerging] = useState(false);
  const [isDraggingOverBox, setIsDraggingOverBox] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Format ukuran file
  const formatSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  // Handle pilih file dari input
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      addFiles(Array.from(e.target.files));
    }
  };

  // Tambahkan file ke state
  const addFiles = (files: File[]) => {
    const validPdfs = files.filter(
      (f) => f.type === "application/pdf" || f.name.endsWith(".pdf")
    );

    const newItems: PDFFileItem[] = validPdfs.map((file) => ({
      id: Math.random().toString(36).substring(2, 9),
      file,
      name: file.name,
      size: formatSize(file.size),
    }));

    setPdfFiles((prev) => [...prev, ...newItems]);
  };

  // External Dropzone handlers (Upload File Baru dari Komputer)
  const handleBoxDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (draggedIndex === null) {
      setIsDraggingOverBox(true);
    }
  };

  const handleBoxDragLeave = () => {
    setIsDraggingOverBox(false);
  };

  const handleBoxDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingOverBox(false);
    if (draggedIndex === null && e.dataTransfer.files.length > 0) {
      addFiles(Array.from(e.dataTransfer.files));
    }
  };

  // Re-order Drag & Drop handlers (Geser kartu PDF depan-belakang)
  const handleItemDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleItemDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;

    const updated = [...pdfFiles];
    const [draggedItem] = updated.splice(draggedIndex, 1);
    updated.splice(index, 0, draggedItem);

    setDraggedIndex(index);
    setPdfFiles(updated);
  };

  const handleItemDragEnd = () => {
    setDraggedIndex(null);
  };

  // Hapus satu file
  const removeFile = (id: string) => {
    setPdfFiles((prev) => prev.filter((f) => f.id !== id));
  };

  // Hapus semua file
  const clearAllFiles = () => {
    setPdfFiles([]);
  };

  // Pindahkan urutan via tombol panah (Opsional)
  const moveFile = (index: number, direction: "left" | "right") => {
    const targetIndex = direction === "left" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= pdfFiles.length) return;

    const updated = [...pdfFiles];
    const [movedItem] = updated.splice(index, 1);
    updated.splice(targetIndex, 0, movedItem);
    setPdfFiles(updated);
  };

  // Proses Penggabungan PDF
  const handleCombinePDF = async () => {
    if (pdfFiles.length < 2) {
      alert("Pilih minimal 2 file PDF untuk digabungkan!");
      return;
    }

    setIsMerging(true);
    try {
      const mergedPdf = await PDFDocument.create();

      for (const item of pdfFiles) {
        const arrayBuffer = await item.file.arrayBuffer();
        const pdf = await PDFDocument.load(arrayBuffer);
        const copiedPages = await mergedPdf.copyPages(
          pdf,
          pdf.getPageIndices()
        );
        copiedPages.forEach((page) => mergedPdf.addPage(page));
      }

      const mergedPdfBytes = await mergedPdf.save();
      const blob = new Blob([mergedPdfBytes.buffer], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "Combined_Dokumen_BA.pdf";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Gagal menggabungkan PDF:", err);
      alert("Terjadi kesalahan saat menggabungkan file PDF.");
    } finally {
      setIsMerging(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 flex flex-col select-none">
      {/* Top Navigation */}
      <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 px-6 py-3 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="text-sm font-medium text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
          >
            ← Kembali
          </Link>
          <h1 className="text-lg font-bold">Combine PDF Tool</h1>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-5xl w-full mx-auto p-6 flex flex-col items-center">
        {/* Title Banner */}
        <div className="text-center my-6 space-y-2">
          <h1 className="text-4xl font-extrabold tracking-tight">
            Combine <span className="text-red-500">PDF</span>
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm max-w-2xl">
            Gabungkan beberapa file PDF Berita Acara menjadi satu dokumen PDF dengan mudah.
            Unggah file, <strong>geser kartu untuk atur urutan</strong>, lalu klik <strong>Gabungkan</strong>.
          </p>
        </div>

        {/* Action Bar (Upload & Clear Buttons) */}
        <div className="flex items-center gap-3 mb-4 w-full max-w-3xl justify-center">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
            multiple
            accept="application/pdf"
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="px-6 py-2.5 bg-sky-500 hover:bg-sky-600 text-white font-bold text-sm rounded-md shadow transition-all flex items-center gap-2 uppercase tracking-wide"
          >
            📤 UNGGAH FILE
          </button>
          {pdfFiles.length > 0 && (
            <button
              onClick={clearAllFiles}
              className="px-5 py-2.5 bg-rose-400 hover:bg-rose-500 text-white font-bold text-sm rounded-md shadow transition-all flex items-center gap-2 uppercase tracking-wide"
            >
              ⊗ HAPUS SEMUA
            </button>
          )}
        </div>

        {/* Dropzone Box */}
        <div
          onDragOver={handleBoxDragOver}
          onDragLeave={handleBoxDragLeave}
          onDrop={handleBoxDrop}
          className={`w-full max-w-3xl border-2 border-dashed rounded-xl p-6 min-h-[260px] flex flex-col justify-center items-center transition-all bg-white dark:bg-slate-800 ${
            isDraggingOverBox
              ? "border-sky-500 bg-sky-50 dark:bg-sky-950/30"
              : "border-sky-300 dark:border-slate-600"
          }`}
        >
          {pdfFiles.length === 0 ? (
            <div className="text-center space-y-2 pointer-events-none">
              <p className="text-sky-400 dark:text-sky-500 text-lg font-medium">
                Letakkan File PDF Anda Di Sini
              </p>
              <p className="text-xs text-slate-400">
                Atau klik tombol <strong>Unggah File</strong> di atas
              </p>
            </div>
          ) : (
            <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {pdfFiles.map((item, index) => (
                <div
                  key={item.id}
                  draggable
                  onDragStart={() => handleItemDragStart(index)}
                  onDragOver={(e) => handleItemDragOver(e, index)}
                  onDragEnd={handleItemDragEnd}
                  className={`relative group bg-slate-100 dark:bg-slate-700/60 border rounded-lg p-3 flex flex-col justify-between items-center text-center shadow-sm hover:shadow-md transition-all cursor-grab active:cursor-grabbing ${
                    draggedIndex === index
                      ? "opacity-40 border-sky-500 scale-95"
                      : "border-slate-200 dark:border-slate-600"
                  }`}
                >
                  {/* Remove Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFile(item.id);
                    }}
                    className="absolute -top-2 -right-2 bg-rose-500 text-white rounded-full w-6 h-6 text-xs font-bold flex items-center justify-center hover:bg-rose-600 shadow z-10"
                    title="Hapus file"
                  >
                    ✕
                  </button>

                  {/* Thumbnail Icon */}
                  <div className="w-12 h-14 bg-red-500 rounded text-white flex items-center justify-center font-bold text-xs mb-2 shadow-sm pointer-events-none">
                    PDF
                  </div>

                  {/* File Info */}
                  <p className="text-xs font-semibold truncate w-full text-slate-700 dark:text-slate-200 pointer-events-none">
                    {item.name}
                  </p>
                  <p className="text-[10px] text-slate-400 mt-0.5 pointer-events-none">
                    {item.size}
                  </p>

                  {/* Move Left/Right Controls */}
                  <div className="flex items-center gap-2 mt-2 pt-2 border-t border-slate-200 dark:border-slate-600 w-full justify-center">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        moveFile(index, "left");
                      }}
                      disabled={index === 0}
                      className="px-2 py-0.5 text-xs bg-slate-200 dark:bg-slate-600 hover:bg-slate-300 disabled:opacity-30 rounded"
                      title="Geser ke kiri"
                    >
                      ←
                    </button>
                    <span className="text-[10px] text-slate-400 font-mono">
                      #{index + 1}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        moveFile(index, "right");
                      }}
                      disabled={index === pdfFiles.length - 1}
                      className="px-2 py-0.5 text-xs bg-slate-200 dark:bg-slate-600 hover:bg-slate-300 disabled:opacity-30 rounded"
                      title="Geser ke kanan"
                    >
                      →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Merge Button */}
        <div className="mt-6">
          <button
            onClick={handleCombinePDF}
            disabled={pdfFiles.length < 2 || isMerging}
            className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 dark:disabled:bg-slate-800 text-white font-extrabold text-sm rounded-md shadow-md transition-all uppercase tracking-wider disabled:cursor-not-allowed"
          >
            {isMerging ? "⏳ MENGGABUNGKAN..." : "⚙️ GABUNGKAN PDF"}
          </button>
        </div>
      </main>
    </div>
  );
}