"use client";

import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { updateArticleRating } from "../app/(protected)/actions";

interface RatingProps {
  id: number;
  initialRating: number | null;
}

export function Rating({ id, initialRating }: RatingProps) {
  const [rating, setRating] = useState(initialRating);
  const [hover, setHover] = useState(0);
  const [isHoverEnabled, setIsHoverEnabled] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsHoverEnabled(true);
    }, 500); // 500ms delay for motion animation, adjust as needed

    return () => clearTimeout(timer);
  }, []);

  const handleRatingChange = async (newRating: number) => {
    setRating(newRating);
    try {
      await updateArticleRating(id, newRating);
    } catch (error) {
      console.error("Failed to update rating:", error);
      setRating(initialRating); // Revert the state if the update fails
    }
  };

  return (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={cn(
            "h-5 w-5 cursor-pointer",
            star <= (hover || rating || 0)
              ? "text-yellow-400 fill-yellow-400"
              : "text-gray-300"
          )}
          onMouseEnter={() => isHoverEnabled && setHover(star)}
          onMouseLeave={() => isHoverEnabled && setHover(0)}
          onClick={() => handleRatingChange(star)}
        />
      ))}
    </div>
  );
}
