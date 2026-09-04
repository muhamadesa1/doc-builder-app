"use client";

import React from "react";

interface ShareWhatsAppButtonProps {
  title: string;
  lokasi?: string;
  tanggal?: string;
  summaryText?: string;
}

export default function ShareWhatsAppButton({
  title,
  lokasi = "-",
  tanggal = "-",
  summaryText = "",
}: ShareWhatsAppButtonProps) {
  const handleShare = async () => {
    const textMessage = 
      `*${title.toUpperCase()}*\n` +
      `Tanggal: ${tanggal}\n` +
      `Lokasi: ${lokasi}\n` +
      (summaryText ? `${summaryText}\n` : "") +
      `\nTerlampir dokumen berita acara.`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: textMessage,
        });
        return;
      } catch (err) {
        console.log("Batal share:", err);
      }
    }

    const encodedText = encodeURIComponent(textMessage);
    window.open(`https://wa.me/?text=${encodedText}`, "_blank");
  };

  return (
    <button
      type="button"
      onClick={handleShare}
      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm rounded-lg shadow transition-all flex items-center gap-2"
    >
      📲 Share ke WA
    </button>
  );
}