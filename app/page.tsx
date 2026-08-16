"use client";

import React from "react";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-100 dark:bg-slate-900 p-8 text-slate-800 dark:text-slate-100 flex flex-col items-center">
      <div className="max-w-4xl w-full">
        <h1 className="text-2xl font-extrabold text-center mb-2 tracking-wide">Pilih Jenis Berita Acara</h1>
        <p className="text-center text-xs text-slate-500 dark:text-slate-400 mb-8">Silahkan pilih template berita acara yang ingin disunting dan dicetak.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Berita Acara Troubleshoot */}
          <Link href="/editor/troubleshoot" className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-md transition flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-3">
                <span className="text-2xl">🛠️</span>
                <span className="bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300 text-[10px] font-bold px-2.5 py-0.5 rounded-full">Insiden & Perbaikan</span>
              </div>
              <h2 className="font-bold text-slate-800 dark:text-slate-100 text-base mb-1">Berita Acara Troubleshoot</h2>
              <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed">Dokumen penanganan masalah sistem/perangkat. Mencakup kronologi masalah, root cause analysis (RCA), dan tindakan perbaikan.</p>
            </div>
            <div className="mt-4 text-indigo-600 dark:text-indigo-400 text-xs font-bold">Buka Template →</div>
          </Link>

          {/* Berita Acara Live */}
          <Link href="/editor/live" className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-md transition flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-3">
                <span className="text-2xl">🚀</span>
                <span className="bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 text-[10px] font-bold px-2.5 py-0.5 rounded-full">Deployment / Release</span>
              </div>
              <h2 className="font-bold text-slate-800 dark:text-slate-100 text-base mb-1">Berita Acara Live</h2>
              <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed">Dokumen serah terima dan pernyataan resmi bahwa aplikasi, fitur, atau layanan baru telah berhasil di-deploy.</p>
            </div>
            <div className="mt-4 text-indigo-600 dark:text-indigo-400 text-xs font-bold">Buka Template →</div>
          </Link>

          {/* Berita Acara Live Reader */}
          <Link href="/editor/live-reader" className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-md transition flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-3">
                <span className="text-2xl">📡</span>
                <span className="bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300 text-[10px] font-bold px-2.5 py-0.5 rounded-full">Monitoring & Integrasi</span>
              </div>
              <h2 className="font-bold text-slate-800 dark:text-slate-100 text-base mb-1">Berita Acara Live Reader</h2>
              <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed">Dokumen hasil pengetesan dan verifikasi operasional perangkat pembaca (reader hardware/RFID) yang sudah aktif.</p>
            </div>
            <div className="mt-4 text-indigo-600 dark:text-indigo-400 text-xs font-bold">Buka Template →</div>
          </Link>

          {/* Berita Acara Switch SSD */}
          <Link href="/editor/switch-ssd" className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-md transition flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-3">
                <span className="text-2xl">💾</span>
                <span className="bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300 text-[10px] font-bold px-2.5 py-0.5 rounded-full">Maintenance & Server</span>
              </div>
              <h2 className="font-bold text-slate-800 dark:text-slate-100 text-base mb-1">Berita Acara Switch SSD</h2>
              <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed">Dokumen migrasi, penggantian (switch) drive SSD pada server lokasi. Mencakup pencatatan rincian hardware lama/baru, backup data.</p>
            </div>
            <div className="mt-4 text-indigo-600 dark:text-indigo-400 text-xs font-bold">Buka Template →</div>
          </Link>

          {/* Berita Acara Analisa Reimburs */}
          <Link href="/editor/reimburs" className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-md transition flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-3">
                <span className="text-2xl">💰</span>
                <span className="bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300 text-[10px] font-bold px-2.5 py-0.5 rounded-full">Finance & Admin</span>
              </div>
              <h2 className="font-bold text-slate-800 dark:text-slate-100 text-base mb-1">Berita Acara Analisa Reimburs</h2>
              <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed">Dokumen verifikasi dan analisa biaya pengembalian (reimbursement) untuk keperluan operasional lapangan dan pihak terkait.</p>
            </div>
            <div className="mt-4 text-indigo-600 dark:text-indigo-400 text-xs font-bold">Buka Template →</div>
          </Link>

          {/* BARU: Berita Acara Standby Weekend */}
          <Link href="/editor/ba-standby" className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-md transition flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-3">
                <span className="text-2xl">⏳</span>
                <span className="bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 text-[10px] font-bold px-2.5 py-0.5 rounded-full">Standby Weekend</span>
              </div>
              <h2 className="font-bold text-slate-800 dark:text-slate-100 text-base mb-1">Berita Acara Standby</h2>
              <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed">Laporan kegiatan standby weekend, monitoring kondisi lapangan, serta catatan operasional teknisi.</p>
            </div>
            <div className="mt-4 text-indigo-600 dark:text-indigo-400 text-xs font-bold">Buka Template →</div>
          </Link>

        </div>
      </div>
    </main>
  );
}