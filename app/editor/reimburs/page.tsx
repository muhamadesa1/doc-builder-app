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
    rows.push(["Requested By", "", "", "Reviewer", "", "", "Reviewer", "", "", "Finance", "", "", ""]);
    rows.push(["", "", "", "", "", "", "", "", "", "", "", "", ""]);
    rows.push(["", "", "", "", "", "", "", "", "", "", "", "", ""]); 
    rows.push([formData.requestedBy, "", "", "Nur Hakim", "", "", "Arif Prasetyo Armadianto", "", "", "Tiffani Hendro", "", "", ""]);
    const ttdEndRow = rows.length - 1;

    const worksheet = XLSX.utils.aoa_to_sheet(rows);

    const borderAll = {
      top: { style: "thin", color: { rgb: "000000" } },
      bottom: { style: "thin", color: { rgb: "000000" } },
      left: { style: "thin", color: { rgb: "000000" } },
      right: { style: "thin", color: { rgb: "000000" } }
    };

    const headerFill = {
      patternType: "solid",
      fgColor: { rgb: "D3D3D3" }
    };

    for (let R = startTable; R <= endTable; ++R) {
      for (let C = 0; C <= 12; ++C) {
        const cellRef = XLSX.utils.encode_cell({ r: R, c: C });
        if (!worksheet[cellRef]) worksheet[cellRef] = { t: 's', v: '' };
        
        const isHeader = R === 5 || R === 6;
        worksheet[cellRef].s = {
          border: borderAll,
          alignment: { vertical: "center", horizontal: "center" },
          font: { name: "Calibri", sz: 10, bold: isHeader },
          fill: isHeader ? headerFill : undefined
        };
      }
    }

    for (let R = ttdHeaderRow; R <= ttdEndRow; ++R) {
      for (let C = 0; C <= 12; ++C) {
        const cellRef = XLSX.utils.encode_cell({ r: R, c: C });
        if (!worksheet[cellRef]) worksheet[cellRef] = { t: 's', v: '' };
        
        const isTtdHeader = R === ttdHeaderRow;
        worksheet[cellRef].s = {
          border: borderAll,
          alignment: { vertical: "center", horizontal: "center" },
          font: { name: "Calibri", sz: 10, bold: isTtdHeader },
          fill: isTtdHeader ? headerFill : undefined
        };
      }
    }

    worksheet["!merges"] = [
      { s: { r: 5, c: 1 }, e: { r: 5, c: 3 } },
      { s: { r: 5, c: 6 }, e: { r: 5, c: 8 } },
      { s: { r: 5, c: 0 }, e: { r: 6, c: 0 } },
      { s: { r: 5, c: 4 }, e: { r: 6, c: 4 } },
      { s: { r: 5, c: 5 }, e: { r: 6, c: 5 } },
      { s: { r: 5, c: 9 }, e: { r: 6, c: 9 } },
      { s: { r: 5, c: 10 }, e: { r: 6, c: 10 } },
      { s: { r: 5, c: 11 }, e: { r: 6, c: 11 } },
      { s: { r: 5, c: 12 }, e: { r: 6, c: 12 } },

      { s: { r: ttdHeaderRow, c: 0 }, e: { r: ttdHeaderRow, c: 2 } },
      { s: { r: ttdHeaderRow + 1, c: 0 }, e: { r: ttdHeaderRow + 2, c: 2 } },
      { s: { r: ttdHeaderRow + 3, c: 0 }, e: { r: ttdHeaderRow + 3, c: 2 } },

      { s: { r: ttdHeaderRow, c: 3 }, e: { r: ttdHeaderRow, c: 5 } },
      { s: { r: ttdHeaderRow + 1, c: 3 }, e: { r: ttdHeaderRow + 2, c: 5 } },
      { s: { r: ttdHeaderRow + 3, c: 3 }, e: { r: ttdHeaderRow + 3, c: 5 } },

      { s: { r: ttdHeaderRow, c: 6 }, e: { r: ttdHeaderRow, c: 8 } },
      { s: { r: ttdHeaderRow + 1, c: 6 }, e: { r: ttdHeaderRow + 2, c: 8 } },
      { s: { r: ttdHeaderRow + 3, c: 6 }, e: { r: ttdHeaderRow + 3, c: 8 } },

      { s: { r: ttdHeaderRow, c: 9 }, e: { r: ttdHeaderRow, c: 12 } },
      { s: { r: ttdHeaderRow + 1, c: 9 }, e: { r: ttdHeaderRow + 2, c: 12 } },
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
      
      const newNama = data[0]?.[2] || "";
      const newJabatan = data[1]?.[2] || "";
      const newNoRek = data[2]?.[2] || "";
      const newPeriode = data[3]?.[2] || "";

      const formattedItems: any[] = [];
      let currentItem: any = null;

      for (let i = 7; i < data.length; i++) {
        const row = data[i];
        if (!row || row.length === 0) continue;
        
        if (row[11]?.toString().includes("GRAND") || row[0] === "Requested By") break;

        if (row[0] && row[0].toString().trim() !== "") {
          if (currentItem) formattedItems.push(currentItem);
          currentItem = {
            no: formattedItems.length + 1,
            dd: row[1]?.toString() || "",
            mm: row[2]?.toString() || "",
            yy: row[3]?.toString() || "",
            kategori: row[4] || "Survey",
            kegiatan: row[5] || "",
            mulai: row[6] || "",
            selesai: row[7] || "",
            durasi: row[8] || "",
            dari: row[9] || "",
            ke: row[10] || "",
            zona: row[11]?.toString() || "",
            total: row[12]?.toString() || "",
            makan: "",
            overtime: ""
          };
        } else if (currentItem) {
          if (row[5] === "Makan") {
            currentItem.makan = row[12]?.toString() || "";
          } else if (row[5] === "Overtime") {
            currentItem.overtime = row[12]?.toString() || "";
          }
        }
      }
      if (currentItem) formattedItems.push(currentItem);

      setFormData((prev) => ({ 
        ...prev, 
        nama: newNama,
        jabatan: newJabatan,
        noRek: newNoRek,
        periode: newPeriode,
        items: formattedItems.length > 0 ? formattedItems : prev.items 
      }));
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
              <tr className="bg-slate-100 text-center align-middle">
                <th rowSpan={2} className="border p-0.5 w-8">No.</th>
                <th colSpan={3} className="border p-0.5 w-16">Tanggal</th>
                <th rowSpan={2} className="border p-0.5 w-24">Kategori</th>
                <th rowSpan={2} className="border p-0.5 w-40">Kegiatan</th>
                <th colSpan={3} className="border p-0.5 w-24">Waktu</th>
                <th rowSpan={2} className="border p-0.5 w-16">Dari Lokasi</th>
                <th rowSpan={2} className="border p-0.5 w-16">Ke Lokasi</th>
                <th rowSpan={2} className="border p-0.5 w-12">Zona</th>
                <th rowSpan={2} className="border p-0.5 w-16">Total Take Homepay</th>
                <th rowSpan={2} className="border p-0.5 w-6 print:hidden">X</th>
              </tr>
              <tr className="bg-slate-50 text-center align-middle">
                <th className="w-5">DD</th>
                <th className="w-5">MM</th>
                <th className="w-6">YY</th>
                <th className="w-8">Jam Mulai</th>
                <th className="w-8">Jam Selesai</th>
                <th className="w-8">Durasi</th>
              </tr>
            </thead>
            <tbody>
              {formData.items.map((item, idx) => (
                <React.Fragment key={idx}>
                  <tr className="hover:bg-slate-50 align-middle">
                    <td className="border text-center py-1 align-middle">{item.no}</td>
                    {["dd", "mm", "yy"].map(f => (
                      <td key={f} className="border py-1 align-middle">
                        <input value={(item as any)[f]} onChange={(e) => handleItemChange(idx, f, e.target.value)} className="w-full bg-transparent text-center focus:outline-none" />
                      </td>
                    ))}
                    <td className="border py-1 align-middle">
                      <select value={item.kategori} onChange={(e) => handleItemChange(idx, "kategori", e.target.value)} className="w-full bg-transparent truncate">
                        {["Survey", "Setup", "Migrasi", "Post Setup/Migrasi", "Troubleshooting", "Request Visit", "Standby Weekend", "Meeting"].map(opt => <option key={opt}>{opt}</option>)}
                      </select>
                    </td>
                    <td className="border py-1 px-1 align-middle">
                      <textarea 
                        value={item.kegiatan} 
                        onChange={(e) => handleItemChange(idx, "kegiatan", e.target.value)} 
                        rows={1}
                        className="w-full bg-transparent focus:outline-none resize-none overflow-hidden break-words whitespace-pre-wrap block m-auto" 
                        placeholder="Tulis kegiatan..."
                        style={{ minHeight: "20px" }}
                        onInput={(e: any) => {
                          e.target.style.height = "auto";
                          e.target.style.height = e.target.scrollHeight + "px";
                        }}
                      />
                    </td>
                    {["mulai", "selesai"].map(f => (
                      <td key={f} className="border py-1 align-middle">
                        <input value={(item as any)[f]} onChange={(e) => handleItemChange(idx, f, e.target.value)} className="w-full bg-transparent text-center" placeholder="00:00" />
                      </td>
                    ))}
                    <td className="border text-center font-bold text-indigo-600 py-1 align-middle">{item.durasi}</td>
                    {["dari", "ke"].map(f => (
                      <td key={f} className="border py-1 px-0.5 align-middle">
                        <input value={(item as any)[f]} onChange={(e) => handleItemChange(idx, f, e.target.value)} className="w-full bg-transparent px-0.5 truncate" />
                      </td>
                    ))}
                    <td className="border py-1 align-middle">
                      <input value={item.zona} onChange={(e) => handleItemChange(idx, "zona", e.target.value)} className="w-full bg-transparent text-center" />
                    </td>
                    <td className="border text-right px-1 py-1 align-middle">
                      <input 
                        type="number" 
                        value={item.total} 
                        onChange={(e) => handleItemChange(idx, "total", e.target.value)} 
                        className="w-full bg-transparent text-right focus:outline-none" 
                        placeholder="0" 
                      />
                    </td>
                    <td className="border text-center print:hidden py-1 align-middle">
                      <button onClick={() => removeItem(idx)} className="text-red-500 font-bold">×</button>
                    </td>
                  </tr>
                  {item.kategori !== "Standby Weekend" && (
                    <>
                      <tr className="bg-slate-50/50 align-middle">
                        <td className="border" colSpan={5}></td>
                        <td className="border italic text-[8px] text-slate-500 px-1">Makan</td>
                        <td className="border" colSpan={6}></td>
                        <td className="border">
                          <input value={item.makan} onChange={(e) => handleItemChange(idx, "makan", e.target.value)} className="w-full bg-transparent text-right px-1" />
                        </td>
                        <td className="border print:hidden"></td>
                      </tr>
                      <tr className="bg-slate-50/50 align-middle">
                        <td className="border" colSpan={5}></td>
                        <td className="border italic text-[8px] text-slate-500 px-1">Overtime</td>
                        <td className="border" colSpan={6}></td>
                        <td className="border">
                          <input value={item.overtime} onChange={(e) => handleItemChange(idx, "overtime", e.target.value)} className="w-full bg-transparent text-right px-1" />
                        </td>
                        <td className="border print:hidden"></td>
                      </tr>
                    </>
                  )}
                </React.Fragment>
              ))}
              <tr className="bg-slate-100 font-bold">
                <td className="border p-1 text-right" colSpan={12}>GRAND TOTAL</td>
                <td className="border p-1 text-right">{calculateGrandTotal().toLocaleString()}</td>
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