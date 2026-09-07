import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    // Test nembak API publik untuk cek konektivitas internet server Vercel
    const response = await fetch("https://jsonplaceholder.typicode.com/todos/1");
    const data = await response.json();

    return NextResponse.json({
      success: true,
      message: "Server Vercel sukses tembus ke internet!",
      publicApiResponse: data,
    });
  } catch (err: any) {
    return NextResponse.json({
      success: false,
      error: "Gagal konek ke internet: " + err.message,
    }, { status: 500 });
  }
}