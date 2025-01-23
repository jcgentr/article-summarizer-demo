"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

export async function login(
  prevState: {
    message: string;
  },
  formData: FormData
) {
  console.log("logging in...");
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const { error } = await supabase.auth.signInWithPassword({
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  });

  if (error) {
    console.error(error);
    return { message: `${error.message}` };
  }

  console.log("logged in successfully");
  revalidatePath("/", "layout");
  redirect("/");
}
