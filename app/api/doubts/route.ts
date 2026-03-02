import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const GOOGLE_APPS_SCRIPT_URL = process.env.NEXT_PUBLIC_DOUBTS_SCRIPT_URL || '';

export async function GET() {
  try {
    if (!GOOGLE_APPS_SCRIPT_URL) {
      return NextResponse.json({ 
        success: false, 
        error: 'Google Apps Script URL not configured',
        data: []
      });
    }

    const urlWithTimestamp = `${GOOGLE_APPS_SCRIPT_URL}?t=${Date.now()}`;
    const response = await fetch(urlWithTimestamp, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching doubts:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to fetch doubts',
      data: []
    });
  }
}

export async function POST(request: Request) {
  try {
    if (!GOOGLE_APPS_SCRIPT_URL) {
      return NextResponse.json({ 
        success: false, 
        error: 'Google Apps Script URL not configured'
      });
    }

    const body = await request.json();
    
    const response = await fetch(GOOGLE_APPS_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error submitting doubt:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to submit doubt'
    });
  }
}
