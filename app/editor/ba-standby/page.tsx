"use client";

import React, { useState } from "react";
import Link from "next/link";
import * as XLSX from "xlsx-js-style";

export default function ReimbursEditor() {
  const [formData, setFormData] = useState({
    nama: "",
    jabatan: "",
    noRek: "",
    periode: "",
    requestedBy: "",
    carParkManager: "", // Tambah state untuk manager
    items: [
      { no: 1, dd: "", mm: "", yy: "", kategori: "Survey", kegiatan: "", mulai: "", selesai: "", durasi: "", dari: "", ke: "", zona: "", total: "", makan: "", overtime: "" },
    ],
  });

  // List manager
  const listManagers = ["Arif Prasetyo Armadianto", "Budi Santoso", "Citra Lestari"];

  const calculateGrandTotal = () => {
    return formData.items.reduce((sum, item) => {
      const mainTotal = parseInt(item.total) || 0;
      const makan = parseInt(item.makan) || 0;
      const overtime = parseInt(item.overtime) || 0;
      return sum + mainTotal + makan + overtime;
    }, 0);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
    let startM = h1 * 60 + m1;
    let endM = h2 * 60 + m2;
    if (endM < startM) endM += 24 * 60;
    const diffM = endM - startM;
    return `${Math.floor(diffM / 60)}j ${diffM % 60 > 0 ? (diffM % 60) + "m" : ""}`.trim();
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
      ["Nama", ":", formData.nama, "", "", "", "", "", "", "", "", "", ""],
      ["Jabatan", ":", formData.jabatan, "", "", "", "", "", "", "", "", "", ""],
      ["No Rek", ":", formData.noRek, "", "", "", "", "", "", "", "", "", ""],
      ["Periode", ":", formData.periode, "", "", "", "", "", "", "", "", "", ""],
      [], 
      ["No.", "Tanggal", "", "", "Kategori", "Kegiatan", "Waktu", "", "", "Dari Lokasi", "Ke Lokasi", "Zona", "Total Take Homepay"],
      ["", "DD", "MM", "YY", "", "", "Jam Mulai", "Jam Selesai", "Durasi", "", "", "", ""]
    ];

    let currentRow = 7;
    const startTable = 5;

    formData.items.forEach((item) => {
      rows.push([item.no.toString(), item.dd, item.mm, item.yy, item.kategori, item.kegiatan, item.mulai, item.selesai, item.durasi, item.dari, item.ke, item.zona, item.total]);
      currentRow++;
      if (item.kategori !== "Standby Weekend") {
        rows.push(["", "", "", "", "", "Makan", "", "", "", "", "", "", item.makan]);
        currentRow++;
        rows.push(["", "", "", "", "", "Overtime", "", "", "", "", "", "", item.overtime]);
        currentRow++;
      }
    });

    rows.push(["", "", "", "", "", "", "", "", "", "", "", "GRAND TOTAL", calculateGrandTotal().toString()]);
    const endTable = currentRow;
    currentRow++;

    rows.push([], [], []); 

    const ttdHeaderRow = rows.length;
    rows.push(["Requested By", "", "", "Reviewer", "", "", "Car Park Manager", "", "", "Finance", "", "", ""]);
    rows.push(["", "", "", "", "", "", "", "", "", "", "", "", ""]);
    rows.push(["", "", "", "", "", "", "", "", "", "", "", "", ""]); 
    rows.push([formData.requestedBy, "", "", "Nur Hakim", "", "", formData.carParkManager, "", "", "Tiffani Hendro", "", "", ""]);
    const ttdEndRow = rows.length - 1;

    const worksheet = XLSX.utils.aoa_to_sheet(rows);

    worksheet['!cols'] = [
      { wch: 5 }, { wch: 5 }, { wch: 5 }, { wch: 6 }, { wch: 18 }, { wch: 35 }, 
      { wch: 10 }, { wch: 10 }, { wch: 8 }, { wch: 15 }, { wch: 15 }, { wch: 6 }, { wch: 20 }
    ];

    const borderAll = {
      top: { style: "thin", color: { rgb: "000000" } },
      bottom: { style: "thin", color: { rgb: "000000" } },
      left: { style: "thin", color: { rgb: "000000" } },
      right: { style: "thin", color: { rgb: "000000" } }
    };

    const headerFill = { patternType: "solid", fgColor: { rgb: "D3D3D3" } };

    // Styling ... (Sama seperti sebelumnya)
    for (let R = startTable; R <= endTable; ++R) {
      for (let C = 0; C <= 12; ++C) {
        const cellRef = XLSX.utils.encode_cell({ r: R, c: C });
        if (!worksheet[cellRef]) worksheet[cellRef] = { t: 's', v: '' };
        const isHeader = R === 5 || R === 6;
        worksheet[cellRef].s = {
          border: borderAll, alignment: { vertical: "center", horizontal: "center" },
          font: { name: "Calibri", sz: 10, bold: isHeader }, fill: isHeader ? headerFill : undefined
        };
      }
    }

    for (let R = ttdHeaderRow; R <= ttdEndRow; ++R) {
      for (let C = 0; C <= 12; ++C) {
        const cellRef = XLSX.utils.encode_cell({ r: R, c: C });
        if (!worksheet[cellRef]) worksheet[cellRef] = { t: 's', v: '' };
        const isTtdHeader = R === ttdHeaderRow;
        worksheet[cellRef].s = {
          border: borderAll, alignment: { vertical: "center", horizontal: "center" },
          font: { name: "Calibri", sz: 10, bold: isTtdHeader }, fill: isTtdHeader ? headerFill : undefined
        };
      }
    }

    worksheet["!merges"] = [
      { s: { r: 5, c: 1 }, e: { r: 5, c: 3 } }, { s: { r: 5, c: 6 }, e: { r: 5, c: 8 } },
      { s: { r: 5, c: 0 }, e: { r: 6, c: 0 } }, { s: { r: 5, c: 4 }, e: { r: 6, c: 4 } },
      { s: { r: 5, c: 5 }, e: { r: 6, c: 5 } }, { s: { r: 5, c: 9 }, e: { r: 6, c: 9 } },
      { s: { r: 5, c: 10 }, e: { r: 6, c: 10 } }, { s: { r: 5, c: 11 }, e: { r: 6, c: 11 } },
      { s: { r: 5, c: 12 }, e: { r: 6, c: 12 } },
      { s: { r: ttdHeaderRow, c: 0 }, e: { r: ttdHeaderRow, c: 2 } }, { s: { r: ttdHeaderRow + 1, c: 0 }, e: { r: ttdHeaderRow + 2, c: 2 } },
      { s: { r: ttdHeaderRow + 3, c: 0 }, e: { r: ttdHeaderRow + 3, c: 2 } },
      { s: { r: ttdHeaderRow, c: 3 }, e: { r: ttdHeaderRow, c: 5 } }, { s: { r: ttdHeaderRow + 1, c: 3 }, e: { r: ttdHeaderRow + 2, c: 5 } },
      { s: { r: ttdHeaderRow + 3, c: 3 }, e: { r: ttdHeaderRow + 3, c: 5 } },
      { s: { r: ttdHeaderRow, c: 6 }, e: { r: ttdHeaderRow, c: 8 } }, { s: { r: ttdHeaderRow + 1, c: 6 }, e: { r: ttdHeaderRow + 2, c: 8 } },
      { s: { r: ttdHeaderRow + 3, c: 6 }, e: { r: ttdHeaderRow + 3, c: 8 } },
      { s: { r: ttdHeaderRow, c: 9 }, e: { r: ttdHeaderRow, c: 12 } }, { s: { r: ttdHeaderRow + 1, c: 9 }, e: { r: ttdHeaderRow + 2, c: 12 } },
      { s: { r: ttdHeaderRow + 3, c: 9 }, e: { r: ttdHeaderRow + 3, c: 12 } },
    ];

    if (!worksheet['!views']) worksheet['!views'] = [];
    worksheet['!views'].push({ showGridLines: true });
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Reimburse");
    XLSX.writeFile(workbook, `Reimburse_${formData.nama || "Custom"}.xlsx`);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      const workbook = XLSX.read(evt.target?.result, { type: "binary" });
      const data = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]], { header: 1 }) as any[][];
      setFormData((prev) => ({ ...prev, nama: data[0]?.[2] || "", jabatan: data[1]?.[2] || "", noRek: data[2]?.[2] || "", periode: data[3]?.[2] || "" }));
    };
    reader.readAsBinaryString(file);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 text-[10px] text-slate-800">
      <header className="max-w-[210mm] mx-auto flex justify-between items-center mb-2 print:hidden gap-1">
        <Link href="/" className="text-indigo-600 font-bold text-xs">← Kembali</Link>
        <div className="flex gap-1 items-center">
          <label htmlFor="fileUploadInput" className="bg-emerald-600 text-white px-2 py-1 rounded text-[9px] cursor-pointer shadow">📂 Upload</label>
          <input id="fileUploadInput" type="file" accept=".xlsx, .xls" onChange={handleFileUpload} className="hidden" />
          <button onClick={handleExportExcel} className="bg-green-600 text-white px-2 py-1 rounded text-[9px] shadow">📊 Export</button>
          <button onClick={() => window.print()} className="bg-indigo-600 text-white px-2 py-1 rounded text-[9px] shadow">🖨️ Cetak</button>
        </div>
      </header>

      <div className="max-w-[210mm] mx-auto bg-white p-6 shadow-sm rounded-lg">
        {/* ... (Tabel Utama tetap sama) ... */}
        
        {/* Tanda Tangan dengan Dropdown Manager */}
        <div>
          <table className="w-full border-collapse border border-slate-300 text-center text-[9px]">
            <thead>
              <tr className="bg-slate-100 font-semibold">
                <th className="border p-1">Requested By</th>
                <th className="border p-1">Reviewer</th>
                <th className="border p-1">Car Park Manager</th>
                <th className="border p-1">Finance</th>
              </tr>
            </thead>
            <tbody>
              <tr className="h-10">
                <td className="border p-1"></td>
                <td className="border p-1"></td>
                <td className="border p-1"></td>
                <td className="border p-1"></td>
              </tr>
              <tr className="font-semibold bg-slate-50">
                <td className="border p-1"><input name="requestedBy" value={formData.requestedBy} onChange={handleChange} className="w-full bg-transparent text-center focus:outline-none" /></td>
                <td className="border p-1">Nur Hakim</td>
                <td className="border p-1">
                  <select name="carParkManager" value={formData.carParkManager} onChange={handleChange} className="w-full bg-transparent text-center focus:outline-none">
                    <option value="">Pilih Manager</option>
                    {listManagers.map(m => <option key={m} value={m}>{m}</option>)}
                  </select>
                </td>
                <td className="border p-1">Tiffani Hendro</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}