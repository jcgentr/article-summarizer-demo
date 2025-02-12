import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import { PrintableArticle } from "@/components/PrintableArticle";

export default async function name({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const supabase = await createClient();
  const id = (await params).id;

  const { data: article } = await supabase
    .from("articles")
    .select("title, author, formatted_content, published_time")
    .eq("id", id)
    .single();

  if (!article) {
    notFound();
  }

  return (
    <PrintableArticle
      title={article.title}
      author={article.author}
      published_time={article.published_time}
      content={article.formatted_content}
    />
  );
}
