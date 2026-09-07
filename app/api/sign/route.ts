import { NextResponse } from "next/server";
import crypto from "crypto";

function generateMekariHeaders(method: string, endpointPath: string) {
  const datetime = new Date().toUTCString();
  
  // Format Request Line standar: METHOD PATH HTTP/1.1 (contoh: POST /v2/esign/v1/documents HTTP/1.1)
  const requestLine = `${method} ${endpointPath} HTTP/1.1`;
  
  // Susunan payload HMAC sesuai dokumentasi resmi Mekari
  const payload = [`date: ${datetime}`, requestLine].join("\n");
  
  const clientSecret = process.env.MEKARI_CLIENT_SECRET || "";
  const clientId = process.env.MEKARI_CLIENT_ID || "";

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

    const requestBody = {
      document_name: documentName,
      signers: [
        {
          name: signerName,
          email: signerEmail,
        },
      ],
      file: pdfBase64,
    };

    // Panggil fungsi generator header dengan path yang bersih
    const headers = generateMekariHeaders("POST", path);

    const mekariResponse = await fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(requestBody),
    });

    const responseText = await mekariResponse.text();
    let data;
    try {
      data = JSON.parse(responseText);
    } catch {
      data = { rawText: responseText };
    }

    if (!mekariResponse.ok) {
      console.error("Respon Error dari Mekari:", data);
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