export interface Article {
  id: string;
  url: string;
  summary: string;
  tags: string | null;
  author: string | null;
  title: string;
  word_count: number;
  read_time: number;
  has_read: boolean;
  rating: number | null;
  created_at: string;
  updated_at: string;
}
