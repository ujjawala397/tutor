import { NextRequest, NextResponse } from "next/server";

type RouteContext = {
  params: Promise<{
    path: string[];
  }>;
};

async function proxyRequest(request: NextRequest, context: RouteContext) {
  const baseBookingUrl = process.env.NEXT_PUBLIC_DEMO_API_URL;
  if (!baseBookingUrl) {
    return NextResponse.json(
      { message: "NEXT_PUBLIC_DEMO_API_URL is not configured." },
      { status: 500 },
    );
  }

  try {
    const { path } = await context.params;
    const backendOrigin = new URL(baseBookingUrl).origin;
    const target = `${backendOrigin}/api/admin/${path.join("/")}${request.nextUrl.search}`;

    const response = await fetch(target, {
      method: request.method,
      headers: {
        cookie: request.headers.get("cookie") || "",
        "content-type": request.headers.get("content-type") || "application/json",
      },
      body:
        request.method === "GET" || request.method === "HEAD"
          ? undefined
          : await request.text(),
      cache: "no-store",
    });

    const body = await response.text();
    const proxied = new NextResponse(body, {
      status: response.status,
      headers: {
        "content-type": response.headers.get("content-type") || "application/json",
      },
    });

    const setCookie = response.headers.get("set-cookie");
    if (setCookie) {
      proxied.headers.set("set-cookie", setCookie);
    }

    return proxied;
  } catch {
    return NextResponse.json(
      { message: "Admin API is unavailable. Please check backend connectivity." },
      { status: 502 },
    );
  }
}

export function GET(request: NextRequest, context: RouteContext) {
  return proxyRequest(request, context);
}

export function POST(request: NextRequest, context: RouteContext) {
  return proxyRequest(request, context);
}

export function PUT(request: NextRequest, context: RouteContext) {
  return proxyRequest(request, context);
}

export function PATCH(request: NextRequest, context: RouteContext) {
  return proxyRequest(request, context);
}

export function DELETE(request: NextRequest, context: RouteContext) {
  return proxyRequest(request, context);
}
