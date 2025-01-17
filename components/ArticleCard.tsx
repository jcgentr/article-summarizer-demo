import { Clock, FileText, LinkIcon, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DeleteButton } from "./DeleteButton";
import { ReadCheckbox } from "./ReadCheckbox";
import { Article } from "../app/(protected)/types";
import { Rating } from "./Rating";
import * as motion from "motion/react-client";
import { AnimatePresence } from "motion/react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

export function ArticleCard({
  id,
  title,
  author,
  summary,
  word_count,
  read_time,
  url,
  has_read,
  rating,
  tags,
  handleTagClick,
}: Article & {
  handleTagClick: (tag: string) => void;
}) {
  const formattedTags = tags?.split(",").map((tag, index) => (
    <span
      key={index}
      onClick={() => handleTagClick(tag.trim())}
      className="text-sm cursor-pointer hover:underline bg-secondary/70 hover:bg-secondary/90 transition-colors px-3 py-1 rounded-full"
    >
      {tag.trim()}
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
        <Accordion type="single" collapsible defaultValue="item-1">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-base pt-0">
              Summary
            </AccordionTrigger>
            <AccordionContent>
              <p className="text-muted-foreground text-base leading-relaxed">
                {summary}
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <div className="flex flex-wrap gap-3">
          <Badge
            variant="secondary"
            className="flex items-center gap-1 px-4 py-2"
          >
            <FileText className="h-4 w-4" />
            {word_count.toLocaleString("en-US")} words
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
        <div className="text-muted-foreground flex gap-2 flex-wrap">
          {formattedTags}
        </div>
      </CardContent>
    </Card>
  );
}
