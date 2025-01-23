import config from "@/app/config";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createClient(useServiceRole = false) {
  const cookieStore = await cookies();

  const supabaseUrl = config.supabaseUrl;
  const supabaseKey = useServiceRole
    ? config.supabaseServiceRoleKey
    : config.supabaseAnonKey;

  return createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        } catch {
          // The `setAll` method was called from a Server Component.
          // This can be ignored if you have middleware refreshing
          // user sessions.
        }
      },
    },
  });
}
