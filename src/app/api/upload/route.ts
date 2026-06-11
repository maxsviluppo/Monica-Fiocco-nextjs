import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function POST(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const filename = searchParams.get("filename");

  if (!filename || !request.body) {
    return NextResponse.json({ error: "Filename o body mancanti" }, { status: 400 });
  }

  try {
    // Convert request body stream to buffer
    const arrayBuffer = await request.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    // Create a unique filename to avoid overwrites
    const fileExt = filename.split(".").pop() || "jpg";
    const uniqueFilename = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;

    // Upload directly to Supabase Storage bucket named "articles"
    const { data, error } = await supabase.storage
      .from("articles")
      .upload(uniqueFilename, buffer, {
        contentType: request.headers.get("content-type") || "image/jpeg",
        cacheControl: "3600",
        upsert: false
      });

    if (error) {
      throw error;
    }

    // Retrieve the public URL for the uploaded file
    const { data: publicUrlData } = supabase.storage
      .from("articles")
      .getPublicUrl(uniqueFilename);

    return NextResponse.json({ url: publicUrlData.publicUrl });
  } catch (error: any) {
    console.error("Supabase storage upload error:", error);
    return NextResponse.json({ error: error.message || "Errore di upload" }, { status: 500 });
  }
}
