"use client";

import React, { useState } from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

interface ShareWhatsAppButtonProps {
  title: string;
  lokasi?: string;
  tanggal?: string;
  summaryText?: string;
  elementId?: string; // ID elemen HTML preview berita acara yang mau dijadiin PDF
}

export default function ShareWhatsAppButton({
  title,
  lokasi = "-",
  tanggal = "-",
  summaryText = "",
  elementId = "ba-preview-doc",
}: ShareWhatsAppButtonProps) {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleSharePDF = async () => {
    setIsGenerating(true);
    const fileName = `${title.replace(/\s+/g, "_")}_${lokasi || "Lokasi"}.pdf`;
    const textMessage = 
      `*${title.toUpperCase()}*\n` +
      `Tanggal: ${tanggal}\n` +
      `Lokasi: ${lokasi}\n` +
      (summaryText ? `${summaryText}\n` : "") +
      `\nBerikut terlampir dokumen PDF Berita Acara.`;

    try {
      const element = document.getElementById(elementId);

      if (element && navigator.share && navigator.canShare) {
        // 1. Render elemen dokumen menjadi Gambar/Canvas
        const canvas = await html2canvas(element, { scale: 2, useCORS: true });
        const imgData = canvas.toDataURL("image/jpeg", 0.95);

        // 2. Buat PDF menggunakan jsPDF
        const pdf = new jsPDF("p", "mm", "a4");
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
        pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight);

        // 3. Ubah PDF menjadi File Blob
        const pdfBlob = pdf.output("blob");
        const pdfFile = new File([pdfBlob], fileName, { type: "application/pdf" });

        // 4. Cek apakah browser HP bisa share File PDF
        if (navigator.canShare({ files: [pdfFile] })) {
          await navigator.share({
            title: title,
            text: textMessage,
            files: [pdfFile], // <--- File PDF dikirim langsung ke WA!
          });
          setIsGenerating(false);
          return;
        }
      }
    } catch (err) {
      console.log("Gagal share file PDF:", err);
    }

    // Fallback jika dibuka di browser PC/Desktop yang tidak mendukung share file
    const encodedText = encodeURIComponent(textMessage);
    window.open(`https://wa.me/?text=${encodedText}`, "_blank");
    setIsGenerating(false);
  };

  return (
    <button
      type="button"
      onClick={handleSharePDF}
      disabled={isGenerating}
      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm rounded-lg shadow transition-all flex items-center gap-2 disabled:opacity-50"
    >
      {isGenerating ? "⏳ Membuat PDF..." : "📲 Share PDF ke WA"}
    </button>
  );
}