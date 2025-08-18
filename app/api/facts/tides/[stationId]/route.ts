import { NextRequest, NextResponse } from 'next/server';
import { load } from 'cheerio';

interface TideApiPoint {
  time: string;
  value: number;
}

interface ApiSuccess {
  success: true;
  data: TideApiPoint[];
  timestamp: string;
}

interface ApiError {
  success: false;
  error: string;
  timestamp: string;
}

export async function GET(
  request: NextRequest
): Promise<NextResponse<ApiSuccess | ApiError>> {
  const segments = request.nextUrl.pathname.split('/');
  const stationId = segments[4] ?? '';
  const date =
    request.nextUrl.searchParams.get('date') ??
    new Date().toISOString().split('T');

  if (!stationId) {
    return NextResponse.json(
      {
        success: false,
        error: 'No stationId specified',
        timestamp: new Date().toISOString(),
      },
      { status: 400 }
    );
  }

  const url = `https://tides.gc.ca/en/stations/${stationId}?date=${date}`;
  console.log('Fetching tides HTML:', url);

  const res = await fetch(url);
  if (!res.ok) {
    return NextResponse.json(
      {
        success: false,
        error: `Station page error ${res.status}`,
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
  const html = await res.text();

  try {
    const $ = load(html);

    // Find the predictions table by its "Predictions" caption or class
    // The following assumes the table is the first <table> on the page, or you can refine the selector to make it more precise:
    const points: TideApiPoint[] = [];

    // Look for the table whose header or caption contains "Predictions"
    // If needed, right-click on the table in DevTools and "Copy selector" to get an even more robust selector.
    const predictionsTable = $('caption:contains("Predictions")').closest('table');

    predictionsTable.find('tbody tr').each((_, tr) => {
      const td = $(tr).find('td');
      if (td.length < 2) return; // skip bad lines

      const dateTimeText = $(td[0]).text().trim();      // e.g. "2025-08-19 01:00 PDT"
      const valueText = $(td[1]).text().trim();         // e.g. "4.123"
      const value = parseFloat(valueText);

      // Only include if both parsed
      if (dateTimeText && !isNaN(value)) {
        // Optionally: Convert to ISO string if you want
        // If timezone always present, you could also parse exactly.
        const time = new Date(dateTimeText).toISOString();
        points.push({ time, value });
      }
    });

    if (points.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: 'No tide data found in predictions table',
          timestamp: new Date().toISOString(),
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: points,
        timestamp: new Date().toISOString(),
      },
      { status: 200 }
    );
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Parse error';
    return NextResponse.json(
      { success: false, error: message, timestamp: new Date().toISOString() },
      { status: 500 }
    );
  }
}