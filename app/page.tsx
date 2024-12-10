import { createClient } from "@/utils/supabase/server";
import { AddForm } from "./AddForm";
import { ArticleCard } from "./ArticleCard";
import { Article } from "./types";

export default async function Home() {
  const supabase = await createClient();
  const { data: article_summaries } = await supabase
    .from("article_summaries")
    .select();

  const articles: Article[] = article_summaries ?? [];

  const sortedArticles = articles.sort((a, b) => {
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });

  return (
    <main className="max-w-4xl mx-auto px-4">
      <h1 className="sr-only">Article Summaries</h1>
      <div className="sticky top-0 bg-background/80 backdrop-blur-sm z-10 py-8">
        <AddForm />
      </div>
      <ul className="flex flex-col gap-4 mb-8">
        {sortedArticles.map((article) => (
          <li key={article.id}>
            <ArticleCard {...article} />
          </li>
        ))}
      </ul>
    </main>
  );
}
