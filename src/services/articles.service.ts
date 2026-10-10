import { ARTICLES_DATA, type Article } from "@/data/articles";

/**
 * Service truy xuất dữ liệu bài viết.
 * Trả về Promise để tương thích với kiến trúc chuyển đổi sang NestJS API sau này.
 */
export async function getArticles(): Promise<readonly Article[]> {
  return Promise.resolve(ARTICLES_DATA);
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const article = ARTICLES_DATA.find((a) => a.slug === slug);
  return Promise.resolve(article ?? null);
}
