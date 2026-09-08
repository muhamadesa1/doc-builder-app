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

    console.log("1. Mengambil OAuth2 Token dengan Client Credentials...");

    // 1. Ambil Access Token dari /oauth/token
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
    console.log("Token Response Status:", tokenRes.status);
    console.log("Token Response Body:", tokenText);

    let tokenData;
    try {
      tokenData = JSON.parse(tokenText);
    } catch {
      tokenData = { rawText: tokenText };
    }

    if (!tokenRes.ok || !tokenData.access_token) {
      return NextResponse.json({
        success: false,
        error: `OAuth2 Token Gagal [${tokenRes.status}]: ${JSON.stringify(tokenData)}`,
      }, { status: tokenRes.status });
    }

    const accessToken = tokenData.access_token;
    console.log("Token berhasil didapat! Mengirim dokumen ke eSign...");

    // 2. Kirim dokumen menggunakan Bearer Token ke endpoint eSign v2
    const esignPath = "/v2/esign/documents";
    const esignUrl = `${baseUrl}${esignPath}`;

    const esignRes = await fetch(esignUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${accessToken}`,
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