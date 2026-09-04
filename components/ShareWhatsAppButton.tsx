"use client";

import React, { useState } from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

interface ShareWhatsAppButtonProps {
  title: string;
  lokasi?: string;
  tanggal?: string;
  summaryText?: string;
  elementId?: string;
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
      `\nDokumen PDF Berita Acara telah diunduh ke HP.`;

    try {
      const element = document.getElementById(elementId);

      if (element) {
        // 1. Render elemen dokumen preview menjadi PDF
        const canvas = await html2canvas(element, { scale: 2, useCORS: true });
        const imgData = canvas.toDataURL("image/jpeg", 0.95);

        const pdf = new jsPDF("p", "mm", "a4");
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
        pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight);

        // 2. Download otomatis file PDF ke HP
        pdf.save(fileName);
      }
    } catch (err) {
      console.log("Gagal generate PDF:", err);
    }

    // 3. Buka WhatsApp dengan teks ringkasan
    setTimeout(() => {
      const encodedText = encodeURIComponent(textMessage);
      window.open(`https://wa.me/?text=${encodedText}`, "_blank");
      setIsGenerating(false);
    }, 1000);
  };

  return (
    <button
      type="button"
      onClick={handleSharePDF}
      disabled={isGenerating}
      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm rounded-lg shadow transition-all flex items-center gap-2 disabled:opacity-50"
    >
      {isGenerating ? "⏳ Membuat PDF..." : "📲 Download & Share WA"}
    </button>
  );
}