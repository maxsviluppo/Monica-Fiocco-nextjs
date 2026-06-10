import { put } from "@vercel/blob";
import { NextResponse } from "next/server";

export async function POST(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const filename = searchParams.get("filename");

  if (!filename || !request.body) {
    return NextResponse.json({ error: "Filename o body mancanti" }, { status: 400 });
  }

  try {
    const token = process.env.BLOB_READ_WRITE_TOKEN;
    if (!token) {
      // Fallback per lo sviluppo locale: convertiamo il file in Base64
      const arrayBuffer = await request.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const ext = filename.split(".").pop()?.toLowerCase() || "png";
      const mime = ext === "jpg" || ext === "jpeg" ? "image/jpeg" : `image/${ext}`;
      const base64 = `data:${mime};base64,${buffer.toString("base64")}`;
      return NextResponse.json({ url: base64 });
    }

    // Stream upload directly to Vercel Blob (in produzione)
    const blob = await put(filename, request.body, {
      access: "public",
    });

    return NextResponse.json(blob);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Errore di upload" }, { status: 500 });
  }
}
