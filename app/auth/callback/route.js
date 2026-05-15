import { NextResponse } from "next/server";
import { getAppUrl } from "@/utils/url";

 const isProd = process.env.NEXT_PUBLIC_APP_ENV === "production";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");
  console.log("=============", token);

  if (!token) {
    return NextResponse.redirect(getAppUrl(req, "/login"));
  }

  let accessToken = null;
  try {
    const payload = JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());
    accessToken = payload.access_token;
    console.log("Decoded callback payload:", payload);
  } catch (error) {
    console.error("Failed to decode callback token:", error);
  }

  const response = NextResponse.redirect("http://localhost:3000/dashboard");

  response.cookies.set({
    name: "agent_token",
    value: token,
    httpOnly: true,
    secure: isProd,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24, // 1 day
  });

  if (accessToken) {
    response.cookies.set({
      name: "access_token",
      value: accessToken,
      httpOnly: true,
      secure: isProd,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24, // 1 day
    });
  }

  return response;
}
