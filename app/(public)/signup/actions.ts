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
  const plan = formData.get("plan") as string | undefined;
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

  // Redirect to login with plan parameter if pro plan was selected
  if (plan === "pro") {
    redirect("/login?plan=pro");
  }

  redirect("/");
}
