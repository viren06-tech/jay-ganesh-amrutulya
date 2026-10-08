import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";

const secret = new TextEncoder().encode(process.env.AUTH_SECRET);

async function verifyAdmin(request: NextRequest) {
  const token = request.cookies.get("admin_session")?.value;

  if (!token) {
    return false;
  }

  try {
    const { payload } = await jwtVerify(token, secret);

    return payload.role === "owner";
  } catch {
    return false;
  }
}

export async function GET(request: NextRequest) {
  try {
    const isAdmin = await verifyAdmin(request);

    if (!isAdmin) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 }
      );
    }

    const action = request.nextUrl.searchParams.get("action");

    const apiUrl = process.env.GOOGLE_SCRIPT_URL;
    const apiSecret = process.env.GOOGLE_SCRIPT_SECRET;

    if (!apiUrl) {
      return NextResponse.json(
        {
          success: false,
          message: "Google Script URL is not configured.",
        },
        { status: 500 }
      );
    }

    if (!apiSecret) {
      return NextResponse.json(
        {
          success: false,
          message: "Google Script secret is not configured.",
        },
        { status: 500 }
      );
    }

    if (!action) {
      return NextResponse.json(
        {
          success: false,
          message: "Action is required.",
        },
        { status: 400 }
      );
    }

    const response = await fetch(
      `${apiUrl}?action=${encodeURIComponent(
        action
      )}&secret=${encodeURIComponent(apiSecret)}`,
      {
        cache: "no-store",
      }
    );

    const data = await response.json();

    return NextResponse.json(data, {
      status: response.ok ? 200 : response.status,
    });
  } catch (error) {
    console.error("Admin GET API error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to communicate with the business API.",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const isAdmin = await verifyAdmin(request);

    if (!isAdmin) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 }
      );
    }

    const body = await request.json();

    const apiUrl = process.env.GOOGLE_SCRIPT_URL;
    const apiSecret = process.env.GOOGLE_SCRIPT_SECRET;

    if (!apiUrl) {
      return NextResponse.json(
        {
          success: false,
          message: "Google Script URL is not configured.",
        },
        { status: 500 }
      );
    }

    if (!apiSecret) {
      return NextResponse.json(
        {
          success: false,
          message: "Google Script secret is not configured.",
        },
        { status: 500 }
      );
    }

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...body,
        secret: apiSecret,
      }),
    });

    const data = await response.json();

    return NextResponse.json(data, {
      status: response.ok ? 200 : response.status,
    });
  } catch (error) {
    console.error("Admin POST API error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to communicate with the business API.",
      },
      { status: 500 }
    );
  }
}