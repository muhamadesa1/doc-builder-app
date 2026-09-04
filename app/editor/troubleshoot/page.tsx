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
    partnerCompany: "CP", // Default CP
    tindakan: "",
    step: "",
    hasil: "",
    asset: "",
    picParkee: "",
    picCp: "", // Nama Terang (diisi manual)
    jabatanCp: "Car Park Manager", // Jabatan (pilihan dropdown)
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

  const partnerConfig: Record<string, { fullName: string; code: string }> = {
    CP: { fullName: "PT. Centrepark Citra Corpora", code: "CP" },
    IPM: { fullName: "PT. Inovasi Parkir Mandiri", code: "IPM" },
    UPP_DKI: { fullName: "Unit Pengelola Perparkiran Provinsi DKI Jakarta", code: "Unit Pengelola Perparkiran Provinsi DKI Jakarta" },
    ZENITH: { fullName: "PT Zenith Indonesia Solutions", code: "PT Zenith Indonesia Solutions" },
    TSP: { fullName: "PT Tiga Saudara Propertama", code: "PT Tiga Saudara Propertama" },
    TMS: { fullName: "PT Tekno Mandiri Sejahtera", code: "PT Tekno Mandiri Sejahtera" },
    SML: { fullName: "PT Semai Maju Lestari", code: "PT Semai Maju Lestari" },
    PATRA: { fullName: "PT Patra Jasa", code: "PT Patra Jasa" },
    BINA_WALUYA: { fullName: "PT Bina Waluya", code: "PT Bina Waluya" },
    BANGSAWAN: { fullName: "PT Bangsawan Cyberindo Indonesia", code: "PT Bangsawan Cyberindo Indonesia" },
    ADHI: { fullName: "PT Adhi Commuter Properti Tbk.", code: "PT Adhi Commuter Properti Tbk." },
    UPK: { fullName: "CV Utama Persada Karya", code: "CV Utama Persada Karya" },
    SMB: { fullName: "CV Selaras Multi Bisnis", code: "CV Selaras Multi Bisnis" },
    AMANAH: { fullName: "PT Amanah Parking", code: "PT Amanah Parking" },
    NUGRAH: { fullName: "PT Nugrah Tanamal", code: "PT Nugrah Tanamal" },
    BIJAK: { fullName: "PT Bijak", code: "PT Bijak" },
    KRIJAYA: { fullName: "PT Krijaya Tika Mandiri", code: "PT Krijaya Tika Mandiri" },
  };

  const currentPartner = partnerConfig[formData.partnerCompany] || partnerConfig.CP;
  
  // Cek apakah partner yang dipilih termasuk yang menampilkan harga (CP atau IPM)
  const showPrice = formData.partnerCompany === "CP" || formData.partnerCompany === "IPM";

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-100 flex flex-col">
      {/* Top Bar */}
      <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 px-6 py-3 flex items-center justify-between sticky top-0 z-10 print:hidden">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="text-sm font-medium text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
          >
            ← Kembali
          </Link>
          <h1 className="text-lg font-bold">Editor Berita Acara Troubleshoot</h1>
        </div>
        <button
          onClick={() => window.print()}
          className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm rounded-lg shadow transition-all flex items-center gap-2"
        >
          🖨️ Cetak / Save PDF
        </button>
      </header>

      {/* Main Workspace */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Left Side: Input Form */}
        <div className="w-full md:w-5/12 p-6 overflow-y-auto border-r border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 print:hidden">
          <h2 className="text-xl font-bold mb-6 text-indigo-600">Form Input Data</h2>
          
          <div className="space-y-4 text-sm">
            {/* Dropdown Pilihan Perusahaan Partner */}
            <div className="p-3 bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800 rounded-lg">
              <label className="block font-bold mb-1 text-indigo-700 dark:text-indigo-300">
                Perusahaan Partner / Mitra
              </label>
              <select
                name="partnerCompany"
                value={formData.partnerCompany}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg bg-white dark:bg-slate-800 border-indigo-300 dark:border-indigo-700 font-semibold"
              >
                {Object.keys(partnerConfig).map((key) => (
                    <option key={key} value={key}>{partnerConfig[key].fullName}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-medium mb-1">Tanggal</label>
                <input
                  type="date"
                  name="tanggal"
                  value={formData.tanggal}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg bg-slate-50 dark:bg-slate-700 border-slate-300 dark:border-slate-600"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Lokasi</label>
                <input
                  type="text"
                  name="lokasi"
                  placeholder="Nama Lokasi"
                  value={formData.lokasi}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg bg-slate-50 dark:bg-slate-700 border-slate-300 dark:border-slate-600"
                />
              </div>
            </div>

            <div>
              <label className="block font-medium mb-1">Kehadiran</label>
              <input
                type="text"
                name="kehadiran"
                placeholder="Nama-nama teknisi/PIC yang hadir"
                value={formData.kehadiran}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg bg-slate-50 dark:bg-slate-700 border-slate-300 dark:border-slate-600"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-medium mb-1">Jam Mulai</label>
                <input
                  type="time"
                  name="jamMulai"
                  value={formData.jamMulai}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg bg-slate-50 dark:bg-slate-700 border-slate-300 dark:border-slate-600"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Jam Selesai</label>
                <input
                  type="time"
                  name="jamSelesai"
                  value={formData.jamSelesai}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg bg-slate-50 dark:bg-slate-700 border-slate-300 dark:border-slate-600"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-medium mb-1">Jenis Issue</label>
                <select
                  name="issueType"
                  value={formData.issueType}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg bg-slate-50 dark:bg-slate-700 border-slate-300 dark:border-slate-600"
                >
                  <option value="">-- Pilih Issue --</option>
                  <option value="Sistem">Sistem</option>
                  <option value="Non Sistem">
                    Non Sistem {showPrice ? "= Rp.350.000,-" : ""}
                  </option>
                </select>
              </div>
              <div>
                <label className="block font-medium mb-1">Tujuan Kunjungan</label>
                <select
                  name="tujuanKunjungan"
                  value={formData.tujuanKunjungan}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg bg-slate-50 dark:bg-slate-700 border-slate-300 dark:border-slate-600"
                >
                  <option value="">-- Pilih Tujuan --</option>
                  <option value="Parkee">Parkee</option>
                  <option value="Lain-lain">Lain-lain</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-medium mb-1">Tindakan</label>
              <textarea
                name="tindakan"
                rows={2}
                placeholder="Tindakan awal..."
                value={formData.tindakan}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg bg-slate-50 dark:bg-slate-700 border-slate-300 dark:border-slate-600"
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Step yang dilakukan</label>
              <textarea
                name="step"
                rows={3}
                placeholder="Langkah-langkah perbaikan..."
                value={formData.step}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg bg-slate-50 dark:bg-slate-700 border-slate-300 dark:border-slate-600"
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Hasil</label>
              <input
                type="text"
                name="hasil"
                placeholder="Hasil akhir penanganan"
                value={formData.hasil}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg bg-slate-50 dark:bg-slate-700 border-slate-300 dark:border-slate-600"
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Asset yang digunakan</label>
              <input
                type="text"
                name="asset"
                placeholder="Daftar asset/komponen pengganti"
                value={formData.asset}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg bg-slate-50 dark:bg-slate-700 border-slate-300 dark:border-slate-600"
              />
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block font-medium mb-1">Nama IT Support (Parkee)</label>
                <input
                  type="text"
                  name="picParkee"
                  placeholder="Nama Terang"
                  value={formData.picParkee}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg bg-slate-50 dark:bg-slate-700 border-slate-300 dark:border-slate-600"
                />
              </div>
              
              {/* Dropdown Pilihan Jabatan Partner */}
              <div>
                <label className="block font-medium mb-1">Jabatan Partner</label>
                <select
                  name="jabatanCp"
                  value={formData.jabatanCp}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg bg-slate-50 dark:bg-slate-700 border-slate-300 dark:border-slate-600"
                >
                  {listJabatan.map((j) => (
                    <option key={j} value={j}>{j}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Input Nama Terang Partner (Manual) */}
            <div>
              <label className="block font-medium mb-1">Nama Terang Partner / Manager</label>
              <input
                type="text"
                name="picCp"
                placeholder="Masukkan Nama Terang"
                value={formData.picCp}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg bg-slate-50 dark:bg-slate-700 border-slate-300 dark:border-slate-600"
              />
            </div>
          </div>
        </div>

        {/* Right Side: Document Preview / Print Area */}
        <div className="w-full md:w-7/12 p-6 overflow-y-auto bg-slate-200 dark:bg-slate-900 flex justify-center print:w-full print:p-0 print:bg-white">
          <div className="bg-white text-slate-900 px-12 pt-6 pb-8 shadow-xl border rounded-sm w-full max-w-[210mm] text-sm font-sans flex flex-col justify-between print:shadow-none print:border-none print:p-0">
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