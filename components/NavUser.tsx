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

export function NavUser({ email }: { email: string }) {
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
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Sparkles className="h-5 w-5 mr-2" />
            Upgrade to Pro
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
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
