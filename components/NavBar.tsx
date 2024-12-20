import { logout } from "@/app/(protected)/actions";
import { Button } from "@/components/ui/button";
import { User } from "@supabase/supabase-js";
import { ModeToggle } from "./ModeToggle";

export default async function NavBar({ user }: { user: User }) {
  console.log(user);
  return (
    <nav className="w-full border-b">
      <div className="flex h-16 items-center gap-4 justify-end mr-4">
        <div className="flex items-center space-x-4">
          <span className="text-sm text-muted-foreground">{user.email}</span>
        </div>
        <ModeToggle />
        <form action={logout}>
          <Button type="submit" variant="outline">
            Log out
          </Button>
        </form>
      </div>
    </nav>
  );
}
