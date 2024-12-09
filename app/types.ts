export interface Article {
  url: string;
  content: string;
  summary: string;
  tags: string;
  author: string | null;
  title: string | null;
  word_count: number;
  has_read: boolean;
  rating: number | null;
  created_at: string;
  updated_at: string;
  id: number;
}

export interface ArticlePost {
  url: string;
  content: string;
  author: string;
  title: string;
  word_count: number;
}
