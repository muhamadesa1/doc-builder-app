import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const clientId = process.env.MEKARI_CLIENT_ID || "";
    const clientSecret = process.env.MEKARI_CLIENT_SECRET || "";

    if (!clientId || !clientSecret) {
      return NextResponse.json({
        success: false,
        error: "Environment Variable MEKARI_CLIENT_ID atau SECRET kosong di Vercel!",
      }, { status: 400 });
    }

    const body = await request.json();
    const { documentName, signerEmail, signerName, pdfBase64 } = body;
    const baseUrl = "https://api.mekari.com";

    console.log("1. Meminta OAuth2 Access Token ke Mekari...");

    // 1. Ambil Access Token dari Mekari OAuth endpoint
    const tokenRes = await fetch(`${baseUrl}/oauth/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({
        grant_type: "client_credentials",
        client_id: clientId,
        client_secret: clientSecret,
      }),
    });

    const tokenText = await tokenRes.text();
    let tokenData;
    try {
      tokenData = JSON.parse(tokenText);
    } catch {
      tokenData = { rawText: tokenText };
    }

    if (!tokenRes.ok || !tokenData.access_token) {
      console.error("Gagal ambil token OAuth2:", tokenData);
      return NextResponse.json({
        success: false,
        error: `OAuth2 Token Gagal [${tokenRes.status}]: ${JSON.stringify(tokenData)}`,
      }, { status: tokenRes.status });
    }

    const accessToken = tokenData.access_token;
    console.log("Token OAuth2 berhasil didapat! Mengirim dokumen ke eSign...");

    // 2. Kirim dokumen ke endpoint eSign yang benar menggunakan Bearer Token
    const esignPath = "/esign/v1/documents";
    const esignUrl = `${baseUrl}${esignPath}`;
    
    const esignRes = await fetch(esignUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${accessToken}`, // Menggunakan Access Token murni
      },
      body: JSON.stringify({
        document_name: documentName,
        signers: [{ name: signerName, email: signerEmail }],
        file: pdfBase64,
      }),
    });

    const esignText = await esignRes.text();
    console.log("eSign Response Status:", esignRes.status);
    console.log("eSign Response Body:", esignText);

    let esignData;
    try {
      esignData = JSON.parse(esignText);
    } catch {
      esignData = { rawText: esignText };
    }

    if (!esignRes.ok) {
      return NextResponse.json({
        success: false,
        error: `Mekari eSign Error [${esignRes.status}]: ${JSON.stringify(esignData)}`,
      }, { status: esignRes.status });
    }

    return NextResponse.json({ success: true, data: esignData });

  } catch (err: any) {
    console.error("Internal Server Error:", err);
    return NextResponse.json({
      success: false,
      error: "Gagal Total: " + (err.message || "Terjadi kesalahan internal"),
    }, { status: 500 });
  }
}