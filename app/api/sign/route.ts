import { NextResponse } from "next/server";
import crypto from "crypto";

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

    const path = "/v2/esign/documents";
    const url = `https://api.mekari.com${path}`;
    const datetime = new Date().toUTCString();

    const payloadObj = {
      document_name: documentName,
      signers: [{ name: signerName, email: signerEmail }],
      file: pdfBase64,
    };

    const requestBodyString = JSON.stringify(payloadObj);

    // 1. BUAT HEADER DIGEST (Wajib untuk POST di Mekari HMAC Auth)
    const bodyHash = crypto
      .createHash("sha256")
      .update(requestBodyString)
      .digest("base64");
    const digestHeaderValue = `SHA-256=${bodyHash}`;

    // 2. BUAT HMAC SIGNATURE
    const requestLine = `POST ${path} HTTP/1.1`;
    const payloadSigning = [`date: ${datetime}`, requestLine].join("\n");
    
    const signature = crypto
      .createHmac("SHA256", clientSecret)
      .update(payloadSigning)
      .digest("base64");

    // 3. SUSUN HEADER LENGKAP SESUAI DOKUMENTASI MEKARI
    const headers = {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Date": datetime,
      "Digest": digestHeaderValue,
      "Authorization": `hmac username="${clientId}", algorithm="hmac-sha256", headers="date request-line", signature="${signature}"`,
    };

    console.log("MENEMBAK MEKARI DENGAN HEADER DIGEST LENGKAP:", url);

    const mekariResponse = await fetch(url, {
      method: "POST",
      headers: headers,
      body: requestBodyString,
    });

    const responseText = await mekariResponse.text();
    console.log("Mekari Response Status:", mekariResponse.status);
    console.log("Mekari Response Body:", responseText);

    let data;
    try {
      data = JSON.parse(responseText);
    } catch {
      data = { rawText: responseText };
    }

    if (!mekariResponse.ok) {
      return NextResponse.json({
        success: false,
        error: `Mekari HTTP ${mekariResponse.status}: ${JSON.stringify(data)}`,
      }, { status: mekariResponse.status });
    }

    return NextResponse.json({ success: true, data });

  } catch (err: any) {
    console.error("Internal Server Error:", err);
    return NextResponse.json({
      success: false,
      error: "Gagal Total: " + (err.message || "Terjadi kesalahan internal"),
    }, { status: 500 });
  }
}