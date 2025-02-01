"use client";

import { ArrowUpRight, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { PlanType } from "@/app/(protected)/types";
import Link from "next/link";
import { useThemeShortcut } from "@/lib/hooks/useThemeShortcut";

interface NavUserProps {
  planType: PlanType;
  summariesGenerated: number;
  summaryLimit: number;
}

export function NavUser({
  planType,
  summariesGenerated,
  summaryLimit,
}: NavUserProps) {
  useThemeShortcut();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <User className="h-5 w-5 flex-shrink-0" />
          <span className="hidden sm:inline truncate">Anonymous</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg">
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
            <User className="h-5 w-5 mr-1 flex-shrink-0" />
            <span className="truncate">Anonymous</span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuLabel className="px-2 py-1.5">
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Plan</span>
              <span className="text-sm font-medium">
                {planType === "free" ? "Demo" : "Pro"}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Usage</span>
              <span className="text-sm font-medium">
                {summariesGenerated} / {summaryLimit}
              </span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link
              href="https://app.getgistr.com/"
              className="flex items-center cursor-pointer"
            >
              <ArrowUpRight className="h-5 w-5 mr-1 flex-shrink-0" />
              Go to main app
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
