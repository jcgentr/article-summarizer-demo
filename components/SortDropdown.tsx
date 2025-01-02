"use client";

import { Check, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Article } from "@/app/(protected)/types";

// Define sort options and their corresponding sort functions
export const SORT_OPTIONS = {
  "Newest first": (articles: Article[]) =>
    [...articles].sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    ),
  "Oldest first": (articles: Article[]) =>
    [...articles].sort(
      (a, b) =>
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
    ),
  "Shortest first": (articles: Article[]) =>
    [...articles].sort((a, b) => (a.word_count || 0) - (b.word_count || 0)),
  "Longest first": (articles: Article[]) =>
    [...articles].sort((a, b) => (b.word_count || 0) - (a.word_count || 0)),
} as const;

// Type for the sort option keys
export type SortOption = keyof typeof SORT_OPTIONS;

interface SortDropdownProps {
  value: SortOption;
  onValueChange: (value: SortOption) => void;
}

export function SortDropdown({ value, onValueChange }: SortDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="bg-background/50 backdrop-blur-sm">
          <span className="text-muted-foreground">Sort by:</span> {value}
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48" align="start">
        <DropdownMenuGroup>
          <DropdownMenuLabel className="text-muted-foreground">
            Date added
          </DropdownMenuLabel>
          <DropdownMenuItem onClick={() => onValueChange("Newest first")}>
            Newest first
            {value === "Newest first" && <Check className="ml-auto h-4 w-4" />}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onValueChange("Oldest first")}>
            Oldest first
            {value === "Oldest first" && <Check className="ml-auto h-4 w-4" />}
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuLabel className="text-muted-foreground">
            Length
          </DropdownMenuLabel>
          <DropdownMenuItem onClick={() => onValueChange("Shortest first")}>
            Shortest first
            {value === "Shortest first" && (
              <Check className="ml-auto h-4 w-4" />
            )}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onValueChange("Longest first")}>
            Longest first
            {value === "Longest first" && <Check className="ml-auto h-4 w-4" />}
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
