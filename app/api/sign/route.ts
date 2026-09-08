import { NextResponse } from "next/server";
import crypto from "crypto";

function generateMekariHmacHeaders(method: string, endpointPath: string) {
  const datetime = new Date().toUTCString();

  // 1. Format Request Line
  const requestLine = `${method} ${endpointPath} HTTP/1.1`;
  
  // 2. Susunan payload HMAC standar Mekari tanpa Digest untuk endpoint file upload/large body
  const payload = [
    `date: ${datetime}`,
    requestLine
  ].join("\n");
  
  const clientSecret = process.env.MEKARI_CLIENT_SECRET || "";
  const clientId = process.env.MEKARI_CLIENT_ID || "";

  // 3. Generate Signature
  const signature = crypto
    .createHmac("SHA256", clientSecret)
    .update(payload)
    .digest("base64");

  return {
    "Accept": "application/json",
    "Content-Type": "application/json",
    "Date": datetime,
    "Authorization": `hmac username="${clientId}", algorithm="hmac-sha256", headers="date request-line", signature="${signature}"`,
  };
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { documentName, signerEmail, signerName, pdfBase64 } = body;

    const baseUrl = "https://sandbox-api.mekari.com";
    const path = "/v2/esign/v1/documents";
    const url = `${baseUrl}${path}`;

    const payloadObj = {
      document_name: documentName,
      signers: [
        {
          name: signerName,
          email: signerEmail,
        },
      ],
      file: pdfBase64,
    };

    const requestBodyString = JSON.stringify(payloadObj);

    // Generate header HMAC murni tanpa Digest header
    const headers = generateMekariHmacHeaders("POST", path);

    console.log("Mengirim HMAC request (tanpa Digest) ke Mekari eSign...");

    const mekariResponse = await fetch(url, {
      method: "POST",
      headers: headers,
      body: requestBodyString,
    });

    const responseText = await mekariResponse.text();
    let data;
    try {
      data = JSON.parse(responseText);
    } catch {
      data = { rawText: responseText };
    }

    if (!mekariResponse.ok) {
      console.error("Respon Error Mekari:", data);
      return NextResponse.json(
        {
          success: false,
          error: `Mekari HTTP ${mekariResponse.status}: ${JSON.stringify(data)}`,
        },
        { status: mekariResponse.status }
      );
    }

    return NextResponse.json({
      success: true,
      data,
    });
  } catch (err: any) {
    console.error("Internal Server Error:", err);
    return NextResponse.json(
      {
        success: false,
        error: "Gagal Total: " + (err.message || "Terjadi kesalahan internal"),
      },
      { status: 500 }
    );
  }
}