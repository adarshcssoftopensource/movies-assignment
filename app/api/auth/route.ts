// app/api/login/route.ts
import { NextResponse } from "next/server";

// Define valid username
const VALID_EMAIL = "opensourcetech47@gmail.com";
const VALID_PASSWORD = "Admin@123#";

// Define the POST route for login
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Check if username matches the static valid username
    if (body.email === VALID_EMAIL && body.password === VALID_PASSWORD) {
      return NextResponse.json({ success: true, message: "Login successful!" });
    } else {
      return NextResponse.json({
        success: false,
        message: "Invalid username.",
        status: 400,
      });
    }
  } catch (error) {
    console.log({ error });

    return NextResponse.json({
      success: false,
      message: "Validation error",
      error,
    });
  }
}


