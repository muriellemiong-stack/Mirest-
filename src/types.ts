export type MediaType = 'image' | 'video' | 'interactive' | 'diy';

export type NeonAccent = 'cyan' | 'pink' | 'emerald' | 'amber';

export interface Author {
  name: string;
  avatar: string;
  handle: string;
  verified?: boolean;
}

export interface PinItem {
  id: string;
  title: string;
  category: string;
  type: MediaType;
  mediaUrl: string;
  videoUrl?: string;
  videoPreviewUrl?: string;
  duration?: string;
  height: number;
  author: Author;
  likes: number;
  saves: number;
  commentsCount: number;
  description: string;
  tags: string[];
  link?: string;
  accent?: NeonAccent;
}

export interface FilterOption {
  id: string;
  label: string;
  typeFilter?: MediaType | 'all';
}
