import { NextResponse } from "next/server";
import crypto from "crypto";

function generateMekariHmacHeaders(method: string, endpointPath: string, requestBodyString: string) {
  const datetime = new Date().toUTCString();
  
  const bodyHash = crypto.createHash("sha256").update(requestBodyString).digest("base64");
  const digestHeader = `SHA-256=${bodyHash}`;

  const requestLine = `${method} ${endpointPath} HTTP/1.1`;
  
  const payload = [
    `date: ${datetime}`,
    `digest: ${digestHeader}`,
    requestLine
  ].join("\n");
  
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
    "Digest": digestHeader,
    "Authorization": `hmac username="${clientId}", algorithm="hmac-sha256", headers="date digest request-line", signature="${signature}"`,
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
    const headers = generateMekariHmacHeaders("POST", path, requestBodyString);

    console.log("Client ID yang digunakan:", process.env.MEKARI_CLIENT_ID ? "Terbaca (Panjang: " + process.env.MEKARI_CLIENT_ID.length + ")" : "KOSONG!");

    const mekariResponse = await fetch(url, {
      method: "POST",
      headers: headers,
      body: requestBodyString,
    });

    const responseText = await mekariResponse.text();
    console.log("Raw Response dari Mekari:", responseText);

    if (!mekariResponse.ok) {
      return NextResponse.json(
        {
          success: false,
          error: `Mekari [${mekariResponse.status}]: ${responseText}`,
        },
        { status: mekariResponse.status }
      );
    }

    let data;
    try {
      data = JSON.parse(responseText);
    } catch {
      data = { rawText: responseText };
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