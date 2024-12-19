"use server";

import { Readability } from "@mozilla/readability";
import { JSDOM } from "jsdom";
import { ArticlePost } from "./types";
import { revalidatePath } from "next/cache";
import { createClient } from "@/utils/supabase/server";
import { generateSummary } from "@/lib/ai";
import { redirect } from "next/navigation";

export async function createArticleSummary(
  prevState: {
    message: string;
  },
  formData: FormData
) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      throw new Error("User must be logged in to create summaries");
    }

    const url = formData.get("url") as string;
    const response = await fetch(url);
    const html = await response.text();

    const doc = new JSDOM(html, { url });
    const reader = new Readability(doc.window.document);
    const article = reader.parse();

    if (!article) {
      throw new Error("Failed to parse article");
    }

    const wordCount = article.textContent.trim().split(/\s+/).length;
    const cleanContent = article.textContent.replace(/\s+/g, " ").trim();
    const result = await generateSummary(cleanContent);

    const data: ArticlePost = {
      title: article.title,
      author: article.byline,
      content: cleanContent,
      word_count: wordCount,
      summary: result.summary,
      tags: result.tags,
      url,
    };

    console.log(data);

    const { error } = await supabase
      .from("article_summaries")
      .insert({ ...data, user_id: user.id });

    if (error) {
      throw new Error(`Supabase error: ${error.message}`);
    }

    revalidatePath("/");
    return { message: "Added article summary" };
  } catch (error) {
    console.error(error);
    return { message: "Failed to create article summary" };
  }
}

export async function deleteArticleSummary(id: number) {
  try {
    const supabase = await createClient();
    const { error } = await supabase
      .from("article_summaries")
      .delete()
      .eq("id", id);

    if (error) {
      throw new Error(`Supabase error: ${error.message}`);
    }

    revalidatePath("/");
    return { message: "Article summary deleted successfully" };
  } catch (error) {
    console.error(error);
    return { message: "Failed to delete article summary" };
  }
}

export async function updateArticleReadStatus(id: number, isRead: boolean) {
  try {
    const supabase = await createClient();
    const { error } = await supabase
      .from("article_summaries")
      .update({ has_read: isRead })
      .eq("id", id);

    if (error) {
      throw new Error(`Supabase error: ${error.message}`);
    }

    revalidatePath("/");
    return { message: "Article read status updated successfully" };
  } catch (error) {
    console.error(error);
    throw new Error("Failed to update article read status");
  }
}

export async function updateArticleRating(id: number, rating: number) {
  try {
    const supabase = await createClient();
    const { error } = await supabase
      .from("article_summaries")
      .update({ rating })
      .eq("id", id);

    if (error) {
      throw new Error(`Supabase error: ${error.message}`);
    }

    revalidatePath("/");
    return { message: "Article rating updated successfully" };
  } catch (error) {
    console.error(error);
    throw new Error("Failed to update article rating");
  }
}

export async function logout() {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("Error logging out:", error);
    throw new Error("Failed to log out");
  }

  revalidatePath("/");
  redirect("/login");
}
