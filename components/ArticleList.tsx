"use client";

import { Article } from "@/app/(protected)/types";
import { useState } from "react";
import { AddForm } from "./AddForm";
import { ArticleCard } from "./ArticleCard";
import { Input } from "./ui/input";

export function ArticleList({
  initialArticles,
}: {
  initialArticles: Article[];
}) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredArticles = initialArticles.filter((article) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      article.title?.toLowerCase().includes(searchLower) ||
      article.author?.toLowerCase().includes(searchLower)
    );
  });

  return (
    <>
      <div className="sticky top-0 bg-background/80 backdrop-blur-sm z-10 py-8">
        <AddForm />
        <div className="flex mt-4 gap-3 items-baseline">
          <Input
            type="search"
            placeholder="Search articles by title or author..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
          <div className="text-sm text-muted-foreground flex-shrink-0">
            {filteredArticles.length}{" "}
            {filteredArticles.length === 1 ? "article" : "articles"}
          </div>
        </div>
      </div>
      <ul className="flex flex-col gap-4 mb-8">
        {filteredArticles.map((article) => (
          <li key={article.id}>
            <ArticleCard {...article} />
          </li>
        ))}
      </ul>
    </>
  );
}
