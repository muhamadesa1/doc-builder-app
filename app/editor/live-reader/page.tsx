"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function MobileReaderEditor() {
  const [formData, setFormData] = useState({
    hari: "",
    tanggal: "",
    tahun: new Date().getFullYear().toString(),
    lokasi: "",
    kehadiran: "",
    jamMulai: "",
    jamSelesai: "",
    partnerCompany: "IPM", // Default IPM sesuai template

    unitTesting: {
      mobileReader: "Sesuai",
      charger: "Sesuai",
      kartuSam: "Sesuai",
    },

    // Serial Number Unit Mobile Reader (Bisa ditambah/kurang sesuai kebutuhan)
    serialNumbers: ["", "", "", "", ""],

    jumlahInstalasi: "",
    jumlahTitikAktif: "",

    notes: "",
    picParkee: "",
    picCp: "",
  });

  const partnerConfig: Record<string, { fullName: string; code: string }> = {
    IPM: { fullName: "PT. Inovasi Parkir Mandiri", code: "IPM" },
    CP: { fullName: "PT. Centrepark Citra Corpora", code: "CP" },
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

  const currentPartner = partnerConfig[formData.partnerCompany] || partnerConfig.IPM;

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

  const handleSnChange = (index: number, value: string) => {
    const updatedSn = [...formData.serialNumbers];
    updatedSn[index] = value;
    setFormData({ ...formData, serialNumbers: updatedSn });
  };

  const addSnField = () => {
    setFormData({ ...formData, serialNumbers: [...formData.serialNumbers, ""] });
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-100 flex flex-col">
      <style jsx global>{`
        @media print {
          @page {
            size: A4;
            margin: 15mm;
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
          <h1 className="text-lg font-bold">Editor Berita Acara Mobile Reader</h1>
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
          <h2 className="text-xl font-bold text-indigo-600">Form Input Mobile Reader</h2>

          {/* Perusahaan Partner */}
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
              <option value="IPM">PT. Inovasi Parkir Mandiri (IPM)</option>
              <option value="CP">PT. Centrepark Citra Corpora (CP)</option>
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

          {/* General Metadata */}
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
              <label className="block font-medium mb-1">Lokasi</label>
              <input type="text" name="lokasi" placeholder="Nama Lokasi" value={formData.lokasi} onChange={handleChange} className="w-full p-2 border rounded bg-slate-50 dark:bg-slate-700" />
            </div>

            <div>
              <label className="block font-medium mb-1">Kehadiran (Personil)</label>
              <input type="text" name="kehadiran" placeholder="Nama Personil" value={formData.kehadiran} onChange={handleChange} className="w-full p-2 border rounded bg-slate-50 dark:bg-slate-700" />
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
          </div>

          {/* Unit Testing */}
          <div className="border-t pt-4 space-y-3">
            <h3 className="font-bold text-sm text-slate-700 dark:text-slate-200">Status Unit Testing</h3>
            <div className="grid grid-cols-1 gap-2 text-sm">
              <div>
                <label className="block text-xs font-medium mb-1">Pengujian Mobile Reader Parkee</label>
                <select value={formData.unitTesting.mobileReader} onChange={(e) => handleNestedChange("unitTesting", "mobileReader", e.target.value)} className="w-full p-1.5 border rounded bg-slate-50 dark:bg-slate-700 text-xs">
                  <option value="Sesuai">Sesuai</option>
                  <option value="Tidak Sesuai">Tidak Sesuai</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium mb-1">Pengujian Charger</label>
                <select value={formData.unitTesting.charger} onChange={(e) => handleNestedChange("unitTesting", "charger", e.target.value)} className="w-full p-1.5 border rounded bg-slate-50 dark:bg-slate-700 text-xs">
                  <option value="Sesuai">Sesuai</option>
                  <option value="Tidak Sesuai">Tidak Sesuai</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium mb-1">Pengujian Kartu SAM (CP)</label>
                <select value={formData.unitTesting.kartuSam} onChange={(e) => handleNestedChange("unitTesting", "kartuSam", e.target.value)} className="w-full p-1.5 border rounded bg-slate-50 dark:bg-slate-700 text-xs">
                  <option value="Sesuai">Sesuai</option>
                  <option value="Tidak Sesuai">Tidak Sesuai</option>
                </select>
              </div>
            </div>
          </div>

          {/* Serial Number Unit */}
          <div className="border-t pt-4 space-y-3">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-sm text-slate-700 dark:text-slate-200">Serial Number Unit</h3>
              <button type="button" onClick={addSnField} className="px-2 py-1 bg-indigo-500 text-white rounded text-xs">
                + Tambah SN
              </button>
            </div>
            <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
              {formData.serialNumbers.map((sn, idx) => (
                <div key={idx} className="flex gap-2 items-center text-xs">
                  <span className="w-6 font-medium">{idx + 1}.</span>
                  <input type="text" placeholder={`Serial Number ${idx + 1}`} value={sn} onChange={(e) => handleSnChange(idx, e.target.value)} className="flex-1 p-1.5 border rounded bg-slate-50 dark:bg-slate-700" />
                </div>
              ))}
            </div>
          </div>

          {/* Jumlah Instalasi & Titik Aktif */}
          <div className="border-t pt-4 space-y-3">
            <h3 className="font-bold text-sm text-slate-700 dark:text-slate-200">Rekapitulasi Unit</h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <label className="block text-xs font-medium mb-1">Jumlah Installasi</label>
                <input type="text" name="jumlahInstalasi" placeholder="Cth: 5 Unit" value={formData.jumlahInstalasi} onChange={handleChange} className="w-full p-2 border rounded bg-slate-50 dark:bg-slate-700 text-xs" />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1">Jumlah Titik Aktif</label>
                <input type="text" name="jumlahTitikAktif" placeholder="Cth: 5 Titik" value={formData.jumlahTitikAktif} onChange={handleChange} className="w-full p-2 border rounded bg-slate-50 dark:bg-slate-700 text-xs" />
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="border-t pt-4 space-y-2">
            <label className="block font-medium text-sm">Notes / Catatan</label>
            <textarea name="notes" rows={2} placeholder="Catatan tambahan..." value={formData.notes} onChange={handleChange} className="w-full p-2 border rounded text-sm bg-slate-50 dark:bg-slate-700" />
          </div>

          {/* PIC Signatures */}
          <div className="border-t pt-4 grid grid-cols-2 gap-4 text-sm">
            <div>
              <label className="block font-medium mb-1">Nama IT Support (IAI)</label>
              <input type="text" value={formData.picParkee} onChange={(e) => setFormData({ ...formData, picParkee: e.target.value })} className="w-full p-2 border rounded bg-slate-50 dark:bg-slate-700" />
            </div>
            <div>
              <label className="block font-medium mb-1">Nama CPM ({currentPartner.code})</label>
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
                    <h1 className="text-center text-sm font-bold tracking-wide mb-1 text-black uppercase">
                      BERITA ACARA PENYELESAIAN PEKERJAAN & SERAH TERIMA BARANG
                    </h1>
                    <h2 className="text-center text-xs font-bold tracking-wide mb-4 text-black uppercase pb-1">
                      MOBILE READER PARKEE
                    </h2>

                    {/* Opening Paragraph */}
                    <p className="mb-3 text-justify leading-relaxed">
                      Pada hari <span className="font-semibold underline">{formData.hari || ".........."}</span>, tanggal <span className="font-semibold underline">{formData.tanggal || ".........."}</span> {formData.tahun}, telah dilakukan penyelesaian pekerjaan dan penyerahan barang untuk keperluan Installisasi (live) Mobile Reader Parkee dengan sistem PARKEE OS oleh PT Inovasi Anak Indonesia (“IAI”), dengan rincian sebagai berikut[cite: 3]:
                    </p>

                    {/* Details 1 - 5 */}
                    <div className="space-y-1.5 mb-3 pl-2">
                      <div className="flex">
                        <span className="w-44 font-semibold">1. Lokasi</span>
                        <span className="w-4">:</span>
                        <span className="flex-1 font-semibold">{formData.lokasi}</span>
                      </div>
                      <div className="flex">
                        <span className="w-44 font-semibold">2. Kehadiran</span>
                        <span className="w-4">:</span>
                        <span className="flex-1">{formData.kehadiran}</span>
                      </div>
                      <div className="flex">
                        <span className="w-44 font-semibold">3. Jam Mulai</span>
                        <span className="w-4">:</span>
                        <span className="flex-1">{formData.jamMulai ? `${formData.jamMulai} WIB` : ""}</span>
                      </div>
                      <div className="flex">
                        <span className="w-44 font-semibold">4. Jam Selesai</span>
                        <span className="w-4">:</span>
                        <span className="flex-1">{formData.jamSelesai ? `${formData.jamSelesai} WIB` : ""}</span>
                      </div>
                      <div className="flex">
                        <span className="w-44 font-semibold">5. Aset yang diserahterimakan (“Hardware”)</span>
                        <span className="w-4">:</span>
                        <span className="flex-1">Aset tambahan yang disediakan oleh IAI (masih akan dibayarkan kepada IAI), terlampir pada Delivery Slip[cite: 3].</span>
                      </div>
                    </div>

                    {/* Detail 6: Unit Testing */}
                    <div className="mb-3">
                      <p className="font-semibold mb-1">6. Unit Testing</p>
                      <table className="w-full border-collapse border border-black text-[10px]">
                        <thead>
                          <tr className="bg-slate-100">
                            <th className="border border-black px-2 py-0.5 text-left">Konfigurasi Yang Diperlukan</th>
                            <th className="border border-black px-2 py-0.5 text-center w-1/3">Hasil</th>
                            <th className="border border-black px-2 py-0.5 text-left w-1/3">Keterangan</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="border border-black px-2 py-0.5">Pengujian Mobile Reader Parkee</td>
                            <td className="border border-black px-2 py-0.5 text-center font-semibold">{formData.unitTesting.mobileReader}</td>
                            <td className="border border-black px-2 py-0.5"></td>
                          </tr>
                          <tr>
                            <td className="border border-black px-2 py-0.5">Pengujian Charger</td>
                            <td className="border border-black px-2 py-0.5 text-center font-semibold">{formData.unitTesting.charger}</td>
                            <td className="border border-black px-2 py-0.5"></td>
                          </tr>
                          <tr>
                            <td className="border border-black px-2 py-0.5">Pengujian Kartu SAM (CP)</td>
                            <td className="border border-black px-2 py-0.5 text-center font-semibold">{formData.unitTesting.kartuSam}</td>
                            <td className="border border-black px-2 py-0.5"></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    {/* Points 7 & 8 */}
                    <p className="mb-1 text-justify">
                      7. PT Inovasi Anak Indonesia telah melakukan dan menyelesaikan pekerjaan pemasangan Hardware dan pekerjaan instalasi lainnya untuk Mobile Reader Parkee[cite: 3].
                    </p>
                    <p className="mb-3 text-justify">
                      8. Hasil seluruh pekerjaan telah diperiksa oleh kedua pihak. Mobile Reader Parkee sudah berfungsi dengan baik dan sesuai dengan peruntukannya[cite: 3].
                    </p>

                    {/* Serial Number Unit */}
                    <div className="mb-3">
                      <p className="font-semibold mb-1">Serial Number Unit :</p>
                      <ol className="list-decimal pl-5 space-y-0.5">
                        {formData.serialNumbers.map((sn, idx) => (
                          <li key={idx} className="font-mono">{sn || "........................................................"}</li>
                        ))}
                      </ol>
                    </div>

                    {/* Rekap Jumlah Installasi & Titik Aktif */}
                    <div className="grid grid-cols-2 gap-4 mb-3 border border-black p-2 text-center text-[10px]">
                      <div>
                        <p className="font-semibold uppercase text-slate-600">Jumlah Installasi Mobile Reader Parkee</p>
                        <p className="text-xs font-bold mt-1">{formData.jumlahInstalasi || "-"}</p>
                      </div>
                      <div>
                        <p className="font-semibold uppercase text-slate-600">Jumlah Titik Aktif Mobile Reader Parkee</p>
                        <p className="text-xs font-bold mt-1">{formData.jumlahTitikAktif || "-"}</p>
                      </div>
                    </div>

                    {/* Pernyataan */}
                    <div className="mb-4 text-[10px] leading-relaxed">
                      <p className="font-semibold mb-1">Pernyataan:</p>
                      <ol className="list-decimal pl-4 space-y-0.5">
                        <li>Pekerjaan dilakukan oleh PT Inovasi Anak Indonesia di bawah pengawasan personil {currentPartner.fullName}[cite: 3].</li>
                        <li>Kondisi objek pekerjaan pada saat sebelum dan sesudah PT Inovasi Anak Indonesia (Parkee) melakukan Installisasi Mobile Reader Parkee, dibuktikan melalui foto yang diambil oleh personil PT Inovasi Anak Indonesia[cite: 3].</li>
                        <li>Tim {currentPartner.fullName} wajib memberikan informasi kepada PT Inovasi Anak Indonesia apabila terdapat perubahan pada jumlah titik aktif Mobile Reader. Jika tim {currentPartner.fullName} tidak memberikan informasi perubahan jumlah titik aktif Mobile Reader, maka PT Inovasi Anak Indonesia akan melakukan penagihan atas sejumlah titik aktif Mobile Reader Parkee sebagaimana yang tertera diatas[cite: 3].</li>
                      </ol>
                    </div>

                    {/* Notes Section */}
                    {formData.notes && (
                      <div className="mb-4 border border-black p-2 text-[10px]">
                        <span className="font-semibold">Notes:</span>
                        <p className="whitespace-pre-wrap mt-1">{formData.notes}</p>
                      </div>
                    )}

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
                            <p className="font-semibold text-slate-700">CPM</p>
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