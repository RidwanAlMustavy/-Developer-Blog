// src/app/posts/[slug]/page.tsx
import { getPostBySlug, getAllPosts } from "../../../lib/markdown";
import { notFound } from "next/navigation";
import Link from "next/link";

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post: { slug: string }) => ({
    slug: post.slug,
  }));
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="sm:px-8 mt-16 lg:mt-24">
      <div className="mx-auto max-w-3xl lg:px-8">
        <div className="px-6">
          <Link
            href="/"
            className="group mb-8 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0 text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300 transition"
          >
            <svg
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
              className="h-4 w-4 stroke-current"
            >
              <path
                d="M7.25 11.25 3.75 8m0 0 3.5-3.25M3.75 8h8.5"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>

          <article>
            <header className="flex flex-col">
              <time className="flex items-center text-base text-zinc-400 dark:text-zinc-500">
                <span className="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500 mr-3" />
                {new Date(post.date).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </time>
              <h1 className="mt-6 text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
                {post.title}
              </h1>
            </header>

            <div
              className="mt-8 prose prose-zinc dark:prose-invert max-w-none focus:outline-none tracking-normal text-lg leading-relaxed space-y-6"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </article>
        </div>
      </div>
    </div>
  );
}
