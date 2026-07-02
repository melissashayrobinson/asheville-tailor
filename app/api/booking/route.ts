import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const resend = new Resend(process.env.RESEND_API_KEY);

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

    const emailResult = await resend.emails.send({
      from: "The Asheville Tailor <bookings@bookings.ashevilletailor.com>",
      replyTo: "bookings@ashevilletailor.com",
      to: process.env.BOOKING_NOTIFICATION_EMAIL!,
      subject: `New Booking Request — ${formData.get("garment") || "Garment"}`,
      html: `
        <h2>New booking request</h2>
        <p><strong>Name:</strong> ${formData.get("name") || ""}</p>
        <p><strong>Email:</strong> ${formData.get("email") || ""}</p>
        <p><strong>Phone:</strong> ${formData.get("phone") || ""}</p>
        <p><strong>Garment:</strong> ${formData.get("garment") || ""}</p>
        <p><strong>Timeline:</strong> ${formData.get("timeline") || ""}</p>
        <p><strong>Event date:</strong> ${formData.get("eventDate") || ""}</p>
        <p><strong>Details:</strong><br/>${formData.get("details") || ""}</p>
        <p><strong>Photo notes:</strong><br/>${formData.get("photoNote") || ""}</p>
        <p><strong>Photos:</strong> ${photoUrls.length}</p>
        ${photoUrls.map((url) => `<p><a href="${url}">View photo</a></p>`).join("")}
        <p><a href="https://ashevilletailor.com/admin">View dashboard</a></p>
      `,
    });

    const customerEmail = formData.get("email")?.toString();
    const customerName = formData.get("name")?.toString();
    const garment = formData.get("garment")?.toString();
    const eventDate = formData.get("eventDate")?.toString();

    if (customerEmail) {
      const confirmationResult = await resend.emails.send({
        from: "The Asheville Tailor <bookings@bookings.ashevilletailor.com>",
        to: customerEmail,
        replyTo: "bookings@ashevilletailor.com",
        subject: "We’ve received your booking request.",
        html: `
          <div style="margin:0; padding:0; background:#F5F2EB; color:#1C1B19; font-family:Arial, sans-serif;">
            <div style="max-width:640px; margin:0 auto; padding:48px 24px;">
              <p style="font-size:16px; color:#56634F; margin:0 0 28px;">
                The Asheville Tailor
              </p>

              <h1 style="font-family:Georgia, serif; font-size:42px; line-height:1.1; font-weight:400; margin:0 0 24px;">
                Thank you for reaching out${customerName ? `, ${customerName}` : ""}.
              </h1>

              <p style="font-size:16px; line-height:1.7; color:#3A3732; margin:0 0 32px;">
                We’ve received your booking request and are looking forward to learning more about your project.
              </p>

              <div style="background:#FFFFFF; border-radius:24px; padding:24px; margin:32px 0;">
                <p style="font-size:12px; color:#56634F; margin:0 0 16px;">
                  Booking Details
                </p>

                <p style="font-size:15px; line-height:1.6; margin:0 0 8px;">
                  <strong>Your item:</strong> ${garment || "Not provided"}
                </p>

                <p style="font-size:15px; line-height:1.6; margin:0;">
                  <strong>Event date / deadline:</strong> ${eventDate || "Not provided"}
                </p>
              </div>

              <hr style="border:none; border-top:1px solid #DDD6C8; margin:36px 0;" />

              <h2 style="font-family:Georgia, serif; font-size:28px; font-weight:400; margin:0 0 24px;">
                What Happens Next
              </h2>

              <p style="font-size:15px; line-height:1.7; margin:0 0 20px;">
                <strong>1. Review</strong><br />
                We’ll review your request, timeline, and any photos you shared.
              </p>

              <p style="font-size:15px; line-height:1.7; margin:0 0 20px;">
                <strong>2. Personal Response</strong><br />
                You’ll receive a personal reply with recommendations and next steps.
              </p>

              <p style="font-size:15px; line-height:1.7; margin:0 0 20px;">
                <strong>3. Fitting</strong><br />
                We’ll schedule your fitting at your home or office.
              </p>

              <hr style="border:none; border-top:1px solid #DDD6C8; margin:36px 0;" />

              <p style="font-size:16px; line-height:1.7; color:#3A3732; margin:0 0 24px;">
                Need to add photos or additional details? Simply reply to this email.
              </p>

              <p style="font-size:15px; line-height:1.7; margin:32px 0 0;">
                Warmly,<br />
                The Asheville Tailor
              </p>
            </div>
          </div>
        `,
      });

      if (confirmationResult.error) {
        console.error("Customer confirmation email error:", confirmationResult.error);
      }
    }

    if (emailResult.error) {
      console.error("Resend email error:", emailResult.error);
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