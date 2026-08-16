"use client";

import React from "react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 p-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-10 text-center">
          <h1 className="text-3xl font-black text-indigo-600 dark:text-indigo-400 mb-2">
            Pilih Jenis Berita Acara
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            Silakan pilih template berita acara yang ingin disunting dan dicetak.
          </p>
        </header>

        {/* Grid Kartu */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Card 1: Troubleshoot */}
          <Link href="/editor/troubleshoot">
            <div className="h-full bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all flex flex-col justify-between cursor-pointer group">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl">🛠️</span>
                  <span className="text-xs font-semibold px-3 py-1 bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300 rounded-full">Insiden & Perbaikan</span>
                </div>
                <h3 className="text-lg font-bold text-slate-800 group-hover:text-indigo-600 mb-2">Berita Acara Troubleshoot</h3>
                <p className="text-sm text-slate-500 leading-relaxed">Dokumen penanganan masalah sistem/perangkat. Mencakup kronologi masalah, root cause analysis (RCA), dan tindakan perbaikan.</p>
              </div>
            </div>
          </Link>

          {/* Card 2: Live */}
          <Link href="/editor/live">
            <div className="h-full bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all flex flex-col justify-between cursor-pointer group">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl">🚀</span>
                  <span className="text-xs font-semibold px-3 py-1 bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300 rounded-full">Deployment / Release</span>
                </div>
                <h3 className="text-lg font-bold text-slate-800 group-hover:text-indigo-600 mb-2">Berita Acara Live</h3>
                <p className="text-sm text-slate-500 leading-relaxed">Dokumen serah terima dan pernyataan resmi bahwa aplikasi, fitur, atau layanan baru telah berhasil di-deploy.</p>
              </div>
            </div>
          </Link>

          {/* Card 3: Live Reader */}
          <Link href="/editor/live-reader">
            <div className="h-full bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all flex flex-col justify-between cursor-pointer group">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl">📡</span>
                  <span className="text-xs font-semibold px-3 py-1 bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 rounded-full">Monitoring & Integrasi</span>
                </div>
                <h3 className="text-lg font-bold text-slate-800 group-hover:text-indigo-600 mb-2">Berita Acara Live Reader</h3>
                <p className="text-sm text-slate-500 leading-relaxed">Dokumen hasil pengetesan dan verifikasi operasional perangkat pembaca (reader hardware/IoT/RFID) yang sudah aktif.</p>
              </div>
            </div>
          </Link>

          {/* Card 4: Switch SSD Server */}
          <Link href="/editor/switch-ssd">
            <div className="h-full bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all flex flex-col justify-between cursor-pointer group">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl">💽</span>
                  <span className="text-xs font-semibold px-3 py-1 bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300 rounded-full">Maintenance & Server</span>
                </div>
                <h3 className="text-lg font-bold text-slate-800 group-hover:text-indigo-600 mb-2">Berita Acara Switch SSD</h3>
                <p className="text-sm text-slate-500 leading-relaxed">Dokumen migrasi, penggantian (switch) drive SSD pada server lokasi. Mencakup pencatatan rincian hardware lama/baru, backup data.</p>
              </div>
            </div>
          </Link>

          {/* Card 5: Analisa Reimburs (NEW) */}
          <Link href="/editor/reimburs">
            <div className="h-full bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all flex flex-col justify-between cursor-pointer group">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl">💰</span>
                  <span className="text-xs font-semibold px-3 py-1 bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300 rounded-full">Finance & Admin</span>
                </div>
                <h3 className="text-lg font-bold text-slate-800 group-hover:text-indigo-600 mb-2">Berita Acara Analisa Reimburs</h3>
                <p className="text-sm text-slate-500 leading-relaxed">Dokumen verifikasi dan analisa biaya pengembalian (reimbursement) untuk keperluan operasional lapangan dan pihak terkait.</p>
              </div>
            </div>
          </Link>

        </div>
      </div>
    </div>
  );
}