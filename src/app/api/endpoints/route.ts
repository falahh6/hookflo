import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const userId = new URL(request.url).searchParams.get("user_id");

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_KEY!
  );

  const { data, error } = await supabase
    .from("endpoints")
    .select("*")
    .eq("user_id", userId);

  console.log("data", data);
  console.log("error", error);

  return NextResponse.json(data);
}
