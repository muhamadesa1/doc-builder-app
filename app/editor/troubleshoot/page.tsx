"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function TroubleshootEditor() {
  const [formData, setFormData] = useState({
    tanggal: "",
    lokasi: "",
    kehadiran: "",
    jamMulai: "",
    jamSelesai: "",
    issueType: "",
    tujuanKunjungan: "",
    partnerCompany: "", // Kosong di awal saat pertama kali dibuka
    tindakan: "",
    step: "",
    hasil: "",
    asset: "",
    picParkee: "",
    picCp: "",
    jabatanCp: "Car Park Manager",
  });

  const listJabatan = ["PIC", "LEAD", "Area Manager", "Car Park Manager"];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggleSelect = (field: "issueType" | "tujuanKunjungan", value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field] === value ? "" : value,
    }));
  };

  // Daftar lengkap perusahaan partner dengan inisial
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

  // Logika: Jika input kosong, otomatis fallback ke default ("CP" / Centrepark)
  const cleanPartnerName = formData.partnerCompany.replace(/\s*\([A-Za-z0-9_-]+\)$/, "").trim();
  const currentPartnerData = partnerList.find(
    p => p.fullName.toLowerCase() === cleanPartnerName.toLowerCase() || p.code.toLowerCase() === formData.partnerCompany.trim().toLowerCase()
  ) || partnerList[0]; // Fallback ke partner pertama (CP) jika kosong
  
  const currentPartner = { fullName: currentPartnerData.fullName, code: currentPartnerData.code };
  const showPrice = currentPartner.code === "CP" || currentPartner.code === "IPM";

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans relative overflow-x-hidden">
      {/* Background Dot Grid Pattern */}
      <div className="absolute inset-0 z-0 opacity-40 dark:opacity-20 pointer-events-none bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] dark:bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:24px_24px]" />

      {/* Background Soft Glow Orb */}
      <div className="absolute top-[-50px] left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-tr from-indigo-200 via-purple-200 to-blue-200 dark:from-indigo-950 dark:via-purple-950 dark:to-blue-950 blur-[130px] rounded-full pointer-events-none opacity-50 z-0" />

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
            width: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
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
            width: 100% !important;
            max-width: 100% !important;
            min-width: 100% !important;
            height: auto !important;
            overflow: visible !important;
            position: static !important;
            box-shadow: none !important;
            border: none !important;
            outline: none !important;
            padding: 8mm 10mm !important;
            margin: 0 !important;
            background: white !important;
          }
        }
      `}</style>

      {/* Top Bar */}
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
              <span className="w-7 h-7 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-xs">
                🛠️
              </span>
              <span className="font-semibold text-sm tracking-tight text-slate-700 dark:text-slate-200">
                Berita Acara <span className="font-bold text-indigo-600 dark:text-indigo-400">Troubleshoot</span>
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
        
        {/* Left Side: Input Form */}
        <div className="w-full md:w-5/12 p-6 overflow-y-auto border-r border-slate-200/80 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md print:hidden space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
            <div>
              <span className="text-[10px] font-bold tracking-wider uppercase text-indigo-500 dark:text-indigo-400 opacity-90">
                Interactive Form
              </span>
              <h2 className="text-lg font-bold text-slate-800 dark:text-white mt-0.5 tracking-tight">
                Form Input Data
              </h2>
            </div>
            <span className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-[11px] font-medium rounded-lg">
              Live Preview
            </span>
          </div>

          <div className="space-y-5 text-sm">
            {/* Section 1: Partner dengan Search Inisial / Nama (Kosong di awal, default CP) */}
            <div className="p-4 bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/50 rounded-2xl space-y-2">
              <label className="block font-bold text-indigo-900 dark:text-indigo-300 text-xs uppercase tracking-wider">
                Perusahaan Partner / Mitra (Ketik inisial cth: CP, RGA)
              </label>
              <input
                type="text"
                name="partnerCompany"
                list="partner-list"
                value={formData.partnerCompany}
                onChange={handleChange}
                placeholder="Ketik inisial (Default: CP)..."
                className="w-full p-3 border border-indigo-200 dark:border-indigo-800 rounded-xl bg-white dark:bg-slate-800 text-sm font-semibold outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm transition-all"
              />
              <datalist id="partner-list">
                {partnerList.map((item, idx) => (
                  <option key={idx} value={`${item.fullName} (${item.code})`} />
                ))}
              </datalist>
            </div>

            {/* Section 2: Waktu & Lokasi */}
            <div className="p-4 bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 rounded-2xl space-y-4">
              <h3 className="font-bold text-xs uppercase tracking-wider text-slate-400">Waktu &amp; Lokasi</h3>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium mb-1.5 text-xs text-slate-600 dark:text-slate-400">Tanggal</label>
                  <input
                    type="date"
                    name="tanggal"
                    value={formData.tanggal}
                    onChange={handleChange}
                    className="w-full p-3 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-sm outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
                  />
                </div>
                <div>
                  <label className="block font-medium mb-1.5 text-xs text-slate-600 dark:text-slate-400">Lokasi</label>
                  <input
                    type="text"
                    name="lokasi"
                    placeholder="Nama Lokasi"
                    value={formData.lokasi}
                    onChange={handleChange}
                    className="w-full p-3 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-sm outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium mb-1.5 text-xs text-slate-600 dark:text-slate-400">Kehadiran (Teknisi / PIC)</label>
                <input
                  type="text"
                  name="kehadiran"
                  placeholder="Contoh: Budi, Andi"
                  value={formData.kehadiran}
                  onChange={handleChange}
                  className="w-full p-3 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-sm outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium mb-1.5 text-xs text-slate-600 dark:text-slate-400">Jam Mulai</label>
                  <input
                    type="time"
                    name="jamMulai"
                    value={formData.jamMulai}
                    onChange={handleChange}
                    className="w-full p-3 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-sm outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
                  />
                </div>
                <div>
                  <label className="block font-medium mb-1.5 text-xs text-slate-600 dark:text-slate-400">Jam Selesai</label>
                  <input
                    type="time"
                    name="jamSelesai"
                    value={formData.jamSelesai}
                    onChange={handleChange}
                    className="w-full p-3 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-sm outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
                  />
                </div>
              </div>
            </div>

            {/* Section 3: Detail Troubleshoot */}
            <div className="p-4 bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 rounded-2xl space-y-4">
              <h3 className="font-bold text-xs uppercase tracking-wider text-slate-400">Detail Kendala &amp; Tindakan</h3>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium mb-1.5 text-xs text-slate-600 dark:text-slate-400">Jenis Issue</label>
                  <select
                    name="issueType"
                    value={formData.issueType}
                    onChange={handleChange}
                    className="w-full p-3 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-sm outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
                  >
                    <option value="">-- Pilih Issue --</option>
                    <option value="Sistem">Sistem</option>
                    <option value="Non Sistem">
                      Non Sistem {showPrice ? "= Rp.350.000,-" : ""}
                    </option>
                  </select>
                </div>
                <div>
                  <label className="block font-medium mb-1.5 text-xs text-slate-600 dark:text-slate-400">Tujuan Kunjungan</label>
                  <select
                    name="tujuanKunjungan"
                    value={formData.tujuanKunjungan}
                    onChange={handleChange}
                    className="w-full p-3 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-sm outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
                  >
                    <option value="">-- Pilih Tujuan --</option>
                    <option value="Parkee">Parkee</option>
                    <option value="Lain-lain">Lain-lain</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-medium mb-1.5 text-xs text-slate-600 dark:text-slate-400">Tindakan</label>
                <textarea
                  name="tindakan"
                  rows={2}
                  placeholder="Tindakan awal..."
                  value={formData.tindakan}
                  onChange={handleChange}
                  className="w-full p-3 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-sm outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm resize-none"
                />
              </div>

              <div>
                <label className="block font-medium mb-1.5 text-xs text-slate-600 dark:text-slate-400">Step yang dilakukan</label>
                <textarea
                  name="step"
                  rows={3}
                  placeholder="Langkah-langkah perbaikan..."
                  value={formData.step}
                  onChange={handleChange}
                  className="w-full p-3 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-sm outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm resize-none"
                />
              </div>

              <div>
                <label className="block font-medium mb-1.5 text-xs text-slate-600 dark:text-slate-400">Hasil</label>
                <input
                  type="text"
                  name="hasil"
                  placeholder="Hasil akhir penanganan"
                  value={formData.hasil}
                  onChange={handleChange}
                  className="w-full p-3 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-sm outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
                />
              </div>

              <div>
                <label className="block font-medium mb-1.5 text-xs text-slate-600 dark:text-slate-400">Asset yang digunakan</label>
                <input
                  type="text"
                  name="asset"
                  placeholder="Daftar asset/komponen pengganti"
                  value={formData.asset}
                  onChange={handleChange}
                  className="w-full p-3 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-sm outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
                />
              </div>
            </div>

            {/* Section 4: Penandatangan */}
            <div className="p-4 bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 rounded-2xl space-y-4">
              <h3 className="font-bold text-xs uppercase tracking-wider text-slate-400">Tim &amp; Penandatangan</h3>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium mb-1.5 text-xs text-slate-600 dark:text-slate-400">IT Support (Parkee)</label>
                  <input
                    type="text"
                    name="picParkee"
                    placeholder="Nama Terang"
                    value={formData.picParkee}
                    onChange={handleChange}
                    className="w-full p-3 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-sm outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
                  />
                </div>
                
                <div>
                  <label className="block font-medium mb-1.5 text-xs text-slate-600 dark:text-slate-400">Jabatan Partner</label>
                  <select
                    name="jabatanCp"
                    value={formData.jabatanCp}
                    onChange={handleChange}
                    className="w-full p-3 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-sm font-semibold outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
                  >
                    {listJabatan.map((j) => (
                      <option key={j} value={j}>{j}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-medium mb-1.5 text-xs text-slate-600 dark:text-slate-400">Nama Terang Partner / Manager</label>
                <input
                  type="text"
                  name="picCp"
                  placeholder="Masukkan Nama Terang"
                  value={formData.picCp}
                  onChange={handleChange}
                  className="w-full p-3 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-sm outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
                />
              </div>
            </div>

          </div>
        </div>

        {/* Right Side: Document Preview / Print Area */}
        <div className="print-preview w-full md:w-7/12 p-6 overflow-y-auto bg-slate-200 dark:bg-slate-900 flex justify-center print:w-full print:p-0 print:bg-white print:overflow-visible">
          <div id="print-document" className="print-document bg-white text-slate-900 px-12 pt-6 pb-8 shadow-xl border rounded-sm w-full max-w-[210mm] text-sm font-sans flex flex-col justify-between print:shadow-none print:border-none print:p-0 print:w-full print:overflow-visible">
            <div>
              <div className="mb-3 flex justify-start items-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/parkee-logo.png"
                  alt="PARKEE Logo"
                  className="w-[260px] h-auto object-contain"
                />
              </div>

              <h1 className="text-center text-lg font-bold mb-6 text-black">
                Berita Acara Troubleshoot
              </h1>

              <div className="space-y-2.5 leading-relaxed">
                <div className="flex"><span className="w-40 font-semibold">Tanggal</span><span className="w-6 text-center">:</span><span className="flex-1">{formData.tanggal}</span></div>
                <div className="flex"><span className="w-40 font-semibold">Lokasi</span><span className="w-6 text-center">:</span><span className="flex-1">{formData.lokasi}</span></div>
                <div className="flex"><span className="w-40 font-semibold">Kehadiran</span><span className="w-6 text-center">:</span><span className="flex-1">{formData.kehadiran}</span></div>
                <div className="flex"><span className="w-40 font-semibold">Jam Mulai</span><span className="w-6 text-center">:</span><span className="flex-1">{formData.jamMulai}</span></div>
                <div className="flex"><span className="w-40 font-semibold">Jam Selesai</span><span className="w-6 text-center">:</span><span className="flex-1">{formData.jamSelesai}</span></div>
                
                {/* Issue dengan Text Checkbox [ X ] */}
                <div className="flex items-center">
                  <span className="w-40 font-semibold">Issue</span><span className="w-6 text-center">:</span>
                  <div className="flex items-center gap-8">
                    <button type="button" onClick={() => toggleSelect("issueType", "Sistem")} className="flex items-center gap-2">
                      <span className="font-mono font-bold text-base">
                        {formData.issueType === "Sistem" ? "[ X ]" : "[   ]"}
                      </span>
                      <span>Sistem</span>
                    </button>
                    <button type="button" onClick={() => toggleSelect("issueType", "Non Sistem")} className="flex items-center gap-2">
                      <span className="font-mono font-bold text-base">
                        {formData.issueType === "Non Sistem" ? "[ X ]" : "[   ]"}
                      </span>
                      <span>
                        Non Sistem {showPrice ? "= Rp.350.000,-" : ""}
                      </span>
                    </button>
                  </div>
                </div>

                {/* Tujuan Kunjungan dengan Text Checkbox [ X ] */}
                <div className="flex items-center">
                  <span className="w-40 font-semibold">Tujuan Kunjungan</span><span className="w-6 text-center">:</span>
                  <div className="flex items-center gap-8">
                    <button type="button" onClick={() => toggleSelect("tujuanKunjungan", "Parkee")} className="flex items-center gap-2">
                      <span className="font-mono font-bold text-base">
                        {formData.tujuanKunjungan === "Parkee" ? "[ X ]" : "[   ]"}
                      </span>
                      <span>Parkee</span>
                    </button>
                    <button type="button" onClick={() => toggleSelect("tujuanKunjungan", "Lain-lain")} className="flex items-center gap-2">
                      <span className="font-mono font-bold text-base">
                        {formData.tujuanKunjungan === "Lain-lain" ? "[ X ]" : "[   ]"}
                      </span>
                      <span>Lain-lain</span>
                    </button>
                  </div>
                </div>

                <div className="flex pt-1"><span className="w-40 font-semibold">Tindakan</span><span className="w-6 text-center">:</span><span className="flex-1">{formData.tindakan}</span></div>
                <div className="flex pt-1"><span className="w-40 font-semibold">Step yang dilakukan</span><span className="w-6 text-center">:</span><span className="flex-1 whitespace-pre-wrap">{formData.step}</span></div>
                <div className="flex pt-1"><span className="w-40 font-semibold">Hasil</span><span className="w-6 text-center">:</span><span className="flex-1">{formData.hasil}</span></div>
                <div className="flex pt-1"><span className="w-40 font-semibold">Asset yang digunakan</span><span className="w-6 text-center">:</span><span className="flex-1">{formData.asset}</span></div>

                <div className="flex pt-3">
                  <span className="w-40 font-semibold">Notes</span><span className="w-6 text-center">:</span>
                  <div className="flex-1">
                    <ul className="list-disc pl-4 space-y-1 text-xs text-slate-800">
                      <li>Asset existing lokasi yang korup/rusak dan PARKEE meminjamkan asset ke lokasi {currentPartner.code}.</li>
                      <li>Asset pinjaman akan dikembalikan ke PARKEE oleh {currentPartner.code}, setelah diganti dengan asset yang baru.</li>
                      <li>Jika dalam waktu 1 minggu belum dikembalikan, PARKEE akan charge asset yang dipinjamkan ke {currentPartner.code}.</li>
                      <li>Asset yang digunakan berdasarkan Delivery Order yang dikirimkan PARKEE dan diterima oleh PIC/Ops Lokasi {currentPartner.code} akan ditagihkan ke {currentPartner.code}.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-2">
              <div className="flex justify-between items-end px-4">
                <div className="text-left space-y-14">
                  <p className="font-bold">PT Inovasi Anak Indonesia</p>
                  <div>
                    <p className="font-bold underline">{formData.picParkee || " "}</p>
                    <p className="font-semibold text-slate-700">IT Support</p>
                  </div>
                </div>
                <div className="text-left space-y-14">
                  <p className="font-bold">{currentPartner.fullName}</p>
                  <div>
                    <p className="font-bold underline">{formData.picCp || " "}</p>
                    <p className="font-semibold text-slate-700">{formData.jabatanCp}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}