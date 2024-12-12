"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { deleteArticleSummary } from "../app/(protected)/actions";

interface DeleteButtonProps {
  id: number;
}

export function DeleteButton({ id }: DeleteButtonProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteArticleSummary(id);
    } catch (error) {
      console.error("Failed to delete article:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      className="hover:bg-destructive hover:text-destructive-foreground flex items-center gap-1"
      onClick={handleDelete}
      disabled={isDeleting}
    >
      <Trash2 className="h-4 w-4" />
      {isDeleting ? "Deleting..." : "Delete"}
    </Button>
  );
}
