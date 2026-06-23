import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { error } = await supabase.from("estimate_requests").insert({
      name: data.name,
      email: data.email,
      phone: data.phone,
      garment: data.garment,
      timeline: data.timeline,
      event_date: data.eventDate,
      details: data.details,
      photo_note: data.photoNote,
      status: "new",
    });

    if (error) {
      console.error(error);
      return NextResponse.json(
        { success: false, message: "Database error." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Estimate request saved.",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Something went wrong." },
      { status: 500 }
    );
  }
}