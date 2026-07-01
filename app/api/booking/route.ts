import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const photoUrls: string[] = [];
    const photos = formData.getAll("photos") as File[];

    for (const photo of photos) {
      if (!photo || photo.size === 0) continue;

      const fileExt = photo.name.split(".").pop();
      const fileName = `${crypto.randomUUID()}.${fileExt}`;
      const filePath = `booking-requests/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("estimate-photos")
        .upload(filePath, photo, {
          contentType: photo.type,
        });

      if (uploadError) {
        console.error(uploadError);
        throw uploadError;
      }

      const { data } = supabase.storage
        .from("estimate-photos")
        .getPublicUrl(filePath);

      photoUrls.push(data.publicUrl);
    }

    const { error } = await supabase.from("booking_requests").insert({
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      garment: formData.get("garment"),
      timeline: formData.get("timeline"),
      event_date: formData.get("eventDate"),
      details: formData.get("details"),
      photo_note: formData.get("photoNote"),
      photo_urls: photoUrls,
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
      message: "Booking request saved.",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Something went wrong." },
      { status: 500 }
    );
  }
}