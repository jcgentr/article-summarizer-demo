"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

export async function signup(
  prevState: {
    message: string;
  },
  formData: FormData
) {
  console.log("signing up...");
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const { error } = await supabase.auth.signUp({
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  });

  if (error) {
    console.error(error);
    return { message: `${error.message}` };
  }

  console.log("signed up successfully");
  revalidatePath("/", "layout");
  redirect("/");
}
