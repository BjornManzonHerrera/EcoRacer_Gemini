export type ViewState = 'DASHBOARD' | 'MAP_RACE' | 'LEADERBOARD' | 'PROFILE' | 'AI_COACH';

export type TransportMode = 'WALK' | 'BIKE' | 'EV' | 'TRANSIT';

export interface UserStats {
  totalPoints: number;
  co2SavedKg: number;
  racesCompleted: number;
  currentStreak: number;
}

export interface LeaderboardEntry {
  id: string;
  rank: number;
  username: string;
  points: number;
  avatar: string;
  change: 'up' | 'down' | 'same';
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  rewardPoints: number;
  progress: number;
  total: number;
  icon: string;
}

export interface SafeZone {
  id: string;
  name: string;
  type: 'park' | 'track' | 'lane';
  lat: number;
  lng: number;
  difficulty: 'easy' | 'medium' | 'hard';
}