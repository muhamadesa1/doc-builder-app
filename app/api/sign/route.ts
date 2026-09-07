import { NextResponse } from "next/server";
import crypto from "crypto";

// Fungsi untuk membuat header HMAC sesuai standar Mekari
function generateMekariHeaders(method: string, pathWithQueryParam: string) {
  const datetime = new Date().toUTCString();
  const requestLine = `${method} ${pathWithQueryParam} HTTP/1.1`;
  const payload = [`date: ${datetime}`, requestLine].join("\n");
  
  const clientSecret = process.env.MEKARI_CLIENT_SECRET || "";
  const clientId = process.env.MEKARI_CLIENT_ID || "";

  // Membuat HMAC-SHA256 signature
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

    // Base URL dan Path Endpoint Mekari Sign (sesuaikan path API eSign/Sign yang valid)
    const baseUrl = process.env.MEKARI_API_BASE_URL || "https://api.mekari.com";
    const path = "/v2/signature/requests"; // atau path endpoint eSign Mekari yang sesuai
    const url = `${baseUrl}${path}`;

    console.log("Mengirim request HMAC ke Mekari:", url);

    // Payload yang dikirim ke Mekari
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

    // Generate header dengan HMAC authentication
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