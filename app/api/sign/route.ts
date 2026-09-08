import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(request: Request) {
  try {
    const clientId = process.env.MEKARI_CLIENT_ID || "";
    const clientSecret = process.env.MEKARI_CLIENT_SECRET || "";

    console.log("CHECK ENV VERCEL -> ID Length:", clientId.length, "| Secret Length:", clientSecret.length);

    if (!clientId || !clientSecret) {
      return NextResponse.json({
        success: false,
        error: "Environment Variable MEKARI_CLIENT_ID atau SECRET kosong di server Vercel!",
      }, { status: 400 });
    }

    const body = await request.json();
    const { documentName, signerEmail, signerName, pdfBase64 } = body;

    const baseUrl = "https://sandbox-api.mekari.com";
    const path = "/v2/esign/v1/documents";
    const url = `${baseUrl}${path}`;
    const datetime = new Date().toUTCString();

    const requestLine = `POST ${path} HTTP/1.1`;
    const payload = [`date: ${datetime}`, requestLine].join("\n");
    
    const signature = crypto
      .createHmac("SHA256", clientSecret)
      .update(payload)
      .digest("base64");

    const headers = {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Date": datetime,
      "Authorization": `hmac username="${clientId}", algorithm="hmac-sha256", headers="date request-line", signature="${signature}"`,
    };

    const payloadObj = {
      document_name: documentName,
      signers: [{ name: signerName, email: signerEmail }],
      file: pdfBase64,
    };

    const requestBodyString = JSON.stringify(payloadObj);

    const mekariResponse = await fetch(url, {
      method: "POST",
      headers: headers,
      body: requestBodyString,
    });

    const responseText = await mekariResponse.text();
    console.log("Mekari Response Status:", mekariResponse.status);
    console.log("Mekari Response Body:", responseText);

    if (!mekariResponse.ok) {
      return NextResponse.json({
        success: false,
        error: `Mekari HTTP ${mekariResponse.status}: ${responseText}`,
      }, { status: mekariResponse.status });
    }

    const data = JSON.parse(responseText);
    return NextResponse.json({ success: true, data });

  } catch (err: any) {
    console.error("Internal Server Error:", err);
    return NextResponse.json({
      success: false,
      error: "Gagal Total: " + (err.message || "Terjadi kesalahan internal"),
    }, { status: 500 });
  }
}