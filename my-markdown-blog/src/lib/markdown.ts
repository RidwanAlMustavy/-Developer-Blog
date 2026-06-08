// src/lib/markdown.ts
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import rehypeHighlight from "rehype-highlight";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";

const postsDirectory = path.join(process.cwd(), "content");

export interface Post {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  category: string;
  readingTime: string;
}

// Helper utility to dynamically compute reading times
function calculateReadingTime(text: string): string {
  const wordsPerMinute = 200;
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
}

export function getAllPosts(): Omit<Post, "content">[] {
  if (!fs.existsSync(postsDirectory)) return [];

  const fileNames = fs.readdirSync(postsDirectory);
  const posts = fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);

      return {
        slug,
        title: data.title || "Untitled Article",
        date: data.date || new Date().toISOString(),
        excerpt: data.excerpt || "No description provided.",
        category: data.category || "General",
        readingTime: calculateReadingTime(content),
      };
    });

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    if (!fs.existsSync(fullPath)) return null;

    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    // Dynamic processing sequence
    const processedContent = await unified()
      .use(remarkParse)
      .use(remarkRehype)
      .use(rehypeHighlight)
      .use(rehypeStringify)
      .process(content);

    const contentHtml = processedContent.toString();

    return {
      slug,
      content: contentHtml,
      title: data.title || "Untitled Article",
      date: data.date || new Date().toISOString(),
      excerpt: data.excerpt || "",
      category: data.category || "General",
      readingTime: calculateReadingTime(content),
    };
  } catch {
    return null;
  }
}
