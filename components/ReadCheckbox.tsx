"use client";

import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { updateArticleReadStatus } from "../app/(protected)/actions";
import { Label } from "./ui/label";
import { toast } from "sonner";

interface ReadCheckboxProps {
  id: string;
  initialReadStatus: boolean;
}

export function ReadCheckbox({ id, initialReadStatus }: ReadCheckboxProps) {
  const [isRead, setIsRead] = useState(initialReadStatus);

  const handleChange = async (checked: boolean) => {
    setIsRead(checked);
    try {
      const { message } = await updateArticleReadStatus(id, checked);
      toast.success(message);
    } catch (error) {
      console.error("Failed to update read status:", error);
      toast.error("Failed to update read status");
      setIsRead(!checked); // Revert the state if the update fails
    }
  };

  return (
    <div className="flex items-center">
      <Checkbox
        id={`read-${id}`}
        className="mr-2"
        checked={isRead}
        onCheckedChange={handleChange}
      />
      <Label htmlFor={`read-${id}`} className="text-sm">
        Read
      </Label>
    </div>
  );
}
