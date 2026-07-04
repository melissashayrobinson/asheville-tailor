import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const now = new Date().toISOString();

  const { data, error } = await supabase
    .from("availability")
    .select("*")
    .eq("status", "available")
    .gte("start_time", now)
    .order("start_time", { ascending: true });

  if (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Could not load availability." },
      { status: 500 }
    );
  }

  return NextResponse.json({
    success: true,
    slots: data,
  });
}

export async function POST(request: Request) {
  try {
    const { date, startTime, duration, notes } = await request.json();

    const start = new Date(`${date}T${startTime}:00`);
    const end = new Date(start.getTime() + Number(duration) * 60 * 1000);

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { error } = await supabase.from("availability").insert({
      start_time: start.toISOString(),
      end_time: end.toISOString(),
      notes,
      status: "available",
    });

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Could not add availability." },
      { status: 500 }
    );
  }
}