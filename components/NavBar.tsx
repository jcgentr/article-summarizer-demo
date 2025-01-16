import { User } from "@supabase/supabase-js";
import { ModeToggle } from "./ModeToggle";
import Image from "next/image";
import gistrLogo from "../app/images/icon-32.png";
import Link from "next/link";
import { NavUser } from "./NavUser";

export default async function NavBar({ user }: { user: User }) {
  return (
    <nav className="w-full border-b">
      <div className="flex h-16 items-center justify-between mx-4">
        <Link href="/">
          <h2 className="flex items-center">
            <Image
              src={gistrLogo}
              className="mr-1 flex-shrink-0"
              alt="Gistr Logo"
              width="32"
              height="32"
            />
            <span className="text-2xl font-bold">Gistr</span>
          </h2>
        </Link>
        <div className="flex gap-4">
          <NavUser email={user.email || ""} />
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
}
