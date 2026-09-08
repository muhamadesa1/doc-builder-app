import { NextResponse } from "next/server";
import crypto from "crypto";

function generateMekariHmacHeaders(method: string, endpointPath: string, requestBodyString: string) {
  const datetime = new Date().toUTCString();
  
  // 1. Buat SHA-256 Digest dari body request (wajib untuk POST/PUT di Mekari HMAC)
  const bodyHash = crypto.createHash("sha256").update(requestBodyString).digest("base64");
  const digestHeader = `SHA-256=${bodyHash}`;

  // 2. Format Request Line
  const requestLine = `${method} ${endpointPath} HTTP/1.1`;
  
  // 3. Susunan payload HMAC (biasanya menyertakan date dan request-line)
  const payload = [`date: ${datetime}`, requestLine].join("\n");
  
  const clientSecret = process.env.MEKARI_CLIENT_SECRET || "";
  const clientId = process.env.MEKARI_CLIENT_ID || "";

  // 4. Generate Signature
  const signature = crypto
    .createHmac("SHA256", clientSecret)
    .update(payload)
    .digest("base64");

  return {
    "Accept": "application/json",
    "Content-Type": "application/json",
    "Date": datetime,
    "Digest": digestHeader,
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

    // Generate header lengkap dengan Digest & HMAC Signature
    const headers = generateMekariHmacHeaders("POST", path, requestBodyString);

    console.log("Mengirim HMAC request dengan Digest ke Mekari eSign...");

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