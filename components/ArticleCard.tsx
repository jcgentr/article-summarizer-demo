import { Clock, FileText, LinkIcon, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DeleteButton } from "./DeleteButton";
import { ReadCheckbox } from "./ReadCheckbox";
import { Article } from "../app/(protected)/types";
import { Rating } from "./Rating";
import * as motion from "motion/react-client";
import { AnimatePresence } from "motion/react";

export function ArticleCard({
  id,
  title,
  author,
  summary,
  word_count,
  url,
  has_read,
  rating,
  tags,
  handleTagClick,
}: Article & {
  handleTagClick: (tag: string) => void;
}) {
  const read_time = Math.ceil(word_count / 238); // Assuming 238 words per minute reading speed for adults reading non-fiction

  const formattedTags = tags.split(",").map((tag, index, array) => (
    <span key={index}>
      <span
        onClick={() => handleTagClick(tag.trim())}
        className="cursor-pointer hover:underline"
      >
        #{tag.trim()}
      </span>
      {index !== array.length - 1 && <span>, </span>}
    </span>
  ));

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            {title}
          </a>
        </CardTitle>
        {author && (
          <p className="pt-2 text-sm text-muted-foreground flex items-center gap-1">
            <User className="h-4 w-4" />
            {author}
          </p>
        )}
      </CardHeader>
      <CardContent className="space-y-6">
        <p className="text-muted-foreground">{summary}</p>
        <div className="flex flex-wrap gap-3">
          <Badge
            variant="secondary"
            className="flex items-center gap-1 px-4 py-2"
          >
            <FileText className="h-4 w-4" />
            {word_count} words
          </Badge>
          <Badge
            variant="secondary"
            className="flex items-center gap-1 px-4 py-2"
          >
            <Clock className="h-4 w-4" />
            {read_time} min read
          </Badge>
        </div>
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-blue-500 hover:underline whitespace-nowrap"
          >
            <LinkIcon className="h-4 w-4 mr-1 flex-shrink-0" />
            Read full article
          </a>
          <div className="flex items-center gap-4 justify-end">
            <AnimatePresence>
              {has_read && (
                <motion.div
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 50, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  <Rating id={id} initialRating={rating} />
                </motion.div>
              )}
            </AnimatePresence>
            <ReadCheckbox id={id} initialReadStatus={has_read} />
            <DeleteButton id={id} />
          </div>
        </div>
        <div className="text-muted-foreground">{formattedTags}</div>
      </CardContent>
    </Card>
  );
}
