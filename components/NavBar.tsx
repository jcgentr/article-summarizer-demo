import { User } from "@supabase/supabase-js";
import { ModeToggle } from "./ModeToggle";
import Image from "next/image";
import gistrLogo from "../app/images/icon-32.png";
import Link from "next/link";
import { NavUser } from "./NavUser";
import { createClient } from "@/utils/supabase/server";
import { SUMMARY_LIMITS } from "@/lib/billing";
import { PlanType, UserMetadata } from "@/app/(protected)/types";

const DEFAULT_USER_METADATA: Pick<
  UserMetadata,
  "plan_type" | "summaries_generated"
> = {
  plan_type: "free",
  summaries_generated: 0,
} as const;

export default async function NavBar({ user }: { user: User }) {
  const supabase = await createClient();
  const { data: userMetadata } = await supabase
    .from("user_metadata")
    .select("plan_type, summaries_generated")
    .eq("user_id", user.id)
    .single();

  const metadata = userMetadata ?? DEFAULT_USER_METADATA;

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
          <NavUser
            planType={metadata.plan_type}
            summariesGenerated={metadata.summaries_generated}
            summaryLimit={SUMMARY_LIMITS[metadata.plan_type as PlanType]}
          />
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
}
