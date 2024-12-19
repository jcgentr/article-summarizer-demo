import { createClient } from "@/utils/supabase/server";
import { Article } from "./types";
import { ArticleList } from "@/components/ArticleList";

export const maxDuration = 60; // Applies to the server actions

export default async function Home() {
  const supabase = await createClient();
  const { data: article_summaries } = await supabase
    .from("article_summaries")
    .select() // RLS will automatically filter to current user's summaries
    .order("created_at", { ascending: false });

  const articles: Article[] = article_summaries ?? [];

  return (
    <main className="max-w-2xl mx-auto px-4">
      <h1 className="sr-only">Article Summaries</h1>
      <ArticleList initialArticles={articles} />
    </main>
  );
}
