"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function BAStandbyEditor() {
  const [formData, setFormData] = useState({
    tanggal: "",
    lokasi: "",
    kehadiran: "",
    jamMulai: "",
    jamSelesai: "",
    issue: "Non Sistem",
    tujuanKunjungan: "Parkee",
    tindakan: "",
    stepDilakukan: "",
    hasil: "",
    assetDigunakan: "",
    picParkee1: "",
    picParkee2: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
          <h1 className="text-lg font-bold">Editor Berita Acara Standby Weekend</h1>
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
          <h2 className="text-xl font-bold text-indigo-600">Form Input BA Standby</h2>

          <div className="space-y-3 text-sm">
            <div>
              <label className="block font-medium mb-1">Tanggal</label>
              <input type="text" name="tanggal" placeholder="Cth: Sabtu, 15 Agustus 2026" value={formData.tanggal} onChange={handleChange} className="w-full p-2 border rounded bg-slate-50 dark:bg-slate-700" />
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

            <div>
              <label className="block font-medium mb-1">Hasil</label>
              <input type="text" name="hasil" placeholder="Hasil pengerjaan..." value={formData.hasil} onChange={handleChange} className="w-full p-2 border rounded bg-slate-50 dark:bg-slate-700" />
            </div>

            <div>
              <label className="block font-medium mb-1">Asset Yang Digunakan</label>
              <input type="text" name="assetDigunakan" placeholder="Nama/Detail asset..." value={formData.assetDigunakan} onChange={handleChange} className="w-full p-2 border rounded bg-slate-50 dark:bg-slate-700" />
            </div>
          </div>

          <div className="border-t pt-4 grid grid-cols-2 gap-4 text-sm">
            <div>
              <label className="block font-medium mb-1">Nama Tanda Tangan Kiri</label>
              <input type="text" value={formData.picParkee1} onChange={(e) => setFormData({ ...formData, picParkee1: e.target.value })} className="w-full p-2 border rounded bg-slate-50 dark:bg-slate-700" />
            </div>
            <div>
              <label className="block font-medium mb-1">Nama Tanda Tangan Kanan</label>
              <input type="text" value={formData.picParkee2} onChange={(e) => setFormData({ ...formData, picParkee2: e.target.value })} className="w-full p-2 border rounded bg-slate-50 dark:bg-slate-700" />
            </div>
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
                    {/* Judul Berita Acara Standby Weekend */}
                    <h1 className="text-center text-xs font-bold tracking-wide mb-4 text-black uppercase pb-1">
                      Berita Acara Standby Weekend
                    </h1>

                    {/* Metadata Header */}
                    <div className="space-y-1.5 mb-6 pl-1 mt-2">
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
                      <div className="flex">
                        <span className="w-36 font-semibold">Hasil</span>
                        <span className="w-3">:</span>
                        <span className="flex-1 font-semibold">{formData.hasil || "-"}</span>
                      </div>
                      <div className="flex">
                        <span className="w-36 font-semibold">Asset yang digunakan</span>
                        <span className="w-3">:</span>
                        <span className="flex-1">{formData.assetDigunakan || "-"}</span>
                      </div>
                    </div>

                    {/* Bottom Signatures (Kiri: IT Support, Kanan: Lead IT Support) */}
                    <div className="mt-16 pt-4">
                      <div className="flex justify-between items-end px-4 text-xs">
                        <div className="text-left space-y-12">
                          <p className="font-bold">PT Inovasi Anak Indonesia</p>
                          <div>
                            <p className="font-bold underline">{formData.picParkee1 || " "}</p>
                            <p className="font-semibold text-slate-700">IT Support</p>
                          </div>
                        </div>

                        <div className="text-left space-y-12">
                          <p className="font-bold">PT Inovasi Anak Indonesia</p>
                          <div>
                            <p className="font-bold underline">{formData.picParkee2 || " "}</p>
                            <p className="font-semibold text-slate-700">Lead IT Support</p>
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