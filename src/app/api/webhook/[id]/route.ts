import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: Request) {
  const id = request.url.split("/")[5];

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_KEY!
  );

  const body = await request.json();
  const headers = Object.fromEntries(request.headers.entries());

  console.log("body", body);
  console.log("headers", headers);

  const { data, error } = await supabase
    .from("requests")
    .insert([{ endpoint_id: id, headers, body }])
    .select("*");
  console.log("data", data);
  console.log("error", error);

  return NextResponse.json({ message: "success" }, { status: 200 });
}

export async function GET(request: NextRequest) {
  const id = request.url.split("/")[5];
  console.log("url", request.url);

  console.log("id", id);

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_KEY!
  );

  const { data } = await supabase
    .from("requests")
    .select("*")
    .eq("endpoint_id", id);

  return NextResponse.json(data);
}
