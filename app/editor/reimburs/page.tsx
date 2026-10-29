"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import * as XLSX from "xlsx-js-style";

type Attachment = {
  id: string;
  name: string;
  size: string;
  pages: string[];
};

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

    // Menyamakan dan mengatur lebar kolom agar rapi di Excel
    worksheet['!cols'] = [
      { wch: 5 },  // No
      { wch: 5 },  // DD
      { wch: 5 },  // MM
      { wch: 6 },  // YY
      { wch: 18 }, // Kategori
      { wch: 35 }, // Kegiatan
      { wch: 10 }, // Jam Mulai
      { wch: 10 }, // Jam Selesai
      { wch: 8 },  // Durasi
      { wch: 15 }, // Dari Lokasi
      { wch: 15 }, // Ke Lokasi
      { wch: 6 },  // Zona
      { wch: 20 }, // Total Take Homepay (Dibuat lebar dan sama rata)
    ];

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

  // Lampiran PDF yang akan digabung dengan dokumen saat dicetak / Save PDF
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [loadingUpload, setLoadingUpload] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  // Render tiap halaman PDF lampiran jadi gambar, supaya ikut tercetak jadi satu dokumen
  const renderPdfPages = async (file: File): Promise<string[]> => {
    const pdfjs = await import("pdfjs-dist");
    pdfjs.GlobalWorkerOptions.workerSrc = new URL(
      "pdfjs-dist/build/pdf.worker.min.js",
      import.meta.url
    ).toString();

    const doc = await pdfjs.getDocument({
      data: new Uint8Array(await file.arrayBuffer()),
    }).promise;

    const pages: string[] = [];

    for (let i = 1; i <= doc.numPages; i++) {
      const page = await doc.getPage(i);
      const viewport = page.getViewport({ scale: 2 });
      const canvas = document.createElement("canvas");
      canvas.width = Math.floor(viewport.width);
      canvas.height = Math.floor(viewport.height);
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Canvas tidak tersedia");

      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      await page.render({ canvasContext: ctx, viewport }).promise;

      // PNG untuk halaman teks (tajam), fallback JPEG kalau PNG-nya kegedean
      const png = canvas.toDataURL("image/png");
      pages.push(png.length > 1_500_000 ? canvas.toDataURL("image/jpeg", 0.92) : png);
      page.cleanup();
    }

    await doc.destroy();
    return pages;
  };

  const handleAttachmentUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []).filter(
      (f) => f.type === "application/pdf" || f.name.toLowerCase().endsWith(".pdf")
    );
    if (files.length === 0) return;

    setLoadingUpload(true);
    try {
      for (const file of files) {
        const pages = await renderPdfPages(file);
        setAttachments((prev) => [
          ...prev,
          {
            id: Math.random().toString(36).slice(2, 9),
            name: file.name,
            size: formatSize(file.size),
            pages,
          },
        ]);
      }
    } catch (err: any) {
      console.error(err);
      alert("Gagal membaca PDF lampiran: " + (err?.message || err));
    } finally {
      setLoadingUpload(false);
      e.target.value = "";
    }
  };

  const removeAttachment = (id: string) => {
    setAttachments((prev) => prev.filter((a) => a.id !== id));
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 text-[10px] text-slate-800">
      <style jsx global>{`
        @media print {
          .attachments-wrap {
            display: block !important;
            width: 100% !important;
            margin: 0 !important;
          }

          .attachment-page {
            display: block !important;
            width: 100% !important;
            margin: 0 !important;
            padding-top: 4mm;
            text-align: center;
            page-break-before: always;
            break-before: page;
          }

          .attachment-page img {
            display: block !important;
            width: auto !important;
            height: auto !important;
            max-width: 180mm !important;
            max-height: 255mm !important;
            margin: 0 auto !important;
          }
        }
      `}</style>

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
                <th rowSpan={2} className="border p-0.5 w-24">Total Take Homepay</th>
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

      {/* Upload lampiran PDF */}
      <div className="max-w-[210mm] mx-auto mt-4 border border-dashed border-slate-300 bg-white p-3 rounded-lg space-y-2 print:hidden">
        <p className="font-bold text-[10px] uppercase tracking-wide text-slate-500">Lampiran PDF</p>
        <p className="text-[9px] text-slate-500">
          PDF yang diupload digabung setelah dokumen waktu klik <strong>🖨️ Cetak</strong>.
        </p>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="application/pdf,.pdf"
          onChange={handleAttachmentUpload}
          className="hidden"
        />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={loadingUpload}
          className="bg-sky-500 text-white px-2.5 py-1 rounded text-[9px] font-bold shadow disabled:opacity-50"
        >
          {loadingUpload ? "⏳ MEMBACA PDF..." : "📤 Upload PDF Lampiran"}
        </button>

        {attachments.length > 0 && (
          <ul className="space-y-1 pt-1">
            {attachments.map((att) => (
              <li
                key={att.id}
                className="flex items-center justify-between gap-2 text-[9px] border border-slate-200 rounded px-2 py-1"
              >
                <span className="truncate font-semibold">{att.name}</span>
                <span className="text-slate-400 shrink-0">{att.pages.length} halaman</span>
                <button
                  type="button"
                  onClick={() => removeAttachment(att.id)}
                  className="text-rose-500 font-bold shrink-0"
                  title="Hapus lampiran"
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Halaman lampiran: ikut tercetak setelah dokumen */}
      {attachments.length > 0 && (
        <div className="attachments-wrap max-w-[210mm] mx-auto mt-4 flex flex-col gap-4 print:block print:m-0 print:max-w-none">
          {attachments.map((att) =>
            att.pages.map((src, idx) => (
              <figure
                key={`${att.id}-${idx}`}
                className="attachment-page relative bg-white shadow-sm border rounded overflow-hidden print:shadow-none print:border-none print:m-0"
              >
                <figcaption className="absolute top-2 left-2 z-10 px-2 py-1 rounded bg-slate-900/70 text-white text-[9px] font-semibold print:hidden">
                  {att.name} · hal. {idx + 1}/{att.pages.length}
                </figcaption>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt={`${att.name} halaman ${idx + 1}`}
                  className="block w-full h-auto"
                />
              </figure>
            ))
          )}
        </div>
      )}
    </div>
  );
}