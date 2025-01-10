import { logout } from "@/app/(protected)/actions";
import { Button } from "@/components/ui/button";
import { User } from "@supabase/supabase-js";
import { ModeToggle } from "./ModeToggle";
import Image from "next/image";
import gistrLogo from "../app/images/icon-32.png";

export default async function NavBar({ user }: { user: User }) {
  return (
    <nav className="w-full border-b">
      <div className="flex h-16 items-center justify-between mx-4">
        <h2 className="flex items-center">
          <Image
            src={gistrLogo}
            className="mr-1 flex-shrink-0"
            alt="Gistr Logo"
            width="32"
            height="32"
          />
          <span className="text-2xl">Gistr</span>
        </h2>
        <div className="flex gap-4">
          <div className="hidden md:flex items-center space-x-4">
            <span className="text-sm text-muted-foreground">{user.email}</span>
          </div>
          <ModeToggle />
          <form action={logout}>
            <Button type="submit" variant="outline">
              Log out
            </Button>
          </form>
        </div>
      </div>
    </nav>
  );
}
