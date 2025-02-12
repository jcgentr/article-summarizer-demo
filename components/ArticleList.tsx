"use client";

import { Article } from "@/app/(protected)/types";
import { useEffect, useMemo, useState } from "react";
import { ArrowUp } from "lucide-react";
import { AddForm } from "./AddForm";
import { ArticleCard } from "./ArticleCard";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { SORT_OPTIONS, SortDropdown, SortOption } from "./SortDropdown";
import FilterDropdown, { FILTER_OPTIONS, FilterId } from "./FilterDropdown";
import { useDebouncedValue } from "@/lib/hooks/useDebouncedValue";

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "auto" });
};

export function ArticleList({
  initialArticles,
}: {
  initialArticles: Article[];
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [sortValue, setSortValue] = useState<SortOption>("Newest first");
  const [selectedFilter, setSelectedFilter] = useState<FilterId>("none");
  const debouncedSearch = useDebouncedValue(searchTerm, 300);

  // First filter
  const searchFilteredArticles = useMemo(
    () =>
      initialArticles.filter((article) => {
        const searchLower = debouncedSearch.toLowerCase();
        return (
          article.title.toLowerCase().includes(searchLower) ||
          article.author?.toLowerCase().includes(searchLower) ||
          article.tags?.toLowerCase().includes(searchLower) ||
          article.url.toLowerCase().includes(searchLower)
        );
      }),
    [initialArticles, debouncedSearch]
  );

  // Then apply selected filter
  const filteredArticles = useMemo(
    () => FILTER_OPTIONS[selectedFilter].filter(searchFilteredArticles),
    [searchFilteredArticles, selectedFilter]
  );

  // Finally sort the filtered results
  const sortedArticles = useMemo(
    () => SORT_OPTIONS[sortValue](filteredArticles),
    [filteredArticles, sortValue]
  );

  useEffect(() => {
    const handleScroll = () => {
      // Show button when user scrolls down 400px
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const articleList = useMemo(
    () => (
      <ul className="flex flex-col gap-4 mb-8">
        {sortedArticles.map((article) => (
          <li key={article.id}>
            <ArticleCard
              {...article}
              handleTagClick={(tag: string) => setSearchTerm(tag)}
            />
          </li>
        ))}
      </ul>
    ),
    [sortedArticles]
  );

  return (
    <>
      <div className="sticky top-0 bg-background/80 backdrop-blur-sm z-10 pt-8 pb-4">
        <AddForm />
        <div className="flex mt-4 gap-3 items-baseline">
          <Input
            type="search"
            placeholder="URL, title, author, or tags..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
          <div className="text-sm text-muted-foreground flex-shrink-0">
            {filteredArticles.length}{" "}
            {filteredArticles.length === 1 ? "article" : "articles"}
          </div>
        </div>
        <div className="mt-4 flex gap-3 flex-wrap">
          <SortDropdown value={sortValue} onValueChange={setSortValue} />
          <FilterDropdown
            value={selectedFilter}
            onValueChange={setSelectedFilter}
          />
        </div>
      </div>

      {sortedArticles.length === 0 ? (
        <p className="text-muted-foreground text-center py-8">
          No articles found
        </p>
      ) : (
        articleList
      )}

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
