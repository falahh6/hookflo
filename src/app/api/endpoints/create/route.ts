import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { userId } = await request.json();
  if (!userId) {
    return NextResponse.json(
      {
        message: "User id is required",
      },
      { status: 400 }
    );
  }

  console.log("userId", userId);

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_KEY!
  );

  console.log("supabase", supabase);

  const endpointId = Date.now();
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();

  console.log("endpointId", endpointId);
  console.log("expiresAt", expiresAt);

  const { data, error } = await supabase
    .from("endpoints")
    .insert([{ id: endpointId, user_id: userId, expires_at: expiresAt }])
    .select("*");

  console.log("data", data);
  console.log("error", error);

  return Response.json({
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/wh/${endpointId}`,
  });
}
