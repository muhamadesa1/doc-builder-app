"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function LiveEditor() {
  const [formData, setFormData] = useState({
    hari: "",
    tanggal: "",
    tahun: new Date().getFullYear().toString(), // Otomatis ngikutin tahun sekarang (2026)
    lokasi: "",
    dimigrasiOleh: "",
    jamMulai: "",
    jamSelesai: "",
    partnerCompany: "CP",
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
      { name: "Booster", qty: "", ket: "" },
      { name: "Interface", qty: "", ket: "" },
      { name: "Speaker", qty: "", ket: "" },
      { name: "Amplifier", qty: "", ket: "" },
      { name: "PC Server / PC Client / PC Admin", qty: "", ket: "" },
      { name: "HDD / SSD", qty: "", ket: "" },
      { name: "PCI-E Serial 2 / 4 Port", qty: "", ket: "" },
      { name: "Kabel Serial Printer", qty: "", ket: "" },
      { name: "RFI DE – ABCMI", qty: "", ket: "" },
      { name: "STI NFC pad / STI Lama", qty: "", ket: "" },
      { name: "Reader Promag", qty: "", ket: "" },
      { name: "Scanner Symbol / Honeywell", qty: "", ket: "" },
      { name: "Webcam / IP Cam", qty: "", ket: "" },
      { name: "Switch Hub", qty: "", ket: "" },
      { name: "Printer", qty: "", ket: "" },
    ],

    notes: "",
    picParkee: "",
    picCp: "",
  });

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

  const handleAsetChange = (index: number, field: "qty" | "ket", value: string) => {
    const updatedAset = [...formData.asetCp];
    updatedAset[index][field] = value;
    setFormData({ ...formData, asetCp: updatedAset });
  };

  const handleFiturChange = (index: number, value: string) => {
    const updatedFitur = [...formData.fitur];
    updatedFitur[index] = value;
    setFormData({ ...formData, fitur: updatedFitur });
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-100 flex flex-col">
      <style jsx global>{`
        @media print {
          @page {
            size: A4;
            margin: 15mm 15mm 15mm 15mm;
          }
          body {
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
      <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 px-6 py-3 flex items-center justify-between sticky top-0 z-10 print:hidden">
        <div className="flex items-center gap-4">
          <Link href="/" className="text-sm font-medium text-slate-500 hover:text-slate-800 dark:hover:text-slate-200">
            ← Kembali
          </Link>
          <h1 className="text-lg font-bold">Editor Berita Acara Live</h1>
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
        {/* Left Side: Form Input */}
        <div className="w-full md:w-5/12 p-6 overflow-y-auto border-r border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 print:hidden space-y-6">
          <h2 className="text-xl font-bold text-indigo-600">Form Input Data Live</h2>

          <div className="p-3 bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800 rounded-lg">
            <label className="block font-bold mb-1 text-indigo-700 dark:text-indigo-300 text-xs">
              Perusahaan Partner / Mitra
            </label>
            <select
              name="partnerCompany"
              value={formData.partnerCompany}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg bg-white dark:bg-slate-800 text-sm font-semibold"
            >
              <option value="CP">PT. Centrepark Citra Corpora (CP)</option>
              <option value="IPM">PT. Inovasi Parkir Mandiri (IPM)</option>
              <option value="UPP_DKI">Unit Pengelola Perparkiran Provinsi DKI Jakarta</option>
              <option value="ZENITH">PT Zenith Indonesia Solutions</option>
              <option value="TSP">PT Tiga Saudara Propertama</option>
              <option value="TMS">PT Tekno Mandiri Sejahtera</option>
              <option value="SML">PT Semai Maju Lestari</option>
              <option value="PATRA">PT Patra Jasa</option>
              <option value="BINA_WALUYA">PT Bina Waluya</option>
              <option value="BANGSAWAN">PT Bangsawan Cyberindo Indonesia</option>
              <option value="ADHI">PT Adhi Commuter Properti Tbk.</option>
              <option value="UPK">CV Utama Persada Karya</option>
              <option value="SMB">CV Selaras Multi Bisnis</option>
              <option value="AMANAH">PT Amanah Parking</option>
              <option value="NUGRAH">PT Nugrah Tanamal</option>
              <option value="BIJAK">PT Bijak</option>
              <option value="KRIJAYA">PT Krijaya Tika Mandiri</option>
            </select>
          </div>

          <div className="space-y-3 text-sm">
            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="block font-medium mb-1">Hari</label>
                <input type="text" name="hari" placeholder="Senin" value={formData.hari} onChange={handleChange} className="w-full p-2 border rounded bg-slate-50 dark:bg-slate-700" />
              </div>
              <div>
                <label className="block font-medium mb-1">Tanggal</label>
                <input type="text" name="tanggal" placeholder="15 Agustus" value={formData.tanggal} onChange={handleChange} className="w-full p-2 border rounded bg-slate-50 dark:bg-slate-700" />
              </div>
              <div>
                <label className="block font-medium mb-1">Tahun</label>
                <input type="text" name="tahun" value={formData.tahun} onChange={handleChange} className="w-full p-2 border rounded bg-slate-50 dark:bg-slate-700" />
              </div>
            </div>

            <div>
              <label className="block font-medium mb-1">Lokasi Parkir</label>
              <input type="text" name="lokasi" placeholder="Nama Lokasi" value={formData.lokasi} onChange={handleChange} className="w-full p-2 border rounded bg-slate-50 dark:bg-slate-700" />
            </div>

            <div>
              <label className="block font-medium mb-1">Dimigrasi Oleh</label>
              <input type="text" name="dimigrasiOleh" placeholder="Nama Personil IAI" value={formData.dimigrasiOleh} onChange={handleChange} className="w-full p-2 border rounded bg-slate-50 dark:bg-slate-700" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-medium mb-1">Jam Mulai</label>
                <input type="time" name="jamMulai" value={formData.jamMulai} onChange={handleChange} className="w-full p-2 border rounded bg-slate-50 dark:bg-slate-700" />
              </div>
              <div>
                <label className="block font-medium mb-1">Jam Selesai</label>
                <input type="time" name="jamSelesai" value={formData.jamSelesai} onChange={handleChange} className="w-full p-2 border rounded bg-slate-50 dark:bg-slate-700" />
              </div>
            </div>

            <div>
              <label className="block font-medium mb-1">Issue Sebelum Migrasi</label>
              <textarea name="issueSebelumMigrasi" rows={2} placeholder="Catatan issue sebelum migrasi..." value={formData.issueSebelumMigrasi} onChange={handleChange} className="w-full p-2 border rounded bg-slate-50 dark:bg-slate-700" />
            </div>
          </div>

          <div className="border-t pt-4 space-y-3">
            <h3 className="font-bold text-sm text-slate-700 dark:text-slate-200">Kondisi Harddisk Server</h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <input type="text" placeholder="Health (%)" value={formData.hddServer.health} onChange={(e) => handleNestedChange("hddServer", "health", e.target.value)} className="p-2 border rounded bg-slate-50 dark:bg-slate-700" />
              <input type="text" placeholder="Performance (%)" value={formData.hddServer.performance} onChange={(e) => handleNestedChange("hddServer", "performance", e.target.value)} className="p-2 border rounded bg-slate-50 dark:bg-slate-700" />
              <input type="text" placeholder="Est. Time (Days)" value={formData.hddServer.estTime} onChange={(e) => handleNestedChange("hddServer", "estTime", e.target.value)} className="p-2 border rounded bg-slate-50 dark:bg-slate-700" />
              <input type="text" placeholder="Bad Sector" value={formData.hddServer.badSector} onChange={(e) => handleNestedChange("hddServer", "badSector", e.target.value)} className="p-2 border rounded bg-slate-50 dark:bg-slate-700" />
            </div>
          </div>

          <div className="border-t pt-4 space-y-3">
            <h3 className="font-bold text-sm text-slate-700 dark:text-slate-200">Jumlah PC Yang Diinstall</h3>
            <div className="grid grid-cols-3 gap-2 text-sm">
              <input type="text" placeholder="Pintu Masuk" value={formData.pcInstalled.masuk} onChange={(e) => handleNestedChange("pcInstalled", "masuk", e.target.value)} className="p-2 border rounded bg-slate-50 dark:bg-slate-700" />
              <input type="text" placeholder="Pintu Keluar" value={formData.pcInstalled.keluar} onChange={(e) => handleNestedChange("pcInstalled", "keluar", e.target.value)} className="p-2 border rounded bg-slate-50 dark:bg-slate-700" />
              <input type="text" placeholder="Server/Admin" value={formData.pcInstalled.serverAdmin} onChange={(e) => handleNestedChange("pcInstalled", "serverAdmin", e.target.value)} className="p-2 border rounded bg-slate-50 dark:bg-slate-700" />
            </div>
            <input type="text" placeholder="Keterangan Gate Aktif" value={formData.pcInstalled.keterangan} onChange={(e) => handleNestedChange("pcInstalled", "keterangan", e.target.value)} className="w-full p-2 border rounded text-sm bg-slate-50 dark:bg-slate-700" />
          </div>

          <div className="border-t pt-4 space-y-3">
            <h3 className="font-bold text-sm text-slate-700 dark:text-slate-200">List Versi & Fitur</h3>
            <input type="text" placeholder="Versi (cth: v2.1.0)" value={formData.versi} onChange={(e) => setFormData({ ...formData, versi: e.target.value })} className="w-full p-2 border rounded text-sm bg-slate-50 dark:bg-slate-700 mb-2" />
            {formData.fitur.map((item, idx) => (
              <input key={idx} type="text" placeholder={`Fitur ${idx + 1}`} value={item} onChange={(e) => handleFiturChange(idx, e.target.value)} className="w-full p-2 border rounded text-sm bg-slate-50 dark:bg-slate-700 mb-1" />
            ))}
          </div>

          <div className="border-t pt-4 space-y-3">
            <h3 className="font-bold text-sm text-slate-700 dark:text-slate-200">Input Aset {currentPartner.code} Yang Digantikan</h3>
            <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
              {formData.asetCp.map((item, idx) => (
                <div key={idx} className="flex gap-2 items-center text-xs">
                  <span className="w-1/2 truncate font-medium">{item.name}</span>
                  <input type="text" placeholder="Qty" value={item.qty} onChange={(e) => handleAsetChange(idx, "qty", e.target.value)} className="w-16 p-1 border rounded bg-slate-50 dark:bg-slate-700" />
                  <input type="text" placeholder="Ket" value={item.ket} onChange={(e) => handleAsetChange(idx, "ket", e.target.value)} className="flex-1 p-1 border rounded bg-slate-50 dark:bg-slate-700" />
                </div>
              ))}
            </div>
          </div>

          <div className="border-t pt-4 grid grid-cols-2 gap-4 text-sm">
            <div>
              <label className="block font-medium mb-1">Nama IT Support (IAI)</label>
              <input type="text" value={formData.picParkee} onChange={(e) => setFormData({ ...formData, picParkee: e.target.value })} className="w-full p-2 border rounded bg-slate-50 dark:bg-slate-700" />
            </div>
            <div>
              <label className="block font-medium mb-1">Nama Car Park Manager</label>
              <input type="text" value={formData.picCp} onChange={(e) => setFormData({ ...formData, picCp: e.target.value })} className="w-full p-2 border rounded bg-slate-50 dark:bg-slate-700" />
            </div>
          </div>
        </div>

        {/* Right Side: Document Preview / Print Area */}
        <div className="w-full md:w-7/12 p-6 overflow-y-auto bg-slate-200 dark:bg-slate-900 flex justify-center print:w-full print:p-0 print:bg-white">
          <div className="bg-white text-slate-900 px-10 pt-6 pb-10 shadow-xl border rounded-sm w-full max-w-[210mm] text-[11px] leading-snug font-sans print:shadow-none print:border-none print:p-0">
            
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
                            <p className="font-semibold text-slate-700">Car Park Manager</p>
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