export interface Stats {
  mehr: number;
  hamjihatlik: number;
  hurmat: number;
  obodlik: number;
  ishonch: number;
}

export interface StatEffects {
  mehr?: number;
  hamjihatlik?: number;
  hurmat?: number;
  obodlik?: number;
  ishonch?: number;
}

export interface Choice {
  id: string;
  letter: string;
  text: string;
  feedback: string;
  effects: StatEffects;
}

export interface Scene {
  id: string;
  stage_number: int_or_number;
  title: string;
  location_id: string;
  location_name: string;
  time_of_day: string;
  situation: string;
  question: string;
  dialogue_lore?: string | null;
  lore_author?: string | null;
  choices: Choice[];
}

type int_or_number = number;

export interface LocationItem {
  id: string;
  name: string;
  icon: string;
  emoji: string;
  x: number;
  y: number;
  description: string;
  unlock_stage: number;
}

export interface NewsItem {
  id: string;
  title: string;
  content: string;
  category: string;
  time_ago: string;
  icon: string;
}

export interface CommunityProfile {
  id: string;
  title: string;
  tagline: string;
  description: string;
  icon: string;
  badge_color: string;
  primary_stat: string;
}

export interface CommunityHistoryItem {
  id: string;
  player_name: string;
  finished_at: string;
  profile_id: string;
  profile_title: string;
  profile_desc: string;
  stats: Stats;
}

export type ScreenType = 'start' | 'name' | 'game' | 'result' | 'cinematic';
