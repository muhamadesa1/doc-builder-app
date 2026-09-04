"use client";

import React, { useState } from "react";
import Link from "next/link";
import { jsPDF } from "jspdf";

export default function BeritaAcaraMaintenancePage() {
  // State untuk form Berita Acara Maintenance
  const [formData, setFormData] = useState({
    tanggal: new Date().toISOString().split("T")[0],
    lokasi: "",
    kehadiran: "",
    jamMulai: "09:00",
    jamSelesai: "12:00",
    issueType: "Sistem", // "Sistem" atau "Non Sistem"
    tujuanKunjungan: "Maintenance Lokasi Parkee",
    tindakan: 
      "- Monitoring transaksi casual maupun member\n" +
      "- Monitoring server by Parkee Monitoring\n" +
      "- Pengecekan Aset Client",
    stepDilakukan: "",
    hasil: "",
    assetDigunakan: "",
    notes: "",
    namaItSupport: "",
    namaCarParkManager: "",
  });

  const [isGenerating, setIsGenerating] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDownloadPDF = () => {
    setIsGenerating(true);
    try {
      const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pageWidth = 210;
      const margin = 15;
      let y = 15;

      // Header Brand Parkee
      doc.setFont("helvetica", "bold");
      doc.setFontSize(20);
      doc.setTextColor(200, 0, 0); // Warna merah Parkee
      doc.text("PARKEE", margin, y);

      y += 8;
      doc.setFontSize(14);
      doc.setTextColor(30, 30, 30);
      doc.text("BERITA ACARA MAINTENANCE", margin, y);

      y += 6;
      doc.setLineWidth(0.5);
      doc.setDrawColor(200, 0, 0);
      doc.line(margin, y, pageWidth - margin, y);

      y += 8;
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");

      // Informasi Utama (Dua kolom / list rapi)
      const details = [
        { label: "Tanggal", value: formData.tanggal },
        { label: "Lokasi", value: formData.lokasi || "-" },
        { label: "Kehadiran", value: formData.kehadiran || "-" },
        { label: "Jam Mulai", value: formData.jamMulai },
        { label: "Jam Selesai", value: formData.jamSelesai },
        { 
          label: "Issue", 
          value: formData.issueType === "Non Sistem" 
            ? "Non Sistem (Rp. 350.000)" 
            : "Sistem" 
        },
        { label: "Tujuan Kunjungan", value: formData.tujuanKunjungan },
      ];

      details.forEach((item) => {
        doc.setFont("helvetica", "bold");
        doc.text(`${item.label}`, margin, y);
        doc.text(":", margin + 38, y);
        doc.setFont("helvetica", "normal");
        doc.text(`${item.value}`, margin + 42, y);
        y += 6;
      });

      y += 2;
      doc.setLineWidth(0.2);
      doc.setDrawColor(200, 200, 200);
      doc.line(margin, y, pageWidth - margin, y);
      y += 6;

      // Fungsi helper untuk teks panjang / textarea agar wrap otomatis
      const addSection = (title: string, content: string) => {
        if (y > 260) {
          doc.addPage();
          y = 20;
        }
        doc.setFont("helvetica", "bold");
        doc.text(title, margin, y);
        y += 5;
        doc.setFont("helvetica", "normal");
        const splitText = doc.splitTextToSize(content || "-", pageWidth - (margin * 2));
        doc.text(splitText, margin, y);
        y += (splitText.length * 5) + 4;
      };

      addSection("Tindakan:", formData.tindakan);
      addSection("Step yang Dilakukan:", formData.stepDilakukan);
      addSection("Hasil:", formData.hasil);
      addSection("Asset yang Digunakan:", formData.assetDigunakan);
      addSection("Notes / Catatan:", formData.notes);

      // Ketentuan Peminjaman Aset (Sesuai dokumen asli)
      if (y > 230) {
        doc.addPage();
        y = 20;
      }
      doc.setFontSize(8);
      doc.setFont("helvetica", "italic");
      doc.setTextColor(80, 80, 80);
      const terms = [
        "• Asset existing lokasi yang korup/rusak dan PARKEE meminjamkan asset ke lokasi CP.",
        "• Asset pinjaman akan dikembalikan ke PARKEE oleh CP, setelah diganti dengan asset yang baru.",
        "• Jika dalam waktu 1 minggu belum dikembalikan, PARKEE akan charge asset yang dipinjamkan ke CP.",
        "• Asset yang digunakan berdasarkan Delivery Order yang dikirimkan PARKEE dan diterima oleh PIC/Ops Lokasi CP akan ditagihkan ke CP."
      ];
      terms.forEach((term) => {
        doc.text(term, margin, y);
        y += 4;
      });

      y += 10;

      // Bagian Tanda Tangan
      if (y > 240) {
        doc.addPage();
        y = 20;
      }

      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(0, 0, 0);

      const col1X = margin + 15;
      const col2X = pageWidth - margin - 55;

      doc.text("PT Inovasi Anak Indonesia", col1X, y, { align: "center" });
      doc.text("PT. Centrepark Citra Corpora", col2X, y, { align: "center" });

      y += 22; // Ruang tanda tangan

      doc.setFont("helvetica", "bold");
      doc.text(`(${formData.namaItSupport || "...................................."})`, col1X, y, { align: "center" });
      doc.text(`(${formData.namaCarParkManager || "...................................."})`, col2X, y, { align: "center" });

      y += 5;
      doc.setFont("helvetica", "normal");
      doc.text("IT Support", col1X, y, { align: "center" });
      doc.text("Car Park Manager", col2X, y, { align: "center" });

      // Save PDF
      doc.save(`Berita-Acara-Maintenance-${formData.lokasi || "Parkee"}.pdf`);
      setIsGenerating(false);
    } catch (err) {
      console.error("Gagal generate PDF:", err);
      alert("Terjadi kesalahan saat membuat PDF.");
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header Nav */}
        <div className="bg-red-700 px-6 py-4 flex items-center justify-between text-white">
          <div>
            <Link href="/" className="text-red-200 text-xs font-semibold hover:underline">← Kembali</Link>
            <h1 className="text-xl font-bold mt-0.5">Form Berita Acara Maintenance</h1>
          </div>
          <span className="text-xs bg-red-800 px-3 py-1 rounded-full font-medium">Parkee Operations</span>
        </div>

        {/* Form Container */}
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">Tanggal</label>
              <input 
                type="date" 
                name="tanggal" 
                value={formData.tanggal} 
                onChange={handleChange}
                className="w-full text-xs p-2.5 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">Lokasi</label>
              <input 
                type="text" 
                name="lokasi" 
                placeholder="Contoh: Emporium Pluit" 
                value={formData.lokasi} 
                onChange={handleChange}
                className="w-full text-xs p-2.5 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">Kehadiran (PIC / Petugas)</label>
              <input 
                type="text" 
                name="kehadiran" 
                placeholder="Nama petugas" 
                value={formData.kehadiran} 
                onChange={handleChange}
                className="w-full text-xs p-2.5 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">Jam Mulai</label>
              <input 
                type="time" 
                name="jamMulai" 
                value={formData.jamMulai} 
                onChange={handleChange}
                className="w-full text-xs p-2.5 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">Jam Selesai</label>
              <input 
                type="time" 
                name="jamSelesai" 
                value={formData.jamSelesai} 
                onChange={handleChange}
                className="w-full text-xs p-2.5 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">Issue</label>
              <select 
                name="issueType" 
                value={formData.issueType} 
                onChange={handleChange}
                className="w-full text-xs p-2.5 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none bg-white"
              >
                <option value="Sistem">Sistem</option>
                <option value="Non Sistem">Non Sistem = Rp. 350.000</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">Tujuan Kunjungan</label>
              <input 
                type="text" 
                name="tujuanKunjungan" 
                value={formData.tujuanKunjungan} 
                onChange={handleChange}
                className="w-full text-xs p-2.5 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1">Tindakan</label>
            <textarea 
              name="tindakan" 
              rows={4}
              value={formData.tindakan} 
              onChange={handleChange}
              className="w-full text-xs p-2.5 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none font-mono"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">Step yang Dilakukan</label>
              <textarea 
                name="stepDilakukan" 
                rows={3}
                placeholder="Langkah-langkah perbaikan..." 
                value={formData.stepDilakukan} 
                onChange={handleChange}
                className="w-full text-xs p-2.5 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">Hasil</label>
              <textarea 
                name="hasil" 
                rows={3}
                placeholder="Hasil akhir maintenance..." 
                value={formData.hasil} 
                onChange={handleChange}
                className="w-full text-xs p-2.5 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">Asset yang Digunakan</label>
              <input 
                type="text" 
                name="assetDigunakan" 
                placeholder="Contoh: Barcode Scanner / PCIE Card" 
                value={formData.assetDigunakan} 
                onChange={handleChange}
                className="w-full text-xs p-2.5 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">Notes / Catatan Tambahan</label>
              <input 
                type="text" 
                name="notes" 
                placeholder="Catatan khusus..." 
                value={formData.notes} 
                onChange={handleChange}
                className="w-full text-xs p-2.5 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
              />
            </div>
          </div>

          {/* Bagian Penandatangan */}
          <div className="border-t pt-4 grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl">
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">Nama IT Support (PT Inovasi Anak Indonesia)</label>
              <input 
                type="text" 
                name="namaItSupport" 
                placeholder="Nama Anda" 
                value={formData.namaItSupport} 
                onChange={handleChange}
                className="w-full text-xs p-2.5 border rounded-lg bg-white outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">Nama Car Park Manager (PT Centrepark)</label>
              <input 
                type="text" 
                name="namaCarParkManager" 
                placeholder="Nama Manager / PIC Lokasi" 
                value={formData.namaCarParkManager} 
                onChange={handleChange}
                className="w-full text-xs p-2.5 border rounded-lg bg-white outline-none"
              />
            </div>
          </div>

          {/* Tombol Download */}
          <div className="pt-2 flex justify-end">
            <button
              onClick={handleDownloadPDF}
              disabled={isGenerating}
              className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow-lg transition duration-200 disabled:opacity-50"
            >
              {isGenerating ? "Membuat PDF..." : "📥 Download Berita Acara PDF"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}