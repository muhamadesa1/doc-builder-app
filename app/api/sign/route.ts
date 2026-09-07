import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { documentName, signerEmail, signerName, pdfBase64 } = body;

    const apiUrl = process.env.MEKARI_API_URL;
    const clientId = process.env.MEKARI_CLIENT_ID;
    const clientSecret = process.env.MEKARI_CLIENT_SECRET;

    // Log ke terminal / Vercel logs untuk memastikan env terbaca
    console.log("MEKARI_API_URL:", apiUrl ? "Terisi" : "KOSONG");
    console.log("MEKARI_CLIENT_ID:", clientId ? "Terisi" : "KOSONG");

    if (!apiUrl || !clientId || !clientSecret) {
      return NextResponse.json(
        { error: "Kredensial atau URL Mekari API belum lengkap di environment variables." },
        { status: 500 }
      );
    }

    const targetUrl = `${apiUrl}/signature/requests`;
    console.log("Menembak endpoint:", targetUrl);

    // Tembak API Mekari Sign
    const response = await fetch(targetUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Basic " + Buffer.from(`${clientId}:${clientSecret}`).toString("base64"),
      },
      body: JSON.stringify({
        document: {
          name: documentName,
          file: pdfBase64,
        },
        signers: [
          {
            name: signerName,
            email: signerEmail,
            order: 1,
          },
        ],
      }),
    });

    const data = await response.json();
    console.log("Respon dari Mekari:", response.status, data);

    if (!response.ok) {
      throw new Error(data.message || JSON.stringify(data) || "Gagal membuat request tanda tangan di Mekari.");
    }

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    console.error("FULL ERROR LOG MEKARI:", error);
    return NextResponse.json({ 
      success: false, 
      error: error.cause?.message || error.message || "Terjadi kesalahan pada fetch API" 
    }, { status: 500 });
  }
}