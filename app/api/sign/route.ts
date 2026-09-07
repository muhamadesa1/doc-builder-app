import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { documentName, signerEmail, signerName, pdfBase64 } = body;

    const mekariApiUrl = "https://api-sandbox.mekari.com/v2/signature/requests";
    const clientId = process.env.MEKARI_CLIENT_ID;
    const clientSecret = process.env.MEKARI_CLIENT_SECRET;

    // Cek apakah kredensial terbaca di server Vercel
    console.log("CLIENT_ID Terbaca:", clientId ? "ADA (aman)" : "KOSONG!");
    console.log("CLIENT_SECRET Terbaca:", clientSecret ? "ADA (aman)" : "KOSONG!");

    const mekariResponse = await fetch(mekariApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Client-Id": clientId || "",
        "X-Client-Secret": clientSecret || "",
      },
      body: JSON.stringify({
        document_name: documentName,
        signers: [{ name: signerName, email: signerEmail }],
        file: pdfBase64,
      }),
    });

    const responseText = await mekariResponse.text();
    let data;
    try {
      data = JSON.parse(responseText);
    } catch {
      data = { rawText: responseText };
    }

    if (!mekariResponse.ok) {
      return NextResponse.json(
        {
          success: false,
          error: `Mekari HTTP ${mekariResponse.status}: ${JSON.stringify(data)}`,
        },
        { status: mekariResponse.status }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (err: any) {
    // Tangkap error mentah fetch failed beserta penyebab aslinya
    console.error("Fetch Error Detail:", err);
    return NextResponse.json(
      {
        success: false,
        error: "Fetch Gagal Total: " + (err.cause?.message || err.message),
      },
      { status: 500 }
    );
  }
}