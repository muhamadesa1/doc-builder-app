import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { documentName, signerEmail, signerName, pdfBase64 } = body;

    // Endpoint Mekari Sign Sandbox
    const mekariApiUrl = "https://api-sandbox.mekari.com/v2/signature/requests";
    const clientId = process.env.MEKARI_CLIENT_ID || "";
    const clientSecret = process.env.MEKARI_CLIENT_SECRET || "";

    console.log("Mengirim request ke Mekari Sign:", mekariApiUrl);

    const mekariResponse = await fetch(mekariApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Client-Id": clientId,
        "X-Client-Secret": clientSecret,
      },
      body: JSON.stringify({
        document_name: documentName,
        signers: [
          {
            name: signerName,
            email: signerEmail,
          },
        ],
        file: pdfBase64,
      }),
    });

    const data = await mekariResponse.json();

    if (!mekariResponse.ok) {
      console.error("Respon Error dari Mekari:", data);
      return NextResponse.json(
        {
          success: false,
          error: data.message || data.error || JSON.stringify(data),
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
        error: err.message || "Terjadi kesalahan internal server",
      },
      { status: 500 }
    );
  }
}