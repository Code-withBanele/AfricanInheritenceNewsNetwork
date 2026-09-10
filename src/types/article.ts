export type ContentBlock =
  | string
  | { type: "heading2"; value: string }
  | { type: "heading"; level: number; content: string }
  | { type: "paragraph"; content: string }
  | { type: "image"; value: string; alt?: string; caption?: string }
  | { type: "blockquote"; value: string };

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  publishedAt: string;
  readingTime: string;
  featured: boolean;
  image: string;
  content: ContentBlock[];
}
