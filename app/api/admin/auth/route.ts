import { NextResponse } from "next/server";
import {
  adminSessionCookieName,
  adminSessionDurationSeconds,
  createAdminSessionToken,
  hasValidAdminSession,
  isAdminAuthConfigured,
  verifyAdminCredentials
} from "@/lib/admin/session";

export async function GET(request: Request) {
  const email = process.env.ADMIN_EMAIL?.trim();
  if (!email || !hasValidAdminSession(request)) {
    return NextResponse.json({ message: "Not authenticated." }, { status: 401 });
  }

  return NextResponse.json({
    user: { email, name: process.env.ADMIN_NAME?.trim() || "Abena Hair Studio" }
  });
}

export async function POST(request: Request) {
  if (!isAdminAuthConfigured()) {
    return NextResponse.json(
      { message: "Admin authentication is not configured on the server." },
      { status: 503 }
    );
  }

  let credentials: { email?: unknown; password?: unknown };
  try {
    credentials = await request.json();
  } catch {
    return NextResponse.json({ message: "Invalid request." }, { status: 400 });
  }

  if (
    typeof credentials.email !== "string" ||
    typeof credentials.password !== "string" ||
    !verifyAdminCredentials(credentials.email, credentials.password)
  ) {
    return NextResponse.json(
      { message: "Invalid email or password." },
      { status: 401 }
    );
  }

  const response = NextResponse.json({
    user: {
      email: process.env.ADMIN_EMAIL?.trim(),
      name: process.env.ADMIN_NAME?.trim() || "Abena Hair Studio"
    }
  });
  response.cookies.set(adminSessionCookieName, createAdminSessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: adminSessionDurationSeconds
  });
  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set(adminSessionCookieName, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 0
  });
  return response;
}