"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function StorageEditor() {
  const [formData, setFormData] = useState({
    tanggal: "",
    lokasi: "",
    kehadiran: "",
    jamMulai: "",
    jamSelesai: "",
    partnerCompany: "", // Kosong di awal, default CP
    issue: "Non Sistem",
    tujuanKunjungan: "Parkee",
    tindakan: "",
    stepDilakukan: "",

    testing: [
      { no: 1, name: "Testing transaksi casual berbayar", status: "sesuai" },
      { no: 2, name: "Testing transaksi casual free", status: "sesuai" },
      { no: 3, name: "Testing transaksi member basic", status: "sesuai" },
      { no: 4, name: "Testing transaksi member compliment", status: "sesuai" },
      { no: 5, name: "Testing transaksi member register casual", status: "sesuai" },
      { no: 6, name: "Testing transaksi valet", status: "sesuai" },
      { no: 7, name: "Testing transaksi mobile cashier", status: "sesuai" },
      { no: 8, name: "Testing transaksi wuzz", status: "sesuai" },
      { no: 9, name: "Testing pendaftaran member pada concierge/LSG", status: "sesuai" },
      { no: 10, name: "Export report harian casual", status: "sesuai" },
      { no: 11, name: "Export report bulanan casual", status: "sesuai" },
      { no: 12, name: "Export report harian member", status: "sesuai" },
      { no: 13, name: "Export report bulanan member", status: "sesuai" },
      { no: 14, name: "………………..", status: "sesuai" },
      { no: 15, name: "………………..", status: "sesuai" },
      { no: 16, name: "………………..", status: "sesuai" },
      { no: 17, name: "………………..", status: "sesuai" },
      { no: 18, name: "………………..", status: "sesuai" },
    ],

    hasil: "",
    assetDigunakan: "",
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
  
  // Hanya tampilkan harga Rp.350.000,- jika kode partner adalah CP atau IPM
  const showPrice = currentPartner.code === "CP" || currentPartner.code === "IPM";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTestingStatusChange = (index: number, status: string) => {
    const updatedTesting = [...formData.testing];
    updatedTesting[index].status = status;
    setFormData({ ...formData, testing: updatedTesting });
  };

  const handleTestingNameChange = (index: number, name: string) => {
    const updatedTesting = [...formData.testing];
    updatedTesting[index].name = name;
    setFormData({ ...formData, testing: updatedTesting });
  };

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

          thead {
            display: table-header-group;
          }
          tr {
            page-break-inside: avoid;
          }
        }
      `}</style>

      {/* Top Bar */}
      <header className="border-b border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md sticky top-0 z-30 print:hidden">
        <div className="max-w-7xl mx-auto px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="px-3.5 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-xs font-bold transition-all text-slate-700 dark:text-slate-200">
              ← Kembali
            </Link>
            <div className="h-4 w-px bg-slate-300 dark:bg-slate-700" />
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-xs">
                💾
              </span>
              <span className="font-semibold text-sm tracking-tight text-slate-700 dark:text-slate-200">
                Berita Acara <span className="font-bold text-indigo-600 dark:text-indigo-400">Switch SSD / Server</span>
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
                Storage Editor Form
              </span>
              <h2 className="text-lg font-bold text-slate-800 dark:text-white mt-0.5 tracking-tight">
                Form Input Data Storage
              </h2>
            </div>
            <span className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-[11px] font-medium rounded-lg">
              Live Preview
            </span>
          </div>

          {/* Section Partner dengan Search Inisial */}
          <div className="p-4 bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/50 rounded-2xl space-y-2">
            <label className="block font-bold text-indigo-900 dark:text-indigo-300 text-xs uppercase tracking-wider">
              Perusahaan Partner / Mitra (Ketik inisial cth: CP, RGA)
            </label>
            <input
              type="text"
              name="partnerCompany"
              list="partner-list-storage"
              value={formData.partnerCompany}
              onChange={handleChange}
              placeholder="Ketik inisial (Default: CP)..."
              className="w-full p-3 border border-indigo-200 dark:border-indigo-800 rounded-xl bg-white dark:bg-slate-800 text-sm font-semibold outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm transition-all"
            />
            <datalist id="partner-list-storage">
              {partnerList.map((item, idx) => (
                <option key={idx} value={`${item.fullName} (${item.code})`} />
              ))}
            </datalist>
          </div>

          {/* Section Waktu & Lokasi */}
          <div className="p-4 bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 rounded-2xl space-y-4">
            <h3 className="font-bold text-xs uppercase tracking-wider text-slate-400">Waktu &amp; Lokasi</h3>

            <div>
              <label className="block font-medium mb-1.5 text-xs text-slate-600 dark:text-slate-400">Tanggal</label>
              <input type="text" name="tanggal" placeholder="Cth: Senin, 15 Agustus 2026" value={formData.tanggal} onChange={handleChange} className="w-full p-3 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-sm outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm" />
            </div>

            <div>
              <label className="block font-medium mb-1.5 text-xs text-slate-600 dark:text-slate-400">Lokasi</label>
              <input type="text" name="lokasi" placeholder="Nama Lokasi Parkir" value={formData.lokasi} onChange={handleChange} className="w-full p-3 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-sm outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm" />
            </div>

            <div>
              <label className="block font-medium mb-1.5 text-xs text-slate-600 dark:text-slate-400">Kehadiran (Personil)</label>
              <input type="text" name="kehadiran" placeholder="Nama Personil" value={formData.kehadiran} onChange={handleChange} className="w-full p-3 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-sm outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-medium mb-1.5 text-xs text-slate-600 dark:text-slate-400">Jam Mulai</label>
                <input type="time" name="jamMulai" value={formData.jamMulai} onChange={handleChange} className="w-full p-3 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-sm outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm" />
              </div>
              <div>
                <label className="block font-medium mb-1.5 text-xs text-slate-600 dark:text-slate-400">Jam Selesai</label>
                <input type="time" name="jamSelesai" value={formData.jamSelesai} onChange={handleChange} className="w-full p-3 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-sm outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-medium mb-1.5 text-xs text-slate-600 dark:text-slate-400">Issue</label>
                <select name="issue" value={formData.issue} onChange={handleChange} className="w-full p-3 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-sm font-semibold outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm">
                  <option value="Non Sistem">Non Sistem {showPrice ? "= Rp.350.000,-" : ""}</option>
                  <option value="Sistem">Sistem</option>
                </select>
              </div>
              <div>
                <label className="block font-medium mb-1.5 text-xs text-slate-600 dark:text-slate-400">Tujuan Kunjungan</label>
                <select name="tujuanKunjungan" value={formData.tujuanKunjungan} onChange={handleChange} className="w-full p-3 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-sm font-semibold outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm">
                  <option value="Parkee">Parkee</option>
                  <option value="Lain-lain">Lain-lain</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-medium mb-1.5 text-xs text-slate-600 dark:text-slate-400">Tindakan</label>
              <input type="text" name="tindakan" placeholder="Tindakan yang diberikan..." value={formData.tindakan} onChange={handleChange} className="w-full p-3 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-sm outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm" />
            </div>

            <div>
              <label className="block font-medium mb-1.5 text-xs text-slate-600 dark:text-slate-400">Step Yang Dilakukan</label>
              <textarea name="stepDilakukan" rows={2} placeholder="Langkah-langkah pengerjaan..." value={formData.stepDilakukan} onChange={handleChange} className="w-full p-3 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-sm outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm resize-none" />
            </div>
          </div>

          {/* Section Konfigurasi Testing (1-18) */}
          <div className="p-4 bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 rounded-2xl space-y-3">
            <h3 className="font-bold text-xs uppercase tracking-wider text-slate-400">Konfigurasi Testing (1-18)</h3>
            <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
              {formData.testing.map((item, idx) => (
                <div key={idx} className="flex gap-2 items-center text-xs">
                  <span className="w-6 font-semibold text-slate-600 dark:text-slate-400">{item.no}.</span>
                  <input type="text" value={item.name} onChange={(e) => handleTestingNameChange(idx, e.target.value)} className="flex-1 p-2 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-xs outline-none shadow-sm" />
                  <select value={item.status} onChange={(e) => handleTestingStatusChange(idx, e.target.value)} className="w-24 p-2 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-xs font-semibold outline-none shadow-sm">
                    <option value="sesuai">Sesuai</option>
                    <option value="tidak sesuai">Tdk Sesuai</option>
                    <option value="tidak ada">Tdk Ada</option>
                  </select>
                </div>
              ))}
            </div>
          </div>

          {/* Section Hasil & Catatan */}
          <div className="p-4 bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 rounded-2xl space-y-3">
            <h3 className="font-bold text-xs uppercase tracking-wider text-slate-400">Hasil &amp; Catatan</h3>
            <div>
              <label className="block font-medium mb-1.5 text-xs text-slate-600 dark:text-slate-400">Hasil</label>
              <input type="text" name="hasil" placeholder="Hasil pengerjaan..." value={formData.hasil} onChange={handleChange} className="w-full p-3 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-sm outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm" />
            </div>
            <div>
              <label className="block font-medium mb-1.5 text-xs text-slate-600 dark:text-slate-400">Asset Yang Digunakan</label>
              <input type="text" name="assetDigunakan" placeholder="Nama/Detail asset..." value={formData.assetDigunakan} onChange={handleChange} className="w-full p-3 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-sm outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm" />
            </div>
            <div>
              <label className="block font-medium mb-1.5 text-xs text-slate-600 dark:text-slate-400">Notes Tambahan</label>
              <textarea name="notes" rows={2} placeholder="Catatan tambahan..." value={formData.notes} onChange={handleChange} className="w-full p-3 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-sm outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm resize-none" />
            </div>
          </div>

          {/* Section Penandatangan */}
          <div className="p-4 bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 rounded-2xl space-y-4">
            <h3 className="font-bold text-xs uppercase tracking-wider text-slate-400">Tim &amp; Penandatangan</h3>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-medium mb-1.5 text-xs text-slate-600 dark:text-slate-400">IT Support (IAI)</label>
                <input type="text" placeholder="Nama Terang" value={formData.picParkee} onChange={(e) => setFormData({ ...formData, picParkee: e.target.value })} className="w-full p-3 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-sm outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm" />
              </div>
              <div>
                <label className="block font-medium mb-1.5 text-xs text-slate-600 dark:text-slate-400">Jabatan Partner</label>
                <select name="jabatanCp" value={formData.jabatanCp} onChange={handleChange} className="w-full p-3 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-sm font-semibold outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm">
                  {listJabatan.map(j => <option key={j} value={j}>{j}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label className="block font-medium mb-1.5 text-xs text-slate-600 dark:text-slate-400">Nama Terang Partner</label>
              <input type="text" placeholder="Nama Terang" value={formData.picCp} onChange={(e) => setFormData({ ...formData, picCp: e.target.value })} className="w-full p-3 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-sm outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm" />
            </div>
          </div>

        </div>

        {/* Right Side: Document Preview / Print Area */}
        <div className="print-preview w-full md:w-7/12 p-6 overflow-y-auto bg-slate-200 dark:bg-slate-900 flex justify-center print:w-full print:p-0 print:bg-white print:overflow-visible">
          <div id="print-document" className="print-document bg-white text-slate-900 px-10 pt-6 pb-10 shadow-xl border rounded-sm w-full max-w-[210mm] text-[10.5px] leading-tight font-sans print:shadow-none print:border-none print:p-0 print:w-full print:overflow-visible">
            
            <table className="w-full border-none">
              <thead>
                <tr>
                  <th className="font-normal text-left pb-3 bg-white">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/parkee-logo.png" alt="PARKEE Logo" className="w-[180px] h-auto object-contain" />
                  </th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>
                    <h1 className="text-center text-xs font-bold tracking-wide mb-3 text-black uppercase pb-1">
                      BERITA ACARA PERGANTIAN STORAGE ATAU PC SERVER
                    </h1>

                    <div className="space-y-1 mb-3 pl-1">
                      <div className="flex">
                        <span className="w-36 font-semibold">Tanggal</span>
                        <span className="w-3">:</span>
                        <span className="flex-1 font-semibold">{formData.tanggal || "................................................"}</span>
                      </div>
                      <div className="flex">
                        <span className="w-36 font-semibold">Lokasi</span>
                        <span className="w-3">:</span>
                        <span className="flex-1 font-semibold">{formData.lokasi || "................................................"}</span>
                      </div>
                      <div className="flex">
                        <span className="w-36 font-semibold">Kehadiran</span>
                        <span className="w-3">:</span>
                        <span className="flex-1">{formData.kehadiran || "................................................"}</span>
                      </div>
                      <div className="flex">
                        <span className="w-36 font-semibold">Jam Mulai</span>
                        <span className="w-3">:</span>
                        <span className="flex-1">{formData.jamMulai ? `${formData.jamMulai} WIB` : "..................................."}</span>
                      </div>
                      <div className="flex">
                        <span className="w-36 font-semibold">Jam Selesai</span>
                        <span className="w-3">:</span>
                        <span className="flex-1">{formData.jamSelesai ? `${formData.jamSelesai} WIB` : "..................................."}</span>
                      </div>
                      <div className="flex">
                        <span className="w-36 font-semibold">Issue</span>
                        <span className="w-3">:</span>
                        <span className="flex-1 font-semibold flex items-center gap-6">
                          <span>[ {formData.issue === "Sistem" ? "✔" : " "} ] Sistem</span>
                          <span>[ {formData.issue === "Non Sistem" ? "✔" : " "} ] Non Sistem {showPrice ? "= Rp.350.000,-" : ""}</span>
                        </span>
                      </div>
                      <div className="flex">
                        <span className="w-36 font-semibold">Tujuan Kunjungan</span>
                        <span className="w-3">:</span>
                        <span className="flex-1 flex items-center gap-6">
                          <span>[ {formData.tujuanKunjungan === "Parkee" ? "✔" : " "} ] Parkee</span>
                          <span>[ {formData.tujuanKunjungan === "Lain-lain" ? "✔" : " "} ] Lain-lain</span>
                        </span>
                      </div>
                      <div className="flex">
                        <span className="w-36 font-semibold">Tindakan</span>
                        <span className="w-3">:</span>
                        <span className="flex-1">{formData.tindakan || "-"}</span>
                      </div>
                      <div className="flex">
                        <span className="w-36 font-semibold">Step yang dilakukan</span>
                        <span className="w-3">:</span>
                        <span className="flex-1 whitespace-pre-wrap">{formData.stepDilakukan || "-"}</span>
                      </div>
                    </div>

                    <div className="mb-3">
                      <table className="w-full border-collapse border border-black text-[10px]">
                        <thead>
                          <tr className="bg-slate-100">
                            <th className="border border-black px-1.5 py-0.5 text-center w-8">No</th>
                            <th className="border border-black px-2 py-0.5 text-left">Konfigurasi yang diperlukan</th>
                            <th className="border border-black px-2 py-0.5 text-center w-1/3">Hasil (sesuai / tidak sesuai / tidak ada)</th>
                          </tr>
                        </thead>
                        <tbody>
                          {formData.testing.map((item, i) => (
                            <tr key={i}>
                              <td className="border border-black px-1.5 py-0.5 text-center">{item.no}</td>
                              <td className="border border-black px-2 py-0.5">{item.name}</td>
                              <td className="border border-black px-2 py-0.5 text-center uppercase font-semibold text-[9.5px]">
                                {item.status}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div className="space-y-1.5 mb-3 pl-1 text-[10px]">
                      <div className="flex">
                        <span className="w-32 font-semibold">Hasil</span>
                        <span className="w-3">:</span>
                        <span className="flex-1 font-semibold">{formData.hasil || "-"}</span>
                      </div>
                      <div className="flex">
                        <span className="w-32 font-semibold">Asset yang digunakan</span>
                        <span className="w-3">:</span>
                        <span className="flex-1">{formData.assetDigunakan || "-"}</span>
                      </div>
                      <div className="flex">
                        <span className="w-32 font-semibold">Notes</span>
                        <span className="w-3">:</span>
                        <span className="flex-1 whitespace-pre-wrap">{formData.notes || "-"}</span>
                      </div>
                    </div>

                    <div className="mb-4 text-[9.5px] leading-tight bg-slate-50 p-2 border border-black/40 rounded-sm">
                      <ul className="list-disc pl-4 space-y-0.5">
                        <li>Asset existing lokasi yang korup/rusak dan PARKEE meminjamkan asset ke lokasi {currentPartner.code}.</li>
                        <li>Asset pinjaman akan dikembalikan ke PARKEE oleh {currentPartner.code}, setelah diganti dengan asset yang baru.</li>
                        <li>Jika dalam waktu 1 minggu belum dikembalikan, PARKEE akan charge asset yang dipinjamkan ke {currentPartner.code}.</li>
                        <li>Asset yang digunakan berdasarkan Delivery Order yang dikirimkan PARKEE dan diterima oleh PIC/Ops Lokasi {currentPartner.code} akan ditagihkan ke {currentPartner.code}.</li>
                      </ul>
                    </div>

                    <div className="mt-6 pt-2">
                      <div className="flex justify-between items-end px-4 text-xs">
                        <div className="text-left space-y-10">
                          <p className="font-bold">PT Inovasi Anak Indonesia</p>
                          <div>
                            <p className="font-bold underline">{formData.picParkee || " "}</p>
                            <p className="font-semibold text-slate-700">IT Support</p>
                          </div>
                        </div>

                        <div className="text-left space-y-10">
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
        </div>
      </div>
    </div>
  );
}