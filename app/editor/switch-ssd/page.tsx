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
    partnerCompany: "CP",
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
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-100 flex flex-col">
      <style jsx global>{`
        @media print {
          @page {
            size: A4;
            margin: 12mm;
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
          <h1 className="text-lg font-bold">Editor Berita Acara Pergantian Storage / PC Server</h1>
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
          <h2 className="text-xl font-bold text-indigo-600">Form Input Pergantian Storage/Server</h2>

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
              {Object.keys(partnerConfig).map((key) => (
                <option key={key} value={key}>{partnerConfig[key].fullName}</option>
              ))}
            </select>
          </div>

          <div className="space-y-3 text-sm">
            <div>
              <label className="block font-medium mb-1">Tanggal</label>
              <input type="text" name="tanggal" placeholder="Cth: Senin, 15 Agustus 2026" value={formData.tanggal} onChange={handleChange} className="w-full p-2 border rounded bg-slate-50 dark:bg-slate-700" />
            </div>

            <div>
              <label className="block font-medium mb-1">Lokasi</label>
              <input type="text" name="lokasi" placeholder="Nama Lokasi Parkir" value={formData.lokasi} onChange={handleChange} className="w-full p-2 border rounded bg-slate-50 dark:bg-slate-700" />
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

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-medium mb-1">Issue</label>
                <select name="issue" value={formData.issue} onChange={handleChange} className="w-full p-2 border rounded bg-slate-50 dark:bg-slate-700 font-semibold">
                  <option value="Non Sistem">Non Sistem = Rp.350.000,-</option>
                  <option value="Sistem">Sistem</option>
                </select>
              </div>
              <div>
                <label className="block font-medium mb-1">Tujuan Kunjungan</label>
                <select name="tujuanKunjungan" value={formData.tujuanKunjungan} onChange={handleChange} className="w-full p-2 border rounded bg-slate-50 dark:bg-slate-700 font-semibold">
                  <option value="Parkee">Parkee</option>
                  <option value="Lain-lain">Lain-lain</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-medium mb-1">Tindakan</label>
              <input type="text" name="tindakan" placeholder="Tindakan yang diberikan..." value={formData.tindakan} onChange={handleChange} className="w-full p-2 border rounded bg-slate-50 dark:bg-slate-700" />
            </div>

            <div>
              <label className="block font-medium mb-1">Step Yang Dilakukan</label>
              <textarea name="stepDilakukan" rows={2} placeholder="Langkah-langkah pengerjaan..." value={formData.stepDilakukan} onChange={handleChange} className="w-full p-2 border rounded bg-slate-50 dark:bg-slate-700" />
            </div>
          </div>

          <div className="border-t pt-4 space-y-3">
            <h3 className="font-bold text-sm text-slate-700 dark:text-slate-200">Konfigurasi Testing (1-18)</h3>
            <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
              {formData.testing.map((item, idx) => (
                <div key={idx} className="flex gap-2 items-center text-xs">
                  <span className="w-6 font-semibold">{item.no}.</span>
                  <input type="text" value={item.name} onChange={(e) => handleTestingNameChange(idx, e.target.value)} className="flex-1 p-1 border rounded bg-slate-50 dark:bg-slate-700 text-xs" />
                  <select value={item.status} onChange={(e) => handleTestingStatusChange(idx, e.target.value)} className="w-24 p-1 border rounded bg-slate-50 dark:bg-slate-700 text-xs font-semibold">
                    <option value="sesuai">Sesuai</option>
                    <option value="tidak sesuai">Tdk Sesuai</option>
                    <option value="tidak ada">Tdk Ada</option>
                  </select>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t pt-4 space-y-3">
            <div>
              <label className="block font-medium mb-1 text-sm">Hasil</label>
              <input type="text" name="hasil" placeholder="Hasil pengerjaan..." value={formData.hasil} onChange={handleChange} className="w-full p-2 border rounded bg-slate-50 dark:bg-slate-700 text-sm" />
            </div>
            <div>
              <label className="block font-medium mb-1 text-sm">Asset Yang Digunakan</label>
              <input type="text" name="assetDigunakan" placeholder="Nama/Detail asset..." value={formData.assetDigunakan} onChange={handleChange} className="w-full p-2 border rounded bg-slate-50 dark:bg-slate-700 text-sm" />
            </div>
            <div>
              <label className="block font-medium mb-1 text-sm">Notes Tambahan</label>
              <textarea name="notes" rows={2} placeholder="Catatan tambahan..." value={formData.notes} onChange={handleChange} className="w-full p-2 border rounded bg-slate-50 dark:bg-slate-700 text-sm" />
            </div>
          </div>

          <div className="border-t pt-4 grid grid-cols-2 gap-4 text-sm">
            <div>
              <label className="block font-medium mb-1">Nama IT Support (IAI)</label>
              <input type="text" value={formData.picParkee} onChange={(e) => setFormData({ ...formData, picParkee: e.target.value })} className="w-full p-2 border rounded bg-slate-50 dark:bg-slate-700" />
            </div>
            <div>
              <label className="block font-medium mb-1">Jabatan Partner</label>
              <select name="jabatanCp" value={formData.jabatanCp} onChange={handleChange} className="w-full p-2 border rounded bg-slate-50 dark:bg-slate-700">
                {listJabatan.map(j => <option key={j} value={j}>{j}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="block font-medium mb-1 text-sm">Nama Terang Partner</label>
            <input type="text" value={formData.picCp} onChange={(e) => setFormData({ ...formData, picCp: e.target.value })} className="w-full p-2 border rounded bg-slate-50 dark:bg-slate-700" />
          </div>
        </div>

        {/* Right Side: Document Preview / Print Area */}
        <div className="w-full md:w-7/12 p-6 overflow-y-auto bg-slate-200 dark:bg-slate-900 flex justify-center print:w-full print:p-0 print:bg-white">
          <div className="bg-white text-slate-900 px-10 pt-6 pb-10 shadow-xl border rounded-sm w-full max-w-[210mm] text-[10.5px] leading-tight font-sans print:shadow-none print:border-none print:p-0">
            
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
                          <span>[ {formData.issue === "Non Sistem" ? "✔" : " "} ] Non Sistem = Rp.350.000,-</span>
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