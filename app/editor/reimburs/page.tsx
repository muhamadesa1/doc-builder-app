"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function ReimbursEditor() {
  const [formData, setFormData] = useState({
    nama: "Muhamad Esa",
    jabatan: "Staff IT Support",
    noRek: "1330026756569 A.N Muhamad Esa",
    periode: "Juni 2026",
    items: [
      { no: 1, tanggal: "", kategori: "", kegiatan: "", mulai: "", selesai: "", dari: "", ke: "", zona: "", total: "" },
    ],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleItemChange = (index: number, field: string, value: string) => {
    const newItems = [...formData.items];
    (newItems[index] as any)[field] = value;
    setFormData({ ...formData, items: newItems });
  };

  const addItem = () => {
    setFormData({
      ...formData,
      items: [
        ...formData.items,
        {
          no: formData.items.length + 1,
          tanggal: "",
          kategori: "",
          kegiatan: "",
          mulai: "",
          selesai: "",
          dari: "",
          ke: "",
          zona: "",
          total: "",
        },
      ],
    });
  };

  const removeItem = (index: number) => {
    const newItems = formData.items.filter((_, i) => i !== index);
    // Re-index nomor urut
    const reindexed = newItems.map((item, idx) => ({ ...item, no: idx + 1 }));
    setFormData({ ...formData, items: reindexed });
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 p-6 text-slate-800 dark:text-slate-100">
      {/* Top Navigation / Actions */}
      <header className="max-w-[210mm] mx-auto flex justify-between items-center mb-6 print:hidden">
        <Link href="/" className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline">
          ← Kembali ke Pilihan
        </Link>
        <button
          onClick={() => window.print()}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg font-medium shadow transition-all"
        >
          Cetak / Simpan PDF
        </button>
      </header>

      {/* Document Sheet (A4 size look) */}
      <div className="max-w-[210mm] mx-auto bg-white dark:bg-slate-800 p-10 shadow-xl rounded-xl min-h-[297mm]">
        <h1 className="text-center font-bold text-xl uppercase mb-8 tracking-wider">
          Berita Acara Analisa Reimburs
        </h1>

        {/* Header Section (Rata Kiri) */}
        <div className="mb-8 text-sm space-y-2.5 max-w-lg">
          <div className="flex items-center">
            <span className="w-28 font-medium">Nama</span>
            <span className="w-4 text-center">:</span>
            <span className="flex-1">
              <input
                name="nama"
                value={formData.nama}
                onChange={handleChange}
                className="border-b border-slate-300 dark:border-slate-600 w-full bg-transparent px-1 py-0.5 focus:outline-none focus:border-indigo-600"
              />
            </span>
          </div>
          <div className="flex items-center">
            <span className="w-28 font-medium">Jabatan</span>
            <span className="w-4 text-center">:</span>
            <span className="flex-1">
              <input
                name="jabatan"
                value={formData.jabatan}
                onChange={handleChange}
                className="border-b border-slate-300 dark:border-slate-600 w-full bg-transparent px-1 py-0.5 focus:outline-none focus:border-indigo-600"
              />
            </span>
          </div>
          <div className="flex items-center">
            <span className="w-28 font-medium">No Rek</span>
            <span className="w-4 text-center">:</span>
            <span className="flex-1">
              <input
                name="noRek"
                value={formData.noRek}
                onChange={handleChange}
                className="border-b border-slate-300 dark:border-slate-600 w-full bg-transparent px-1 py-0.5 focus:outline-none focus:border-indigo-600"
              />
            </span>
          </div>
          <div className="flex items-center">
            <span className="w-28 font-medium">Periode</span>
            <span className="w-4 text-center">:</span>
            <span className="flex-1">
              <input
                name="periode"
                value={formData.periode}
                onChange={handleChange}
                className="border-b border-slate-300 dark:border-slate-600 w-full bg-transparent px-1 py-0.5 focus:outline-none focus:border-indigo-600"
              />
            </span>
          </div>
        </div>

        {/* Table Section */}
        <div className="overflow-x-auto mb-6">
          <table className="w-full border-collapse border border-slate-300 dark:border-slate-700 text-[10px]">
            <thead>
              <tr className="bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200">
                <th className="border border-slate-300 dark:border-slate-600 p-1.5 w-10">No.</th>
                <th className="border border-slate-300 dark:border-slate-600 p-1.5">Tanggal</th>
                <th className="border border-slate-300 dark:border-slate-600 p-1.5">Kategori</th>
                <th className="border border-slate-300 dark:border-slate-600 p-1.5">Kegiatan</th>
                <th className="border border-slate-300 dark:border-slate-600 p-1.5">Jam Mulai</th>
                <th className="border border-slate-300 dark:border-slate-600 p-1.5">Jam Selesai</th>
                <th className="border border-slate-300 dark:border-slate-600 p-1.5">Dari Lokasi</th>
                <th className="border border-slate-300 dark:border-slate-600 p-1.5">Ke Lokasi</th>
                <th className="border border-slate-300 dark:border-slate-600 p-1.5">Zona</th>
                <th className="border border-slate-300 dark:border-slate-600 p-1.5">Take Homepay</th>
                <th className="border border-slate-300 dark:border-slate-600 p-1.5 w-12 print:hidden">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {formData.items.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-700/40">
                  <td className="border border-slate-300 dark:border-slate-600 p-1 text-center">{item.no}</td>
                  <td className="border border-slate-300 dark:border-slate-600 p-1">
                    <input
                      value={item.tanggal}
                      onChange={(e) => handleItemChange(idx, "tanggal", e.target.value)}
                      className="w-full bg-transparent focus:outline-none"
                      placeholder="DD/MM"
                    />
                  </td>
                  <td className="border border-slate-300 dark:border-slate-600 p-1">
                    <input
                      value={item.kategori}
                      onChange={(e) => handleItemChange(idx, "kategori", e.target.value)}
                      className="w-full bg-transparent focus:outline-none"
                    />
                  </td>
                  <td className="border border-slate-300 dark:border-slate-600 p-1">
                    <input
                      value={item.kegiatan}
                      onChange={(e) => handleItemChange(idx, "kegiatan", e.target.value)}
                      className="w-full bg-transparent focus:outline-none"
                    />
                  </td>
                  <td className="border border-slate-300 dark:border-slate-600 p-1">
                    <input
                      value={item.mulai}
                      onChange={(e) => handleItemChange(idx, "mulai", e.target.value)}
                      className="w-full bg-transparent focus:outline-none text-center"
                      placeholder="00:00"
                    />
                  </td>
                  <td className="border border-slate-300 dark:border-slate-600 p-1">
                    <input
                      value={item.selesai}
                      onChange={(e) => handleItemChange(idx, "selesai", e.target.value)}
                      className="w-full bg-transparent focus:outline-none text-center"
                      placeholder="00:00"
                    />
                  </td>
                  <td className="border border-slate-300 dark:border-slate-600 p-1">
                    <input
                      value={item.dari}
                      onChange={(e) => handleItemChange(idx, "dari", e.target.value)}
                      className="w-full bg-transparent focus:outline-none"
                    />
                  </td>
                  <td className="border border-slate-300 dark:border-slate-600 p-1">
                    <input
                      value={item.ke}
                      onChange={(e) => handleItemChange(idx, "ke", e.target.value)}
                      className="w-full bg-transparent focus:outline-none"
                    />
                  </td>
                  <td className="border border-slate-300 dark:border-slate-600 p-1">
                    <input
                      value={item.zona}
                      onChange={(e) => handleItemChange(idx, "zona", e.target.value)}
                      className="w-full bg-transparent focus:outline-none text-center"
                    />
                  </td>
                  <td className="border border-slate-300 dark:border-slate-600 p-1">
                    <input
                      value={item.total}
                      onChange={(e) => handleItemChange(idx, "total", e.target.value)}
                      className="w-full bg-transparent focus:outline-none text-right font-medium"
                      placeholder="Rp 0"
                    />
                  </td>
                  <td className="border border-slate-300 dark:border-slate-600 p-1 text-center print:hidden">
                    <button
                      onClick={() => removeItem(idx)}
                      className="text-red-500 hover:text-red-700 font-bold px-1"
                      title="Hapus baris"
                    >
                      ×
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Action Tambah Baris */}
        <div className="print:hidden">
          <button
            onClick={addItem}
            className="bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 text-slate-800 dark:text-slate-200 px-4 py-1.5 rounded text-xs font-medium transition-colors"
          >
            + Tambah Baris
          </button>
        </div>
      </div>
    </div>
  );
}