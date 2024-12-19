import { createClient } from "@/utils/supabase/server";
import { AddForm } from "../../components/AddForm";
import { ArticleCard } from "../../components/ArticleCard";
import { Article } from "./types";

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
      <div className="sticky top-0 bg-background/80 backdrop-blur-sm z-10 py-8">
        <AddForm />
      </div>
      <ul className="flex flex-col gap-4 mb-8">
        {articles.map((article) => (
          <li key={article.id}>
            <ArticleCard {...article} />
          </li>
        ))}
      </ul>
    </main>
  );
}
