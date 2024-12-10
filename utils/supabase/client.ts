import config from "@/app/config";
import { createBrowserClient } from "@supabase/ssr";

export const createClient = () =>
  createBrowserClient(config.supabaseUrl, config.supabaseAnonKey);
