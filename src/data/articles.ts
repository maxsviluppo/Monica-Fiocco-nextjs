export type Article = {
  slug: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  excerpt: string;
  image: string;
  author: string;
  isFeatured: boolean;
  isFavorite: boolean;
  content?: string;
};

export const articles: Article[] = [];

export const articleCategories = ["Tutti"];
