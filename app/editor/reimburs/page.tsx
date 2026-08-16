"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function ReimbursEditor() {
  const [formData, setFormData] = useState({
    nama: "",
    jabatan: "",
    noRek: "",
    periode: "",
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
      items: [...formData.items, { no: formData.items.length + 1, tanggal: "", kategori: "", kegiatan: "", mulai: "", selesai: "", dari: "", ke: "", zona: "", total: "" }],
    });
  };

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <header className="flex justify-between items-center mb-6 print:hidden">
        <Link href="/" className="text-indigo-600 font-bold">← Kembali</Link>
        <button onClick={() => window.print()} className="bg-indigo-600 text-white px-4 py-2 rounded-lg">Cetak PDF</button>
      </header>

      <div className="max-w-[210mm] mx-auto bg-white p-10 shadow-lg min-h-[297mm]">
        <h1 className="text-center font-bold text-xl uppercase mb-6">Berita Acara Analisa Reimburs</h1>
        
        {/* Header Section */}
        <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
          <div className="space-y-2">
            <p>Nama : <input name="nama" value={formData.nama} onChange={handleChange} className="border-b w-full" /></p>
            <p>Jabatan : <input name="jabatan" value={formData.jabatan} onChange={handleChange} className="border-b w-full" /></p>
          </div>
          <div className="space-y-2">
            <p>No Rek : <input name="noRek" value={formData.noRek} onChange={handleChange} className="border-b w-full" /></p>
            <p>Periode : <input name="periode" value={formData.periode} onChange={handleChange} className="border-b w-full" /></p>
          </div>
        </div>

        {/* Table Section */}
        <table className="w-full border-collapse border text-[9px] mb-4">
          <thead>
            <tr className="bg-slate-100">
              <th className="border p-1">No</th>
              <th className="border p-1">Tanggal</th>
              <th className="border p-1">Kategori</th>
              <th className="border p-1">Kegiatan</th>
              <th className="border p-1">Jam Mulai</th>
              <th className="border p-1">Jam Selesai</th>
              <th className="border p-1">Dari Lokasi</th>
              <th className="border p-1">Ke Lokasi</th>
              <th className="border p-1">Zona</th>
              <th className="border p-1">Take Homepay</th>
            </tr>
          </thead>
          <tbody>
            {formData.items.map((item, idx) => (
              <tr key={idx}>
                <td className="border p-1 text-center">{item.no}</td>
                <td className="border p-1"><input value={item.tanggal} onChange={(e) => handleItemChange(idx, 'tanggal', e.target.value)} className="w-full" /></td>
                <td className="border p-1"><input value={item.kategori} onChange={(e) => handleItemChange(idx, 'kategori', e.target.value)} className="w-full" /></td>
                <td className="border p-1"><input value={item.kegiatan} onChange={(e) => handleItemChange(idx, 'kegiatan', e.target.value)} className="w-full" /></td>
                <td className="border p-1"><input value={item.mulai} onChange={(e) => handleItemChange(idx, 'mulai', e.target.value)} className="w-full" /></td>
                <td className="border p-1"><input value={item.selesai} onChange={(e) => handleItemChange(idx, 'selesai', e.target.value)} className="w-full" /></td>
                <td className="border p-1"><input value={item.dari} onChange={(e) => handleItemChange(idx, 'dari', e.target.value)} className="w-full" /></td>
                <td className="border p-1"><input value={item.ke} onChange={(e) => handleItemChange(idx, 'ke', e.target.value)} className="w-full" /></td>
                <td className="border p-1"><input value={item.zona} onChange={(e) => handleItemChange(idx, 'zona', e.target.value)} className="w-full" /></td>
                <td className="border p-1"><input value={item.total} onChange={(e) => handleItemChange(idx, 'total', e.target.value)} className="w-full" /></td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={addItem} className="text-xs text-indigo-600 print:hidden">+ Tambah Baris</button>
      </div>
    </div>
  );
}