// src/types/blog.types.ts

export interface BlogPost {
  id: string;
  title: string;
  author: string;
  date: string;
  excerpt: string;
  image: string;
  category: string;
  read_time: string;
  content: string;
  slug: string;
  is_published: boolean;
  view_count: number;
  created_at: string;
  updated_at: string;
}

export interface BlogPostCreate {
  title: string;
  author: string;
  date: string;
  excerpt: string;
  image: string;
  category: string;
  read_time: string;
  content: string;
  slug: string;
  is_published?: boolean;
}

export interface BlogPostUpdate extends Partial<BlogPostCreate> {
  id: string;
}
