export interface Article {
  url: string;
  summary: string;
  tags: string | null;
  author: string | null;
  title: string;
  word_count: number;
  has_read: boolean;
  rating: number | null;
  created_at: string;
  updated_at: string;
  id: string;
}
