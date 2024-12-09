import { AddForm } from "./AddForm";
import { ArticleCard } from "./ArticleCard";
import config from "./config";
import { Article } from "./types";

export default async function Home() {
  const response = await fetch(
    `${config.backendUrl}/summaries/?offset=0&limit=100`
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const articles: Article[] = await response.json();

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
