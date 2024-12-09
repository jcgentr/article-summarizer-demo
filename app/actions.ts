"use server";

import { Readability } from "@mozilla/readability";
import { JSDOM } from "jsdom";
import { ArticlePost } from "./types";
import { revalidatePath } from "next/cache";
import config from "./config";

export async function createArticleSummary(
  prevState: {
    message: string;
  },
  formData: FormData
) {
  const url = formData.get("url") as string;

  try {
    const response = await fetch(url);
    const html = await response.text();

    const doc = new JSDOM(html, { url });
    const reader = new Readability(doc.window.document);
    const article = reader.parse();

    if (!article) {
      throw new Error("Failed to parse article");
    }

    const cleanContent = article.textContent
      .replace(/\s+/g, " ") // Replace multiple whitespace characters with a single space
      .trim(); // Trim leading and trailing whitespace
    const wordCount = article.textContent.trim().split(/\s+/).length;

    const data: ArticlePost = {
      title: article.title,
      author: article.byline,
      content: cleanContent,
      word_count: wordCount,
      url,
    };

    console.log(data);

    const backendResponse = await fetch(`${config.backendUrl}/summaries/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!backendResponse.ok) {
      throw new Error(`HTTP error! status: ${backendResponse.status}`);
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
    const response = await fetch(`${config.backendUrl}/summaries/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
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
    const response = await fetch(`${config.backendUrl}/summaries/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ has_read: isRead }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
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
    const response = await fetch(`${config.backendUrl}/summaries/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ rating }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    revalidatePath("/");
    return { message: "Article rating updated successfully" };
  } catch (error) {
    console.error(error);
    throw new Error("Failed to update article rating");
  }
}
