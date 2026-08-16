"use client";

import React, { useState } from "react";
import Link from "next/link";
import * as XLSX from "xlsx";

export default function ReimbursEditor() {
  const [formData, setFormData] = useState({
    nama: "",
    jabatan: "",
    noRek: "",
    periode: "",
    requestedBy: "",
    items: [
      { no: 1, dd: "", mm: "", yy: "", kategori: "Survey", kegiatan: "", mulai: "", selesai: "", durasi: "", dari: "", ke: "", zona: "", total: "", makan: "", overtime: "" },
    ],
  });

  const calculateGrandTotal = () => {
    return formData.items.reduce((sum, item) => {
      const mainTotal = parseInt(item.total) || 0;
      const makan = parseInt(item.makan) || 0;
      const overtime = parseInt(item.overtime) || 0;
      return sum + mainTotal + makan + overtime;
    }, 0);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const formatTimeInput = (val: string) => {
    let cleaned = val.replace(/\D/g, "");
    if (cleaned.length > 4) cleaned = cleaned.slice(0, 4);
    if (cleaned.length >= 3) return `${cleaned.slice(0, 2)}:${cleaned.slice(2)}`;
    return cleaned;
  };

  const calculateDuration = (mulai: string, selesai: string) => {
    if (!mulai || mulai.length < 5 || !selesai || selesai.length < 5) return "";
    const [h1, m1] = mulai.split(":").map(Number);
    const [h2, m2] = selesai.split(":").map(Number);
    const diffM = (h2 * 60 + m2) - (h1 * 60 + m1);
    return diffM >= 0 ? `${Math.floor(diffM / 60)}j ${diffM % 60 > 0 ? (diffM % 60) + "m" : ""}`.trim() : "Error";
  };

  const handleItemChange = (index: number, field: string, value: string) => {
    const newItems = [...formData.items];
    if (field === "mulai" || field === "selesai") value = formatTimeInput(value);
    (newItems[index] as any)[field] = value;
    if (field === "mulai" || field === "selesai") newItems[index].durasi = calculateDuration(newItems[index].mulai, newItems[index].selesai);
    if (field === "zona") newItems[index].total = (parseInt(value) * 15000 || 0).toString();
    setFormData({ ...formData, items: newItems });
  };

  const addItem = () => {
    setFormData({ ...formData, items: [...formData.items, { no: formData.items.length + 1, dd: "", mm: "", yy: "", kategori: "Survey", kegiatan: "", mulai: "", selesai: "", durasi: "", dari: "", ke: "", zona: "", total: "", makan: "", overtime: "" }] });
  };

  const removeItem = (index: number) => {
    const newItems = formData.items.filter((_, i) => i !== index).map((item, idx) => ({ ...item, no: idx + 1 }));
    setFormData({ ...formData, items: newItems });
  };

  const handleExportExcel = () => {
    const rows = [
      ["Nama", ":", formData.nama],
      ["Jabatan", ":", formData.jabatan],
      ["No Rek", ":", formData.noRek],
      ["Periode", ":", formData.periode],
      [], 
      ["No", "DD", "MM", "YY", "Kategori", "Kegiatan", "Mulai", "Selesai", "Durasi", "Dari", "Ke", "Zona", "Total"]
    ];

    formData.items.forEach((item) => {
      // Perbaikan: .toString() pada item.no dan perhitungan untuk menghindari error TS
      rows.push([item.no.toString(), item.dd, item.mm, item.yy, item.kategori, item.kegiatan, item.mulai, item.selesai, item.durasi, item.dari, item.ke, item.zona, item.total]);
      if (item.kategori !== "Standby Weekend") {
        rows.push(["", "", "", "", "", "Makan", "", "", "", "", "", "", item.makan]);
        rows.push(["", "", "", "", "", "Overtime", "", "", "", "", "", "", item.overtime]);
      }
    });

    rows.push(["", "", "", "", "", "", "", "", "", "", "", "GRAND TOTAL", calculateGrandTotal().toString()]);
    rows.push([], [], []); 

    rows.push(["Requested By", "", "", "Reviewer", "", "", "Reviewer", "", "", "Finance", "", "", ""]);
    rows.push(["", "", "", "", "", "", "", "", "", "", "", "", ""]);
    rows.push(["", "", "", "", "", "", "", "", "", "", "", "", ""]); 
    rows.push([formData.requestedBy, "", "", "Nur Hakim", "", "", "Arif Prasetyo Armadianto", "", "", "Tiffani Hendro", "", "", ""]);

    const worksheet = XLSX.utils.aoa_to_sheet(rows);
    
    // MEMUNCULKAN GARIS GRID EXCEL
    if (!worksheet['!views']) worksheet['!views'] = [];
    worksheet['!views'].push({ showGridLines: true });

    worksheet["!merges"] = [
      { s: { r: 10, c: 0 }, e: { r: 10, c: 2 } }, { s: { r: 10, c: 3 }, e: { r: 10, c: 5 } }, 
      { s: { r: 10, c: 6 }, e: { r: 10, c: 8 } }, { s: { r: 10, c: 9 }, e: { r: 10, c: 12 } },
      
      { s: { r: 11, c: 0 }, e: { r: 12, c: 2 } }, { s: { r: 11, c: 3 }, e: { r: 12, c: 5 } }, 
      { s: { r: 11, c: 6 }, e: { r: 12, c: 8 } }, { s: { r: 11, c: 9 }, e: { r: 12, c: 12 } },

      { s: { r: 13, c: 0 }, e: { r: 13, c: 2 } }, { s: { r: 13, c: 3 }, e: { r: 13, c: 5 } }, 
      { s: { r: 13, c: 6 }, e: { r: 13, c: 8 } }, { s: { r: 13, c: 9 }, e: { r: 13, c: 12 } }
    ];

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Reimburse");
    XLSX.writeFile(workbook, `Reimburse_${formData.nama || "Custom"}.xlsx`);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      const data = XLSX.utils.sheet_to_json(XLSX.read(evt.target?.result, { type: "binary" }).Sheets[XLSX.read(evt.target?.result, { type: "binary" }).SheetNames[0]]) as any[];
      const formattedItems = data.slice(6).filter(row => row["No"] !== undefined).map((row, index) => ({
        no: index + 1, dd: row["DD"]?.toString() || "", mm: row["MM"]?.toString() || "", yy: row["YY"]?.toString() || "", kategori: row["Kategori"] || "Survey", kegiatan: row["Kegiatan"] || "", mulai: row["Mulai"] || "", selesai: row["Selesai"] || "", durasi: row["Durasi"] || "", dari: row["Dari"] || "", ke: row["Ke"] || "", zona: row["Zona"]?.toString() || "", total: row["Total"]?.toString() || "", makan: "", overtime: "" 
      }));
      setFormData((prev) => ({ ...prev, items: formattedItems }));
    };
    reader.readAsBinaryString(file);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 text-[10px] text-slate-800">
      <header className="max-w-[210mm] mx-auto flex justify-between items-center mb-2 print:hidden gap-1">
        <Link href="/" className="text-indigo-600 font-bold text-xs">← Kembali</Link>
        <div className="flex gap-1 items-center">
          <label className="bg-emerald-600 text-white px-2 py-1 rounded text-[9px] cursor-pointer shadow">📂 Upload</label>
          <input type="file" onChange={handleFileUpload} className="hidden" />
          <button onClick={handleExportExcel} className="bg-green-600 text-white px-2 py-1 rounded text-[9px] shadow">📊 Export</button>
          <button onClick={() => window.print()} className="bg-indigo-600 text-white px-2 py-1 rounded text-[9px] shadow">🖨️ Cetak</button>
        </div>
      </header>

      <div className="max-w-[210mm] mx-auto bg-white p-6 shadow-sm rounded-lg">
        <div className="mb-4 space-y-0.5 max-w-sm">
          {["nama", "jabatan", "noRek", "periode"].map((f) => (
            <div key={f} className="flex items-center text-xs">
              <span className="w-20 font-bold capitalize">{f.replace("noRek", "No Rek")}</span>
              <span className="w-4">:</span>
              <input name={f} value={(formData as any)[f]} onChange={handleChange} className="border-b w-full bg-transparent focus:outline-none" />
            </div>
          ))}
        </div>

        <div className="mb-2">
          <table className="w-full border-collapse border border-slate-300 text-[9px]">
            <thead>
              <tr className="bg-slate-100 text-center"><th rowSpan={2} className="border p-0.5">No</th><th colSpan={3} className="border p-0.5">Tgl</th><th rowSpan={2} className="border p-0.5 w-20">Kategori</th><th rowSpan={2} className="border p-0.5">Kegiatan</th><th colSpan={3} className="border p-0.5">Waktu</th><th rowSpan={2} className="border p-0.5">Dari</th><th rowSpan={2} className="border p-0.5">Ke</th><th rowSpan={2} className="border p-0.5">Zona</th><th rowSpan={2} className="border p-0.5">Total</th><th rowSpan={2} className="border p-0.5 print:hidden">X</th></tr>
              <tr className="bg-slate-50 text-center"><th>DD</th><th>MM</th><th>YY</th><th>Mulai</th><th>Selesai</th><th>Durasi</th></tr>
            </thead>
            <tbody>
              {formData.items.map((item, idx) => (
                <React.Fragment key={idx}>
                  <tr className="hover:bg-slate-50">
                    <td className="border text-center">{item.no}</td>
                    {["dd", "mm", "yy"].map(f => <td key={f} className="border"><input value={(item as any)[f]} onChange={(e) => handleItemChange(idx, f, e.target.value)} className="w-full bg-transparent text-center focus:outline-none" /></td>)}
                    <td className="border"><select value={item.kategori} onChange={(e) => handleItemChange(idx, "kategori", e.target.value)} className="w-full bg-transparent">{["Survey", "Setup", "Migrasi", "Post Setup/Migrasi", "Troubleshooting", "Request Visit", "Standby Weekend", "Meeting"].map(opt => <option key={opt}>{opt}</option>)}</select></td>
                    <td className="border"><input value={item.kegiatan} onChange={(e) => handleItemChange(idx, "kegiatan", e.target.value)} className="w-full bg-transparent px-1" /></td>
                    {["mulai", "selesai"].map(f => <td key={f} className="border"><input value={(item as any)[f]} onChange={(e) => handleItemChange(idx, f, e.target.value)} className="w-full bg-transparent text-center" placeholder="00:00" /></td>)}
                    <td className="border text-center font-bold text-indigo-600">{item.durasi}</td>
                    {["dari", "ke"].map(f => <td key={f} className="border"><input value={(item as any)[f]} onChange={(e) => handleItemChange(idx, f, e.target.value)} className="w-full bg-transparent px-1" /></td>)}
                    <td className="border"><input value={item.zona} onChange={(e) => handleItemChange(idx, "zona", e.target.value)} className="w-full bg-transparent text-center" /></td>
                    <td className="border text-right px-1">Rp {parseInt(item.total || "0").toLocaleString()}</td>
                    <td className="border text-center print:hidden"><button onClick={() => removeItem(idx)} className="text-red-500 font-bold">×</button></td>
                  </tr>
                  {item.kategori !== "Standby Weekend" && (
                    <>
                      <tr className="bg-slate-50/50"><td className="border" colSpan={5}></td><td className="border italic text-[8px] text-slate-500 px-1">Makan</td><td className="border" colSpan={6}></td><td className="border"><input value={item.makan} onChange={(e) => handleItemChange(idx, "makan", e.target.value)} className="w-full bg-transparent text-right px-1" /></td><td className="border print:hidden"></td></tr>
                      <tr className="bg-slate-50/50"><td className="border" colSpan={5}></td><td className="border italic text-[8px] text-slate-500 px-1">Overtime</td><td className="border" colSpan={6}></td><td className="border"><input value={item.overtime} onChange={(e) => handleItemChange(idx, "overtime", e.target.value)} className="w-full bg-transparent text-right px-1" /></td><td className="border print:hidden"></td></tr>
                    </>
                  )}
                </React.Fragment>
              ))}
              <tr className="bg-slate-100 font-bold">
                <td className="border p-1 text-right" colSpan={12}>GRAND TOTAL</td>
                <td className="border p-1 text-right">Rp {calculateGrandTotal().toLocaleString()}</td>
                <td className="border print:hidden"></td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <button onClick={addItem} className="bg-indigo-50 border border-indigo-200 text-indigo-600 px-2 py-0.5 rounded text-[9px] font-bold print:hidden w-fit mb-4 mt-1">
          + Tambah Baris
        </button>

        <div>
          <table className="w-full border-collapse border border-slate-300 text-center text-[9px]">
            <thead><tr className="bg-slate-100 font-semibold"><th className="border p-1">Requested By</th><th className="border p-1">Reviewer</th><th className="border p-1">Reviewer</th><th className="border p-1">Finance</th></tr></thead>
            <tbody>
              <tr className="h-10"><td className="border p-1"></td><td className="border p-1"></td><td className="border p-1"></td><td className="border p-1"></td></tr>
              <tr className="font-semibold bg-slate-50">
                <td className="border p-1"><input name="requestedBy" value={formData.requestedBy} onChange={handleChange} className="w-full bg-transparent text-center focus:outline-none" /></td>
                <td className="border p-1">Nur Hakim</td><td className="border p-1">Arif Prasetyo Armadianto</td><td className="border p-1">Tiffani Hendro</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}