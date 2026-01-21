
export type Platform = 'Blog' | 'Instagram' | 'TikTok' | 'YouTube' | 'Twitter';
export type Style = 'Educativo' | 'Humorístico' | 'Inspirador' | 'Informativo';

export interface ContentIdea {
  title: string;
  hook: string;
  description: string;
  hashtags: string[];
}

export interface CalendarDay {
  day: string;
  platform: Platform;
  idea: string;
}

export interface Curiosity {
  title: string;
  fact: string;
  category: 'Marketing' | 'Psicologia' | 'Tendência';
}

export interface GeneratedTemplate {
  imageUrl: string;
  caption: string;
}
