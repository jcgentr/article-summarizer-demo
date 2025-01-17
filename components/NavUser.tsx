"use client";

import { CreditCard, LogOut, Sparkles, User } from "lucide-react";
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
import { logout } from "@/app/(protected)/actions";
import { PlanType } from "@/app/(protected)/types";

interface NavUserProps {
  email: string;
  planType: PlanType;
  summariesGenerated: number;
  summaryLimit: number;
}

export function NavUser({
  email,
  planType,
  summariesGenerated,
  summaryLimit,
}: NavUserProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <User className="h-5 w-5 flex-shrink-0" />
          <span className="hidden sm:inline truncate">{email}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg">
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
            <User className="h-5 w-5 mr-2 flex-shrink-0" />
            <span className="truncate">{email}</span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuLabel className="px-2 py-1.5">
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Plan</span>
              <span className="text-sm font-medium">
                {planType === "free" ? "Free" : "Pro"}
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
        {planType === "free" && (
          <>
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Sparkles className="h-5 w-5 mr-2" />
                Upgrade to Pro
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
          </>
        )}
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <CreditCard className="h-5 w-5 mr-2" />
            Billing
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <form action={logout}>
          <DropdownMenuItem
            asChild
            onSelect={(e) => {
              e.preventDefault();
            }}
          >
            <button className="w-full">
              <LogOut className="h-5 w-5 mr-2" />
              Log out
            </button>
          </DropdownMenuItem>
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
