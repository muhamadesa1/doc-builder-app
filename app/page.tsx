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

        {/* Grid 4 Kartu */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: Berita Acara Troubleshoot */}
          <Link href="/editor/troubleshoot">
            <div className="h-full bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all flex flex-col justify-between cursor-pointer group">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl">🛠️</span>
                  <span className="text-xs font-semibold px-3 py-1 bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300 rounded-full">
                    Insiden & Perbaikan
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 group-hover:text-indigo-600 transition-colors mb-2">
                  Berita Acara Troubleshoot
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  Dokumen penanganan masalah sistem/perangkat. Mencakup kronologi masalah, root cause analysis (RCA), dan tindakan perbaikan yang dilakukan.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between">
                <span className="text-xs font-medium text-slate-400 group-hover:text-indigo-600 transition-colors">
                  Klik untuk pilih
                </span>
                <div className="w-5 h-5 rounded-full border border-slate-300 dark:border-slate-600 group-hover:border-indigo-600 flex items-center justify-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            </div>
          </Link>

          {/* Card 2: Berita Acara Live */}
          <Link href="/editor/live">
            <div className="h-full bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all flex flex-col justify-between cursor-pointer group">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl">🚀</span>
                  <span className="text-xs font-semibold px-3 py-1 bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300 rounded-full">
                    Deployment / Release
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 group-hover:text-indigo-600 transition-colors mb-2">
                  Berita Acara Live
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  Dokumen serah terima dan pernyataan resmi bahwa aplikasi, fitur, atau layanan baru telah berhasil di-deploy dan siap digunakan di environment Production.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between">
                <span className="text-xs font-medium text-slate-400 group-hover:text-indigo-600 transition-colors">
                  Klik untuk pilih
                </span>
                <div className="w-5 h-5 rounded-full border border-slate-300 dark:border-slate-600 group-hover:border-indigo-600 flex items-center justify-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            </div>
          </Link>

          {/* Card 3: Berita Acara Live Reader */}
          <Link href="/editor/live-reader">
            <div className="h-full bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all flex flex-col justify-between cursor-pointer group">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl">📡</span>
                  <span className="text-xs font-semibold px-3 py-1 bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 rounded-full">
                    Monitoring & Integrasi
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 group-hover:text-indigo-600 transition-colors mb-2">
                  Berita Acara Live Reader
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  Dokumen hasil pengetesan dan verifikasi operasional perangkat pembaca (reader hardware/IoT/RFID) yang sudah aktif terkoneksi di lapangan.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between">
                <span className="text-xs font-medium text-slate-400 group-hover:text-indigo-600 transition-colors">
                  Klik untuk pilih
                </span>
                <div className="w-5 h-5 rounded-full border border-slate-300 dark:border-slate-600 group-hover:border-indigo-600 flex items-center justify-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            </div>
          </Link>

          {/* Card 4: Berita Acara Switch SSD Server */}
          <Link href="/editor/switch-ssd">
            <div className="h-full bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all flex flex-col justify-between cursor-pointer group">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl">💽</span>
                  <span className="text-xs font-semibold px-3 py-1 bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300 rounded-full">
                    Maintenance & Server
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 group-hover:text-indigo-600 transition-colors mb-2">
                  Berita Acara Switch SSD Server
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  Dokumen migrasi, penggantian, atau pergantian (switch) drive SSD pada server lokasi. Mencakup pencatatan rincian hardware lama/baru, backup data, serta hasil pengujian pasca switch.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between">
                <span className="text-xs font-medium text-slate-400 group-hover:text-indigo-600 transition-colors">
                  Klik untuk pilih
                </span>
                <div className="w-5 h-5 rounded-full border border-slate-300 dark:border-slate-600 group-hover:border-indigo-600 flex items-center justify-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}