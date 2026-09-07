import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { documentName, signerEmail, signerName, pdfBase64 } = body;

    const apiUrl = process.env.MEKARI_API_URL;
    const clientId = process.env.MEKARI_CLIENT_ID;
    const clientSecret = process.env.MEKARI_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
      return NextResponse.json(
        { error: "Kredensial Mekari API belum diset di .env.local" },
        { status: 500 }
      );
    }

    // Tembak API Mekari Sign
    const response = await fetch(`${apiUrl}/signature/requests`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Basic " + Buffer.from(`${clientId}:${clientSecret}`).toString("base64"),
      },
      body: JSON.stringify({
        document: {
          name: documentName,
          file: pdfBase64,
        },
        signers: [
          {
            name: signerName,
            email: signerEmail,
            order: 1,
          },
        ],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Gagal membuat request tanda tangan di Mekari.");
    }

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}