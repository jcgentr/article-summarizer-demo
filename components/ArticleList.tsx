"use client";

import { Article } from "@/app/(protected)/types";
import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { AddForm } from "./AddForm";
import { ArticleCard } from "./ArticleCard";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export function ArticleList({
  initialArticles,
}: {
  initialArticles: Article[];
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [showScrollTop, setShowScrollTop] = useState(false);

  const filteredArticles = initialArticles.filter((article) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      article.title?.toLowerCase().includes(searchLower) ||
      article.author?.toLowerCase().includes(searchLower)
    );
  });

  useEffect(() => {
    const handleScroll = () => {
      // Show button when user scrolls down 400px
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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

      {showScrollTop && (
        <Button
          onClick={scrollToTop}
          className="fixed bottom-6 right-4 md:bottom-12 md:right-16 rounded-full p-3 h-auto"
          size="icon"
          aria-label="Scroll to top"
        >
          <ArrowUp className="h-4 w-4" />
        </Button>
      )}
    </>
  );
}
