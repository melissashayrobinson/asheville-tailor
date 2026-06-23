import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  if (!req.nextUrl.pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  const authHeader = req.headers.get("authorization");

  if (authHeader) {
    const encoded = authHeader.split(" ")[1];
    const decoded = atob(encoded);

    const [username, password] = decoded.split(":");

    if (
      username === process.env.ADMIN_USERNAME &&
      password === process.env.ADMIN_PASSWORD
    ) {
      return NextResponse.next();
    }
  }

  return new NextResponse("Authentication required", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Admin Area"',
    },
  });
}

export const config = {
  matcher: ["/admin/:path*"],
};