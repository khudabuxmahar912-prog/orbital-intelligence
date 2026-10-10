export interface LiveLocationSession {
  sessionId: string;
  userId: string;
  displayName: string;
  lat: number;
  lng: number;
  accuracy: number; // in meters
  lastUpdated: number; // UNIX epoch timestamp
  expiresAt: number; // UNIX epoch timestamp
  isSharing: boolean;
  authorizedViewers: string[]; // List of viewer tokens/IDs
}

export interface LocationErrorState {
  code: number;
  message: string;
}

// In-Memory Real-Time Store for Development/Deployment (Can be connected to Redis in prod)
class LiveLocationEngine {
  private sessions: Map<string, LiveLocationSession> = new Map();

  // Register or update a location session
  public updateLocation(
    sessionId: string,
    userId: string,
    displayName: string,
    lat: number,
    lng: number,
    accuracy: number,
    durationMinutes: number = 60,
    authorizedViewers: string[] = []
  ): LiveLocationSession {
    const now = Date.now();
    const existing = this.sessions.get(sessionId);
    const expiresAt = existing ? existing.expiresAt : now + durationMinutes * 60 * 1000;

    const session: LiveLocationSession = {
      sessionId,
      userId,
      displayName,
      lat,
      lng,
      accuracy,
      lastUpdated: now,
      expiresAt,
      isSharing: true,
      authorizedViewers: authorizedViewers.length > 0 ? authorizedViewers : (existing?.authorizedViewers || ['team-default'])
    };

    this.sessions.set(sessionId, session);
    return session;
  }

  // Revoke / Stop Sharing
  public stopSharing(sessionId: string): boolean {
    const session = this.sessions.get(sessionId);
    if (session) {
      session.isSharing = false;
      this.sessions.set(sessionId, session);
      return true;
    }
    return false;
  }

  // Get active authorized location markers for a viewer
  public getAuthorizedLocations(viewerToken: string): LiveLocationSession[] {
    const now = Date.now();
    const activeLocations: LiveLocationSession[] = [];

    this.sessions.forEach((session) => {
      // Check expiration, sharing status, and viewer authorization
      if (
        session.isSharing &&
        session.expiresAt > now &&
        (session.authorizedViewers.includes(viewerToken) || session.authorizedViewers.includes('*'))
      ) {
        activeLocations.push(session);
      }
    });

    return activeLocations;
  }

  // Purge expired sessions
  public cleanupExpired(): void {
    const now = Date.now();
    this.sessions.forEach((session, key) => {
      if (session.expiresAt <= now) {
        this.sessions.delete(key);
      }
    });
  }
}

export const liveLocationEngine = new LiveLocationEngine();