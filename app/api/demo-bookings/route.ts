import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const backendUrl = process.env.DEMO_API_URL

  if (!backendUrl) {
    return NextResponse.json(
      { message: 'DEMO_API_URL is not configured.' },
      { status: 500 },
    )
  }

  try {
    const response = await fetch(backendUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: await request.text(),
      cache: 'no-store',
    })

    const body = await response.text()

    return new NextResponse(body, {
      status: response.status,
      headers: {
        'Content-Type': response.headers.get('Content-Type') ?? 'application/json',
        'X-Booking-Upstream-Status': String(response.status),
      },
    })
  } catch {
    return NextResponse.json(
      { message: 'The booking service is unavailable. Check DEMO_API_URL and the backend server.' },
      { status: 502 },
    )
  }
}