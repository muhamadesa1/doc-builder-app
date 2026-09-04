"use client";

import React from "react";
import Link from "next/link";

const templates = [
  {
    title: "Berita Acara Troubleshoot",
    subtitle: "Insiden & Perbaikan",
    desc: "Dokumen penanganan masalah sistem/perangkat, kronologi, root cause analysis (RCA), dan tindakan perbaikan.",
    badgeBg: "bg-rose-50 border-rose-200 text-rose-600 dark:bg-rose-950/40 dark:border-rose-800 dark:text-rose-300",
    btnBg: "bg-rose-600 hover:bg-rose-700",
    iconBg: "bg-rose-100 dark:bg-rose-900/40",
    icon: "🛠️",
    href: "/editor/troubleshoot",
  },
  {
    title: "Berita Acara Live",
    subtitle: "Deployment / Release",
    desc: "Dokumen serah terima dan pernyataan resmi bahwa aplikasi, fitur, atau layanan baru telah berhasil di-deploy.",
    badgeBg: "bg-amber-50 border-amber-200 text-amber-600 dark:bg-amber-950/40 dark:border-amber-800 dark:text-amber-300",
    btnBg: "bg-amber-600 hover:bg-amber-700",
    iconBg: "bg-amber-100 dark:bg-amber-900/40",
    icon: "🚀",
    href: "/editor/live",
  },
  {
    title: "Berita Acara Maintenance",
    subtitle: "Maintenance Lokasi",
    desc: "Dokumen kegiatan pemeliharaan rutin, penanganan issue sistem/non-sistem, serta pencatatan peminjaman aset.",
    badgeBg: "bg-indigo-50 border-indigo-200 text-indigo-600 dark:bg-indigo-950/40 dark:border-indigo-800 dark:text-indigo-300",
    btnBg: "bg-indigo-600 hover:bg-indigo-700",
    iconBg: "bg-indigo-100 dark:bg-indigo-900/40",
    icon: "🔧",
    href: "/editor/ba-maintanance",
  },
  {
    title: "Berita Acara Switch SSD",
    subtitle: "Maintenance & Server",
    desc: "Dokumen migrasi & penggantian drive SSD pada server lokasi. Mencakup pencatatan rincian hardware & backup.",
    badgeBg: "bg-purple-50 border-purple-200 text-purple-600 dark:bg-purple-950/40 dark:border-purple-800 dark:text-purple-300",
    btnBg: "bg-purple-600 hover:bg-purple-700",
    iconBg: "bg-purple-100 dark:bg-purple-900/40",
    icon: "💾",
    href: "/editor/switch-ssd",
  },
  {
    title: "Berita Acara Analisa Reimburs",
    subtitle: "Finance & Admin",
    desc: "Dokumen verifikasi dan analisa biaya pengembalian (reimbursement) untuk operasional lapangan.",
    badgeBg: "bg-emerald-50 border-emerald-200 text-emerald-600 dark:bg-emerald-950/40 dark:border-emerald-800 dark:text-emerald-300",
    btnBg: "bg-emerald-600 hover:bg-emerald-700",
    iconBg: "bg-emerald-100 dark:bg-emerald-900/40",
    icon: "💰",
    href: "/editor/reimburs",
  },
  {
    title: "Berita Acara Standby",
    subtitle: "Standby Weekend",
    desc: "Laporan kegiatan standby weekend, monitoring kondisi lapangan, serta catatan operasional teknisi.",
    badgeBg: "bg-sky-50 border-sky-200 text-sky-600 dark:bg-sky-950/40 dark:border-sky-800 dark:text-sky-300",
    btnBg: "bg-sky-600 hover:bg-sky-700",
    iconBg: "bg-sky-100 dark:bg-sky-900/40",
    icon: "⏳",
    href: "/editor/ba-standby",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans relative overflow-hidden">
      {/* Background Vector Dot Grid Pattern */}
      <div className="absolute inset-0 z-0 opacity-40 dark:opacity-20 pointer-events-none bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] dark:bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:24px_24px]" />

      {/* Background Soft Glow Orbs */}
      <div className="absolute top-[-80px] right-[10%] w-[500px] h-[350px] bg-gradient-to-tr from-purple-200 to-rose-200 dark:from-purple-950 dark:to-rose-950 blur-[120px] rounded-full pointer-events-none opacity-60 z-0" />

      {/* Top Navbar */}
      <header className="border-b border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center font-black text-base shadow">
              S
            </div>
            <span className="font-extrabold text-slate-900 dark:text-white tracking-tight text-lg">
              DocBuilder <span className="text-rose-600">BA</span>
            </span>
          </div>

          <Link
            href="/editor/combine-pdf"
            className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 font-semibold text-xs rounded-full shadow transition-all duration-200 flex items-center gap-2 active:scale-95"
          >
            🧩 Combine PDF ➔
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-6 pt-8 pb-20 z-10">
        {/* Hero Section dengan Ilustrasi Roket SVG Native (100% Offline / Reliable) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center mb-16 pt-4">
          <div className="md:col-span-7 space-y-4 text-center md:text-left">
            <span className="inline-block px-3 py-1 bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 text-rose-600 dark:text-rose-300 text-[11px] font-extrabold tracking-wider uppercase rounded-full">
              PARKEE • INTERNAL DOCUMENT BUILDER
            </span>
            <h1 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
              Aplikasi Laporan &amp; <br />
              <span className="bg-gradient-to-r from-rose-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Berita Acara Digital
              </span>
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm md:text-base leading-relaxed max-w-xl">
              Buat, cetak, dan kelola dokumen operasional lapangan secara presisi, rapi, serta cepat langsung dari perangkat kamu.
            </p>
          </div>

          {/* Inline SVG Roket */}
          <div className="md:col-span-5 flex justify-center md:justify-end relative">
            <div className="relative w-full max-w-[260px] p-6 bg-gradient-to-tr from-rose-50 to-indigo-50 dark:from-slate-800 dark:to-slate-800 rounded-3xl border border-rose-100 dark:border-slate-700 shadow-xl flex items-center justify-center">
              <svg
                viewBox="0 0 200 200"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-auto drop-shadow-md hover:scale-105 transition-transform duration-300"
              >
                <path
                  d="M100 20C120 50 140 90 140 130H60C60 90 80 50 100 20Z"
                  fill="url(#rocket_grad)"
                />
                <path d="M100 20L115 60H85L100 20Z" fill="#E11D48" />
                <circle cx="100" cy="85" r="16" fill="#1E293B" stroke="#E2E8F0" strokeWidth="4" />
                <circle cx="100" cy="85" r="8" fill="#38BDF8" />
                <path d="M60 110L35 145V130L60 110Z" fill="#E11D48" />
                <path d="M140 110L165 145V130L140 110Z" fill="#E11D48" />
                <path d="M80 130L70 160H130L120 130H80Z" fill="#F59E0B" />
                <path d="M90 160L85 180H115L110 160H90Z" fill="#EF4444" />
                <defs>
                  <linearGradient id="rocket_grad" x1="100" y1="20" x2="100" y2="130" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#F43F5E" />
                    <stop offset="1" stopColor="#6366F1" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
        </div>

        {/* Section Title */}
        <div className="text-center mb-10 space-y-1">
          <div className="inline-flex items-center gap-2">
            <span className="h-px w-8 bg-slate-300 dark:bg-slate-700" />
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
              Pilih Template Berita Acara
            </h2>
            <span className="h-px w-8 bg-slate-300 dark:bg-slate-700" />
          </div>
          <p className="text-xs text-slate-400">
            Pilih jenis template di bawah ini untuk memulai penyuntingan.
          </p>
        </div>

        {/* Grid Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {templates.map((item, idx) => (
            <div
              key={idx}
              className="group relative bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1"
            >
              <div>
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-4 shadow-inner ${item.iconBg}`}
                >
                  {item.icon}
                </div>

                <span
                  className={`inline-block text-[10px] font-bold px-2.5 py-1 rounded-md border mb-3 ${item.badgeBg}`}
                >
                  {item.subtitle}
                </span>

                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2 group-hover:text-rose-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors">
                  Buka Template
                </span>
                <Link
                  href={item.href}
                  className={`w-8 h-8 rounded-full ${item.btnBg} text-white flex items-center justify-center text-xs font-bold shadow-md group-hover:scale-110 transition-all`}
                >
                  ➔
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner Callout */}
        <div className="mt-16 bg-slate-900 dark:bg-slate-900 text-white rounded-3xl p-8 md:p-10 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
          <div className="space-y-1 text-center md:text-left z-10">
            <h3 className="text-xl md:text-2xl font-bold tracking-tight">
              Butuh Menggabungkan Banyak File PDF?
            </h3>
            <p className="text-xs md:text-sm text-slate-400">
              Gunakan Combine PDF Tool untuk menyatukan beberapa file dokumen &amp; gambar menjadi satu PDF.
            </p>
          </div>
          <Link
            href="/editor/combine-pdf"
            className="px-6 py-3 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl shadow-lg transition-all active:scale-95 shrink-0 z-10"
          >
            Buka Combine PDF Tool ➔
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-6 text-center text-xs text-slate-400 z-10">
        © 2026 DocBuilder BA — Internal Tooling System
      </footer>
    </div>
  );
}