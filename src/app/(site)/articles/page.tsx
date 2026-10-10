import type { Metadata } from "next";
import { getArticles } from "@/services/articles.service";
import { ArticleList } from "@/features/articles";
import { FIXED_LABELS } from "@/config/copy";

export const metadata: Metadata = {
  title: FIXED_LABELS.PAGE_ARTICLES_TITLE,
  description: FIXED_LABELS.PAGE_ARTICLES_DESC,
};

export default async function ArticlesPage() {
  const articles = await getArticles();

  return (
    <main>
      <ArticleList articles={articles} />
    </main>
  );
}
