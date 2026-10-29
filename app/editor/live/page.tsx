"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";

type Attachment = {
  id: string;
  name: string;
  size: string;
  pages: string[];
};

export default function LiveEditor() {
  const [formData, setFormData] = useState({
    hari: "",
    tanggal: "",
    tahun: new Date().getFullYear().toString(),
    lokasi: "",
    dimigrasiOleh: "",
    jamMulai: "",
    jamSelesai: "",
    partnerCompany: "",
    issueSebelumMigrasi: "",
    
    unitTesting: {
      printer: "Sesuai",
      reader: "Sesuai",
      camera: "Sesuai",
      gate1: "Sesuai",
      booster: "Sesuai",
      sound: "Sesuai",
      gate2: "Sesuai",
      ambilTiket: "Sesuai",
      transaksiTiket: "Sesuai",
      transaksiKartu: "Sesuai",
      samcardQty: "",
      tarif: "Sesuai",
      membership: "Sesuai",
      upsServer: "Sesuai",
      kesesuaianAsset: "Sesuai",
    },

    hddServer: {
      health: "",
      performance: "",
      estTime: "",
      badSector: "",
    },

    versi: "",
    fitur: ["", "", "", "", ""],

    pcInstalled: {
      masuk: "",
      keluar: "",
      serverAdmin: "",
      keterangan: "",
    },

    asetCp: [
      { name: "Booster", qty: "-", ket: "-" },
      { name: "Interface", qty: "-", ket: "-" },
      { name: "Speaker", qty: "-", ket: "-" },
      { name: "Amplifier", qty: "-", ket: "-" },
      { name: "PC Server / PC Client / PC Admin", qty: "-", ket: "-" },
      { name: "HDD / SSD", qty: "-", ket: "-" },
      { name: "PCI-E Serial 2 / 4 Port", qty: "-", ket: "-" },
      { name: "Kabel Serial Printer", qty: "-", ket: "-" },
      { name: "RFI DE – ABCMI", qty: "-", ket: "-" },
      { name: "STI NFC pad / STI Lama", qty: "-", ket: "-" },
      { name: "Reader Promag", qty: "-", ket: "-" },
      { name: "Scanner Symbol / Honeywell", qty: "-", ket: "-" },
      { name: "Webcam / IP Cam", qty: "-", ket: "-" },
      { name: "Switch Hub", qty: "-", ket: "-" },
      { name: "Printer", qty: "-", ket: "-" },
    ],

    notes: "",
    picParkee: "",
    picCp: "",
    jabatanCp: "Car Park Manager",
  });

  const listJabatan = ["PIC", "LEAD", "Area Manager", "Car Park Manager"];

  const partnerList = [
    { fullName: "PT. Centrepark Citra Corpora", code: "CP" },
    { fullName: "PT. Inovasi Parkir Mandiri", code: "IPM" },
    { fullName: "PT Reksa Griya Antam", code: "RGA" },
    { fullName: "Unit Pengelola Perparkiran Provinsi DKI Jakarta", code: "UPP_DKI" },
    { fullName: "PT Zenith Indonesia Solutions", code: "ZENITH" },
    { fullName: "PT Tiga Saudara Propertama", code: "TSP" },
    { fullName: "PT Tekno Mandiri Sejahtera", code: "TMS" },
    { fullName: "PT Semai Maju Lestari", code: "SML" },
    { fullName: "PT Patra Jasa", code: "PATRA" },
    { fullName: "PT Bina Waluya", code: "BINA_WALUYA" },
    { fullName: "PT Bangsawan Cyberindo Indonesia", code: "BANGSAWAN" },
    { fullName: "PT Adhi Commuter Properti Tbk.", code: "ADHI" },
    { fullName: "CV Utama Persada Karya", code: "UPK" },
    { fullName: "CV Selaras Multi Bisnis", code: "SMB" },
    { fullName: "PT Amanah Parking", code: "AMANAH" },
    { fullName: "PT Nugrah Tanamal", code: "NUGRAH" },
    { fullName: "PT Bijak", code: "BIJAK" },
    { fullName: "PT Krijaya Tika Mandiri", code: "KRIJAYA" },
  ];

  const cleanPartnerName = formData.partnerCompany.replace(/\s*\([A-Za-z0-9_-]+\)$/, "").trim();
  const currentPartnerData = partnerList.find(
    p => p.fullName.toLowerCase() === cleanPartnerName.toLowerCase() || p.code.toLowerCase() === formData.partnerCompany.trim().toLowerCase()
  ) || partnerList[0];

  const currentPartner = { fullName: currentPartnerData.fullName, code: currentPartnerData.code };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNestedChange = (category: string, field: string, value: string) => {
    setFormData((prev: any) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: value,
      },
    }));
  };

  const handleAsetChange = (index: number, field: "qty" | "ket", rawValue: string) => {
    const updatedAset = [...formData.asetCp];
    const prevValue = updatedAset[index][field];

    let finalValue = rawValue;

    if (prevValue === "-" && rawValue.length > 1) {
      finalValue = rawValue.replace("-", "");
    }

    if (finalValue.trim() === "") {
      finalValue = "-";
    }

    updatedAset[index][field] = finalValue;

    if (field === "qty") {
      if (finalValue !== "-" && finalValue.trim() !== "") {
        if (updatedAset[index].ket === "-") {
          updatedAset[index].ket = "Sesuai";
        }
      } else {
        if (updatedAset[index].ket === "Sesuai") {
          updatedAset[index].ket = "-";
        }
      }
    }

    setFormData({ ...formData, asetCp: updatedAset });
  };

  const handleFiturChange = (index: number, value: string) => {
    const updatedFitur = [...formData.fitur];
    updatedFitur[index] = value;
    setFormData({ ...formData, fitur: updatedFitur });
  };

  const addFitur = () => {
    setFormData({ ...formData, fitur: [...formData.fitur, ""] });
  };

  const removeFitur = (index: number) => {
    if (formData.fitur.length <= 5) return;
    const updatedFitur = formData.fitur.filter((_, idx) => idx !== index);
    setFormData({ ...formData, fitur: updatedFitur });
  };

  // Lampiran PDF yang akan digabung dengan Berita Acara saat dicetak / Save PDF
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [loadingUpload, setLoadingUpload] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  // Render tiap halaman PDF lampiran jadi gambar, supaya ikut tercetak jadi satu dokumen
  const renderPdfPages = async (file: File): Promise<string[]> => {
    const pdfjs = await import("pdfjs-dist");
    pdfjs.GlobalWorkerOptions.workerSrc = new URL(
      "pdfjs-dist/build/pdf.worker.min.js",
      import.meta.url
    ).toString();

    const doc = await pdfjs.getDocument({
      data: new Uint8Array(await file.arrayBuffer()),
    }).promise;

    const pages: string[] = [];

    for (let i = 1; i <= doc.numPages; i++) {
      const page = await doc.getPage(i);
      const viewport = page.getViewport({ scale: 2 });
      const canvas = document.createElement("canvas");
      canvas.width = Math.floor(viewport.width);
      canvas.height = Math.floor(viewport.height);
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Canvas tidak tersedia");

      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      await page.render({ canvasContext: ctx, viewport }).promise;

      // PNG untuk halaman teks (tajam), fallback JPEG kalau PNG-nya kegedean
      const png = canvas.toDataURL("image/png");
      pages.push(png.length > 1_500_000 ? canvas.toDataURL("image/jpeg", 0.92) : png);
      page.cleanup();
    }

    await doc.destroy();
    return pages;
  };

  const handleAttachmentUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []).filter(
      (f) => f.type === "application/pdf" || f.name.toLowerCase().endsWith(".pdf")
    );
    if (files.length === 0) return;

    setLoadingUpload(true);
    try {
      for (const file of files) {
        const pages = await renderPdfPages(file);
        setAttachments((prev) => [
          ...prev,
          {
            id: Math.random().toString(36).slice(2, 9),
            name: file.name,
            size: formatSize(file.size),
            pages,
          },
        ]);
      }
    } catch (err: any) {
      console.error(err);
      alert("Gagal membaca PDF lampiran: " + (err?.message || err));
    } finally {
      setLoadingUpload(false);
      e.target.value = "";
    }
  };

  const removeAttachment = (id: string) => {
    setAttachments((prev) => prev.filter((a) => a.id !== id));
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans relative overflow-x-hidden">
      {/* Background Dot Grid Pattern */}
      <div className="absolute inset-0 z-0 opacity-40 dark:opacity-20 pointer-events-none bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] dark:bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:24px_24px]" />

      {/* Background Soft Glow Orb */}
      <div className="absolute top-[-50px] left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-tr from-amber-200 via-rose-200 to-indigo-200 dark:from-amber-950 dark:via-rose-950 dark:to-indigo-950 blur-[130px] rounded-full pointer-events-none opacity-50 z-0" />

      <style jsx global>{`
        @media print {
          @page {
            size: A4 portrait;
            margin: 0mm;
          }

          html,
          body {
            background: white !important;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
            overflow: visible !important;
            overflow-x: visible !important;
            overflow-y: visible !important;
            width: auto !important;
            height: auto !important;
            max-width: none !important;
            max-height: none !important;
            margin: 0 !important;
            padding: 0 !important;
          }

          /* Root wrapper + semua panel overflow dilepas saat print */
          .min-h-screen.overflow-x-hidden,
          .overflow-x-hidden,
          .overflow-hidden,
          .overflow-y-auto,
          .overflow-auto {
            overflow: visible !important;
            overflow-x: visible !important;
            overflow-y: visible !important;
            height: auto !important;
            max-height: none !important;
          }

          /* Container layout utama (baris dengan overflow-hidden) saat mode print */
          .flex-1.flex.flex-col.md\\:flex-row.overflow-hidden {
            display: block !important;
            overflow: visible !important;
          }

          header,
          .print\\:hidden {
            display: none !important;
          }

          .print-preview {
            width: 100% !important;
            max-width: 100% !important;
            height: auto !important;
            overflow: visible !important;
            position: static !important;
            display: block !important;
            padding: 0 !important;
            margin: 0 !important;
            background: white !important;
          }

          .print-document {
            width: 100vw !important;
            max-width: none !important;
            min-width: 0 !important;
            height: auto !important;
            overflow: visible !important;
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            box-shadow: none !important;
            border: none !important;
            outline: none !important;
            padding: 8mm 10mm !important;
            margin: 0 !important;
            background: white !important;
          }

          .attachments-wrap {
            display: block !important;
            width: 100% !important;
            max-width: none !important;
            margin: 0 !important;
            padding: 8mm 10mm 0 !important;
          }

          .attachment-page {
            display: block !important;
            width: 100% !important;
            height: 281mm !important;
            margin: 0 !important;
            overflow: hidden !important;
            page-break-before: always;
            break-before: page;
          }

          .attachment-page img {
            display: block !important;
            width: 100% !important;
            height: 100% !important;
            object-fit: contain !important;
            object-position: center !important;
          }

          /* Saat ada lampiran, dokumen dibikin statis biar lampiran mengalir setelahnya */
          .has-attachment .print-document {
            position: static !important;
            left: auto !important;
            top: auto !important;
          }
        }
      `}</style>

      {/* Top Navbar */}
      <header className="border-b border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md sticky top-0 z-30 print:hidden">
        <div className="max-w-7xl mx-auto px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="px-3.5 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-xs font-bold transition-all text-slate-700 dark:text-slate-200"
            >
              ← Kembali
            </Link>
            <div className="h-4 w-px bg-slate-300 dark:bg-slate-700" />
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold text-xs">
                🚀
              </span>
              <span className="font-semibold text-sm tracking-tight text-slate-700 dark:text-slate-200">
                Berita Acara <span className="font-bold text-amber-600 dark:text-amber-400">Live Editor</span>
              </span>
            </div>
          </div>

          <button
            onClick={() => window.print()}
            className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 font-bold text-xs rounded-full shadow transition-all duration-200 flex items-center gap-2 active:scale-95"
          >
            🖨️ Cetak / Save PDF
          </button>
        </div>
      </header>

      {/* Main Workspace */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden z-10">
        
        {/* Left Side: Form Input */}
        <div className="w-full md:w-5/12 p-6 overflow-y-auto border-r border-slate-200/80 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md print:hidden space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
            <div>
              <span className="text-[10px] font-bold tracking-wider uppercase text-amber-600 dark:text-amber-400 opacity-90">
                Editor Form
              </span>
              <h2 className="text-lg font-bold text-slate-800 dark:text-white mt-0.5 tracking-tight">
                Form Input Data Live
              </h2>
            </div>
            <span className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-[11px] font-medium rounded-lg">
              Live Preview
            </span>
          </div>

          {/* Section Partner */}
          <div className="p-4 bg-amber-50/50 dark:bg-amber-950/30 border border-amber-100 dark:border-amber-900/50 rounded-2xl space-y-2">
            <label className="block font-bold text-amber-900 dark:text-amber-300 text-xs uppercase tracking-wider">
              Perusahaan Partner / Mitra (Ketik inisial cth: CP, RGA)
            </label>
            <input
              type="text"
              name="partnerCompany"
              list="partner-list-live"
              value={formData.partnerCompany}
              onChange={handleChange}
              placeholder="Ketik inisial (Default: CP)..."
              className="w-full p-3 border border-amber-200 dark:border-amber-800 rounded-xl bg-white dark:bg-slate-800 text-sm font-semibold outline-none focus:ring-2 focus:ring-amber-500 shadow-sm transition-all"
            />
            <datalist id="partner-list-live">
              {partnerList.map((item, idx) => (
                <option key={idx} value={`${item.fullName} (${item.code})`} />
              ))}
            </datalist>
          </div>

          {/* Section Waktu & Lokasi */}
          <div className="p-4 bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 rounded-2xl space-y-4">
            <h3 className="font-bold text-xs uppercase tracking-wider text-slate-400">Waktu &amp; Lokasi</h3>

            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="block font-medium mb-1.5 text-xs text-slate-600 dark:text-slate-400">Hari</label>
                <input type="text" name="hari" placeholder="Senin" value={formData.hari} onChange={handleChange} className="w-full p-3 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-sm outline-none focus:ring-2 focus:ring-amber-500 shadow-sm" />
              </div>
              <div>
                <label className="block font-medium mb-1.5 text-xs text-slate-600 dark:text-slate-400">Tanggal</label>
                <input type="text" name="tanggal" placeholder="15 Agustus" value={formData.tanggal} onChange={handleChange} className="w-full p-3 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-sm outline-none focus:ring-2 focus:ring-amber-500 shadow-sm" />
              </div>
              <div>
                <label className="block font-medium mb-1.5 text-xs text-slate-600 dark:text-slate-400">Tahun</label>
                <input type="text" name="tahun" value={formData.tahun} onChange={handleChange} className="w-full p-3 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-sm outline-none focus:ring-2 focus:ring-amber-500 shadow-sm" />
              </div>
            </div>

            <div>
              <label className="block font-medium mb-1.5 text-xs text-slate-600 dark:text-slate-400">Lokasi Parkir</label>
              <input type="text" name="lokasi" placeholder="Nama Lokasi" value={formData.lokasi} onChange={handleChange} className="w-full p-3 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-sm outline-none focus:ring-2 focus:ring-amber-500 shadow-sm" />
            </div>

            <div>
              <label className="block font-medium mb-1.5 text-xs text-slate-600 dark:text-slate-400">Dimigrasi Oleh</label>
              <input type="text" name="dimigrasiOleh" placeholder="Nama Personil IAI" value={formData.dimigrasiOleh} onChange={handleChange} className="w-full p-3 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-sm outline-none focus:ring-2 focus:ring-amber-500 shadow-sm" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-medium mb-1.5 text-xs text-slate-600 dark:text-slate-400">Jam Mulai</label>
                <input type="time" name="jamMulai" value={formData.jamMulai} onChange={handleChange} className="w-full p-3 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-sm outline-none focus:ring-2 focus:ring-amber-500 shadow-sm" />
              </div>
              <div>
                <label className="block font-medium mb-1.5 text-xs text-slate-600 dark:text-slate-400">Jam Selesai</label>
                <input type="time" name="jamSelesai" value={formData.jamSelesai} onChange={handleChange} className="w-full p-3 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-sm outline-none focus:ring-2 focus:ring-amber-500 shadow-sm" />
              </div>
            </div>

            <div>
              <label className="block font-medium mb-1.5 text-xs text-slate-600 dark:text-slate-400">Issue Sebelum Migrasi</label>
              <textarea name="issueSebelumMigrasi" rows={2} placeholder="Catatan issue sebelum migrasi..." value={formData.issueSebelumMigrasi} onChange={handleChange} className="w-full p-3 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-sm outline-none focus:ring-2 focus:ring-amber-500 shadow-sm resize-none" />
            </div>
          </div>

          {/* Section Harddisk Server */}
          <div className="p-4 bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 rounded-2xl space-y-3">
            <h3 className="font-bold text-xs uppercase tracking-wider text-slate-400">Kondisi Harddisk Server</h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <input type="text" placeholder="Health (%)" value={formData.hddServer.health} onChange={(e) => handleNestedChange("hddServer", "health", e.target.value)} className="p-3 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-sm outline-none shadow-sm" />
              <input type="text" placeholder="Performance (%)" value={formData.hddServer.performance} onChange={(e) => handleNestedChange("hddServer", "performance", e.target.value)} className="p-3 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-sm outline-none shadow-sm" />
              <input type="text" placeholder="Est. Time (Days)" value={formData.hddServer.estTime} onChange={(e) => handleNestedChange("hddServer", "estTime", e.target.value)} className="p-3 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-sm outline-none shadow-sm" />
              <input type="text" placeholder="Bad Sector" value={formData.hddServer.badSector} onChange={(e) => handleNestedChange("hddServer", "badSector", e.target.value)} className="p-3 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-sm outline-none shadow-sm" />
            </div>
          </div>

          {/* Section Jumlah PC */}
          <div className="p-4 bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 rounded-2xl space-y-3">
            <h3 className="font-bold text-xs uppercase tracking-wider text-slate-400">Jumlah PC Yang Diinstall</h3>
            <div className="grid grid-cols-3 gap-2 text-sm">
              <input type="text" placeholder="Pintu Masuk" value={formData.pcInstalled.masuk} onChange={(e) => handleNestedChange("pcInstalled", "masuk", e.target.value)} className="p-3 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-sm outline-none shadow-sm" />
              <input type="text" placeholder="Pintu Keluar" value={formData.pcInstalled.keluar} onChange={(e) => handleNestedChange("pcInstalled", "keluar", e.target.value)} className="p-3 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-sm outline-none shadow-sm" />
              <input type="text" placeholder="Server/Admin" value={formData.pcInstalled.serverAdmin} onChange={(e) => handleNestedChange("pcInstalled", "serverAdmin", e.target.value)} className="p-3 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-sm outline-none shadow-sm" />
            </div>
            <input type="text" placeholder="Keterangan Gate Aktif" value={formData.pcInstalled.keterangan} onChange={(e) => handleNestedChange("pcInstalled", "keterangan", e.target.value)} className="w-full p-3 border border-slate-200 dark:border-slate-700 rounded-xl text-sm bg-white dark:bg-slate-800 outline-none shadow-sm" />
          </div>

          {/* Section Versi & Fitur */}
          <div className="p-4 bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 rounded-2xl space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-xs uppercase tracking-wider text-slate-400">List Versi &amp; Fitur</h3>
              <button
                type="button"
                onClick={addFitur}
                className="px-2.5 py-1 bg-amber-50 hover:bg-amber-100 text-amber-600 dark:bg-amber-950 dark:hover:bg-amber-900 dark:text-amber-300 font-bold text-xs rounded-lg border border-amber-200 dark:border-amber-800 transition-all flex items-center gap-1"
              >
                + Tambah Fitur
              </button>
            </div>
            <input type="text" placeholder="Versi (cth: v2.1.0)" value={formData.versi} onChange={(e) => setFormData({ ...formData, versi: e.target.value })} className="w-full p-3 border border-slate-200 dark:border-slate-700 rounded-xl text-sm bg-white dark:bg-slate-800 outline-none shadow-sm mb-2" />
            <div className="space-y-1.5">
              {formData.fitur.map((item, idx) => (
                <div key={idx} className="flex gap-2 items-center">
                  <input
                    type="text"
                    placeholder={`Fitur ${idx + 1}`}
                    value={item}
                    onChange={(e) => handleFiturChange(idx, e.target.value)}
                    className="w-full p-3 border border-slate-200 dark:border-slate-700 rounded-xl text-sm bg-white dark:bg-slate-800 outline-none shadow-sm"
                  />
                  {formData.fitur.length > 5 && (
                    <button
                      type="button"
                      onClick={() => removeFitur(idx)}
                      className="px-3 py-3 bg-rose-100 hover:bg-rose-200 text-rose-600 dark:bg-rose-950 dark:text-rose-300 font-bold text-xs rounded-xl border border-rose-200 dark:border-rose-800 transition-all"
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Section Aset Partner Digantikan */}
          <div className="p-4 bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 rounded-2xl space-y-3">
            <h3 className="font-bold text-xs uppercase tracking-wider text-slate-400">Input Aset {currentPartner.code} Yang Digantikan</h3>
            <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
              {formData.asetCp.map((item, idx) => (
                <div key={idx} className="flex gap-2 items-center text-xs">
                  <span className="w-1/2 truncate font-medium text-slate-700 dark:text-slate-300">{item.name}</span>
                  <input type="text" placeholder="Qty" value={formData.asetCp[idx].qty} onChange={(e) => handleAsetChange(idx, "qty", e.target.value)} className="w-16 p-2 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-center outline-none shadow-sm" />
                  <input type="text" placeholder="Ket" value={formData.asetCp[idx].ket} onChange={(e) => handleAsetChange(idx, "ket", e.target.value)} className="flex-1 p-2 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 outline-none shadow-sm" />
                </div>
              ))}
            </div>
          </div>

          {/* Section 5: Lampiran PDF (digabung pas cetak / Save PDF) */}
          <div className="p-4 bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 rounded-2xl space-y-3">
            <h3 className="font-bold text-xs uppercase tracking-wider text-slate-400">Lampiran PDF</h3>
            <p className="text-[11px] leading-relaxed text-slate-500 dark:text-slate-400">
              PDF yang diupload akan digabung di belakang Berita Acara waktu klik{" "}
              <strong>Cetak / Save PDF</strong>.
            </p>

            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="application/pdf,.pdf"
              onChange={handleAttachmentUpload}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={loadingUpload}
              className="w-full px-4 py-3 bg-sky-500 hover:bg-sky-600 disabled:bg-slate-300 dark:disabled:bg-slate-700 text-white font-bold text-xs rounded-xl shadow transition-all uppercase tracking-wider flex items-center justify-center gap-2 active:scale-[0.99]"
            >
              {loadingUpload ? "⏳ MEMBACA PDF..." : "📤 Upload PDF Lampiran"}
            </button>

            {attachments.length > 0 && (
              <ul className="space-y-2">
                {attachments.map((att) => (
                  <li
                    key={att.id}
                    className="flex items-center justify-between gap-2 p-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
                  >
                    <div className="min-w-0">
                      <p className="text-xs font-semibold truncate text-slate-700 dark:text-slate-200">
                        {att.name}
                      </p>
                      <p className="text-[10px] text-slate-400">
                        {att.pages.length} halaman · {att.size}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeAttachment(att.id)}
                      className="shrink-0 w-6 h-6 rounded-full bg-rose-500 hover:bg-rose-600 text-white text-xs font-bold flex items-center justify-center"
                      title="Hapus lampiran"
                    >
                      ✕
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Section Penandatangan */}
          <div className="p-4 bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 rounded-2xl space-y-4">
            <h3 className="font-bold text-xs uppercase tracking-wider text-slate-400">Tim &amp; Penandatangan</h3>
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-medium mb-1.5 text-xs text-slate-600 dark:text-slate-400">IT Support (IAI)</label>
                <input type="text" value={formData.picParkee} onChange={(e) => setFormData({ ...formData, picParkee: e.target.value })} className="w-full p-3 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-sm outline-none shadow-sm" />
              </div>
              <div>
                <label className="block font-medium mb-1.5 text-xs text-slate-600 dark:text-slate-400">Jabatan Partner</label>
                <select name="jabatanCp" value={formData.jabatanCp} onChange={handleChange} className="w-full p-3 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-sm font-semibold outline-none shadow-sm">
                  {listJabatan.map(j => <option key={j} value={j}>{j}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label className="block font-medium mb-1.5 text-xs text-slate-600 dark:text-slate-400">Nama Terang Partner</label>
              <input type="text" value={formData.picCp} onChange={(e) => setFormData({ ...formData, picCp: e.target.value })} className="w-full p-3 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-sm outline-none shadow-sm" />
            </div>
          </div>
        </div>

        {/* Right Side: Document Preview / Print Area */}
        <div className={`print-preview w-full md:w-7/12 p-6 overflow-y-auto bg-slate-200 dark:bg-slate-900 flex flex-col items-center print:w-full print:p-0 print:bg-white print:overflow-visible ${attachments.length > 0 ? "has-attachment" : ""}`}>
          <div id="print-document" className="print-document bg-white text-slate-900 px-10 pt-6 pb-10 shadow-xl border rounded-sm w-full max-w-[210mm] text-[11px] leading-snug font-sans print:shadow-none print:border-none print:p-0 print:w-full print:overflow-visible">
            
            <table className="w-full border-none">
              <thead>
                <tr>
                  <th className="font-normal text-left pb-4 bg-white">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/parkee-logo.png" alt="PARKEE Logo" className="w-[200px] h-auto object-contain" />
                  </th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>
                    {/* Title */}
                    <h1 className="text-center text-sm font-bold tracking-wide mb-4 text-black uppercase pb-1">
                      BERITA ACARA SERAH TERIMA BARANG & PENYELESAIAN PEKERJAAN
                    </h1>

                    {/* Opening Paragraph */}
                    <p className="mb-3 text-justify leading-relaxed">
                      Pada hari <span className="font-semibold underline">{formData.hari || ".........."}</span>, tanggal <span className="font-semibold underline">{formData.tanggal || ".........."}</span> {formData.tahun}, telah dilakukan penyerahan barang untuk keperluan migrasi (live) PARKEE OS dan pengerjaan instalasi alat & migrasi PARKEE OS oleh PT Inovasi Anak Indonesia (“IAI”), dengan rincian sebagai berikut:
                    </p>

                    {/* Details A - D */}
                    <div className="space-y-1.5 mb-3 pl-2">
                      <div className="flex">
                        <span className="w-44 font-semibold">a. Lokasi parkir</span>
                        <span className="w-4">:</span>
                        <span className="flex-1 font-semibold">{formData.lokasi}</span>
                      </div>
                      <div className="flex">
                        <span className="w-44 font-semibold">b. Dimigrasi oleh</span>
                        <span className="w-4">:</span>
                        <span className="flex-1">{formData.dimigrasiOleh}</span>
                      </div>
                      <div className="flex">
                        <span className="w-44 font-semibold">c. Dimulai dari jam</span>
                        <span className="w-4">:</span>
                        <span className="flex-1">{formData.jamMulai ? `${formData.jamMulai} WIB` : ""} s/d {formData.jamSelesai ? `${formData.jamSelesai} WIB` : ""}</span>
                      </div>
                      <div className="flex">
                        <span className="w-44 font-semibold">d. Aset yang diserahterimakan (“Hardware”)</span>
                        <span className="w-4">:</span>
                        <span className="flex-1">Aset tambahan yang disediakan oleh IAI (masih akan dibayarkan kepada IAI), terlampir pada Delivery Slip.</span>
                      </div>
                    </div>

                    {/* Detail E: Tabel Aset CP Digantikan */}
                    <div className="mb-3">
                      <p className="font-semibold mb-1">e. Aset {currentPartner.code} yang digantikan :</p>
                      <table className="w-full border-collapse border border-black text-[10px]">
                        <thead>
                          <tr className="bg-slate-100">
                            <th className="border border-black px-2 py-0.5 text-left w-1/2">Aset {currentPartner.code} yang digantikan</th>
                            <th className="border border-black px-2 py-0.5 text-center w-1/6">Qty</th>
                            <th className="border border-black px-2 py-0.5 text-left w-1/3">Keterangan</th>
                          </tr>
                        </thead>
                        <tbody>
                          {formData.asetCp.map((item, i) => (
                            <tr key={i}>
                              <td className="border border-black px-2 py-0.5">{item.name}</td>
                              <td className="border border-black px-2 py-0.5 text-center">{item.qty}</td>
                              <td className="border border-black px-2 py-0.5">{item.ket}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Detail F: Issue Sebelum Migrasi */}
                    <div className="mb-3">
                      <p className="font-semibold">f. Issue Sebelum Migrasi :</p>
                      <div className="p-1.5 border border-black min-h-[35px] text-[10px] whitespace-pre-wrap bg-slate-50">
                        {formData.issueSebelumMigrasi || "Tidak ada issue / Sesuai standar."}
                      </div>
                    </div>

                    {/* Detail G: Unit Testing */}
                    <div className="mb-3">
                      <p className="font-semibold mb-1">g. Unit Testing</p>
                      <table className="w-full border-collapse border border-black text-[10px]">
                        <thead>
                          <tr className="bg-slate-100">
                            <th className="border border-black px-2 py-0.5 text-left">Konfigurasi Yang Diperlukan</th>
                            <th className="border border-black px-2 py-0.5 text-center w-1/4">Hasil</th>
                            <th className="border border-black px-2 py-0.5 text-left w-1/3">Keterangan</th>
                          </tr>
                        </thead>
                        <tbody>
                          {[
                            { key: "printer", label: "Pengujian Printer" },
                            { key: "reader", label: "Pengujian Reader" },
                            { key: "camera", label: "Pengujian Camera" },
                            { key: "gate1", label: "Pengujian Gate" },
                            { key: "booster", label: "Pengujian Booster" },
                            { key: "sound", label: "Pengujian Sound" },
                            { key: "gate2", label: "Pengujian Gate" },
                            { key: "ambilTiket", label: "Pengujian Ambil Tiket" },
                            { key: "transaksiTiket", label: "Pengujian Transaksi Tiket" },
                            { key: "transaksiKartu", label: "Pengujian Transaksi Kartu", extra: `Jumlah samcard: ${formData.unitTesting.samcardQty}` },
                            { key: "tarif", label: "Pengujian Tarif" },
                            { key: "membership", label: "Pengujian Membership Product" },
                            { key: "upsServer", label: "Ketersediaan UPS pada Server" },
                            { key: "kesesuaianAsset", label: "Kesesuaian Asset Standar Parkee" },
                          ].map((row, i) => (
                            <tr key={i}>
                              <td className="border border-black px-2 py-0.5">{row.label}</td>
                              <td className="border border-black px-2 py-0.5 text-center">
                                <span className="font-semibold">{formData.unitTesting[row.key as keyof typeof formData.unitTesting]}</span>
                              </td>
                              <td className="border border-black px-2 py-0.5">{row.extra || ""}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Kondisi Harddisk Server Table */}
                    <div className="mb-3">
                      <p className="font-semibold mb-1 uppercase text-[10px]">KONDISI HARDDISK SERVER</p>
                      <table className="w-full border-collapse border border-black text-[10px] text-center">
                        <thead>
                          <tr className="bg-slate-100">
                            <th className="border border-black py-0.5">HEALTH</th>
                            <th className="border border-black py-0.5">PERFORMANCE</th>
                            <th className="border border-black py-0.5">EST. TIME (Days)</th>
                            <th className="border border-black py-0.5">BAD SECTOR</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="border border-black py-1">{formData.hddServer.health || "-"}</td>
                            <td className="border border-black py-1">{formData.hddServer.performance || "-"}</td>
                            <td className="border border-black py-1">{formData.hddServer.estTime || "-"}</td>
                            <td className="border border-black py-1">{formData.hddServer.badSector || "-"}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    {/* Points H & I */}
                    <p className="mb-1 text-justify">
                      h. IAI telah melakukan dan menyelesaikan pekerjaan pemasangan Hardware dan pekerjaan instalasi lainnya untuk migrasi PARKEE OS.
                    </p>
                    <p className="mb-3 text-justify">
                      i. Hasil seluruh pekerjaan telah diperiksa oleh kedua pihak. PARKEE OS sudah berfungsi dengan baik dan sesuai dengan peruntukannya.
                    </p>

                    {/* Detail J: Versi & Fitur */}
                    <div className="mb-3 border border-black p-2">
                      <p className="font-semibold mb-1">j. List Versi dan Fitur</p>
                      <div className="grid grid-cols-2 gap-2 text-[10px]">
                        <div>
                          <span className="font-semibold">Versi:</span>
                          <ol className="list-decimal pl-4">
                            <li>{formData.versi || "-"}</li>
                          </ol>
                        </div>
                        <div>
                          <span className="font-semibold">Fitur:</span>
                          <ol className="list-decimal pl-4">
                            {formData.fitur.map((f, idx) => f ? <li key={idx}>{f}</li> : null)}
                          </ol>
                        </div>
                      </div>
                    </div>

                    {/* Table Jumlah PC */}
                    <div className="mb-4">
                      <p className="font-semibold mb-1 uppercase text-[10px]">JUMLAH PC YANG DIINSTALL</p>
                      <table className="w-full border-collapse border border-black text-[10px] text-center">
                        <thead>
                          <tr className="bg-slate-100">
                            <th className="border border-black py-0.5">Pintu Masuk</th>
                            <th className="border border-black py-0.5">Pintu Keluar</th>
                            <th className="border border-black py-0.5">Server Admin & Lainnya</th>
                            <th className="border border-black py-0.5">Keterangan</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="border border-black py-1">{formData.pcInstalled.masuk || "-"}</td>
                            <td className="border border-black py-1">{formData.pcInstalled.keluar || "-"}</td>
                            <td className="border border-black py-1">{formData.pcInstalled.serverAdmin || "-"}</td>
                            <td className="border border-black py-1 text-left px-2">{formData.pcInstalled.keterangan || "*Jumlah gate aktif"}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    {/* Pernyataan */}
                    <div className="mb-4 text-[10px] leading-relaxed">
                      <p className="font-semibold mb-1">Pernyataan:</p>
                      <ol className="list-decimal pl-4 space-y-0.5">
                        <li>Pekerjaan dilakukan oleh IAI di bawah pengawasan personil {currentPartner.fullName}.</li>
                        <li>Kondisi objek pekerjaan pada saat sebelum dan sesudah IAI melakukan migrasi PARKEE OS, dibuktikan melalui foto yang diambil oleh personil IAI.</li>
                        <li>Team OPS {currentPartner.fullName} wajib menginfokan kepada IAI apabila terdapat perubahan jumlah gate aktif. Jika Team OPS {currentPartner.fullName} tidak menginfokan perubahan jumlah gate aktif, maka IAI akan melakukan penagihan atas jumlah gate aktif sebagaimana yang tertera diatas.</li>
                      </ol>
                    </div>

                    {/* Bottom Signatures */}
                    <div className="mt-8 pt-2">
                      <div className="flex justify-between items-end px-4 text-xs">
                        <div className="text-left space-y-12">
                          <p className="font-bold">PT Inovasi Anak Indonesia</p>
                          <div>
                            <p className="font-bold underline">{formData.picParkee || " "}</p>
                            <p className="font-semibold text-slate-700">IT Support</p>
                          </div>
                        </div>

                        <div className="text-left space-y-12">
                          <p className="font-bold">{currentPartner.fullName}</p>
                          <div>
                            <p className="font-bold underline">{formData.picCp || " "}</p>
                            <p className="font-semibold text-slate-700">{formData.jabatanCp}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Halaman lampiran: ikut tercetak setelah Berita Acara */}
          {attachments.length > 0 && (
            <div className="attachments-wrap w-full max-w-[210mm] flex flex-col gap-4 mt-6 print:block print:m-0 print:max-w-none">
              {attachments.map((att) =>
                att.pages.map((src, idx) => (
                  <figure
                    key={`${att.id}-${idx}`}
                    className="attachment-page relative bg-white shadow-xl border rounded-sm overflow-hidden print:shadow-none print:border-none print:m-0"
                  >
                    <figcaption className="absolute top-2 left-2 z-10 px-2 py-1 rounded bg-slate-900/70 text-white text-[10px] font-semibold print:hidden">
                      {att.name} · hal. {idx + 1}/{att.pages.length}
                    </figcaption>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={src}
                      alt={`${att.name} halaman ${idx + 1}`}
                      className="block w-full h-auto"
                    />
                  </figure>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}