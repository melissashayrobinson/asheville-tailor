import { NextResponse } from "next/server";

const MARSHALL_NC = {
  lat: 35.7973,
  lng: -82.6840,
};

function milesBetween(
  a: { lat: number; lng: number },
  b: { lat: number; lng: number }
) {
  const R = 3958.8;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLng = ((b.lng - a.lng) * Math.PI) / 180;

  const lat1 = (a.lat * Math.PI) / 180;
  const lat2 = (b.lat * Math.PI) / 180;

  const x =
    Math.sin(dLat / 2) ** 2 +
    Math.sin(dLng / 2) ** 2 * Math.cos(lat1) * Math.cos(lat2);

  return 2 * R * Math.asin(Math.sqrt(x));
}

export async function POST(request: Request) {
  try {
    const { zip } = await request.json();

    if (!zip || !/^\d{5}$/.test(zip)) {
      return NextResponse.json(
        { success: false, message: "Please enter a valid 5-digit ZIP code." },
        { status: 400 }
      );
    }

    const res = await fetch(`https://api.zippopotam.us/us/${zip}`);

    if (!res.ok) {
      return NextResponse.json(
        { success: false, message: "We could not verify that ZIP code." },
        { status: 404 }
      );
    }

    const data = await res.json();
    const place = data.places?.[0];

    const location = {
      lat: Number(place.latitude),
      lng: Number(place.longitude),
    };

    const distance = milesBetween(MARSHALL_NC, location);
    const inRange = distance <= 50;

    return NextResponse.json({
      success: true,
      inRange,
      distance: Math.round(distance),
      city: place["place name"],
      state: place["state abbreviation"],
    });
  } catch {
    return NextResponse.json(
      { success: false, message: "Something went wrong." },
      { status: 500 }
    );
  }
}