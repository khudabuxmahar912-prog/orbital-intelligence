import { NextRequest, NextResponse } from 'next/server';
import { liveLocationEngine } from '../../../src/lib/liveLocationStore';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const viewerToken = searchParams.get('viewerToken') || 'team-default';

  liveLocationEngine.cleanupExpired();
  const activeLocations = liveLocationEngine.getAuthorizedLocations(viewerToken);

  return NextResponse.json(activeLocations);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { sessionId, userId, displayName, lat, lng, accuracy, durationMinutes, authorizedViewers } = body;

    if (!sessionId || lat === undefined || lng === undefined) {
      return NextResponse.json({ error: 'Missing required location parameters' }, { status: 400 });
    }

    const session = liveLocationEngine.updateLocation(
      sessionId,
      userId || 'Consenting User',
      displayName || 'Device Marker',
      lat,
      lng,
      accuracy || 10,
      durationMinutes || 60,
      authorizedViewers || ['team-default']
    );

    return NextResponse.json({ success: true, session });
  } catch (err) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json();
    const { sessionId } = body;

    if (!sessionId) {
      return NextResponse.json({ error: 'Missing sessionId' }, { status: 400 });
    }

    liveLocationEngine.stopSharing(sessionId);
    return NextResponse.json({ success: true, message: 'Sharing session revoked' });
  } catch (err) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}