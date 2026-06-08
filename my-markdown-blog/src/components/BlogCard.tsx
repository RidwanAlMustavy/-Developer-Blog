// src/components/BlogCard.tsx
import Link from "next/link";

interface BlogCardProps {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
}

export default function BlogCard({
  slug,
  title,
  date,
  excerpt,
}: BlogCardProps) {
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <article className="group relative flex flex-col items-start border-b border-zinc-100 dark:border-zinc-800/50 pb-8 last:border-0">
      <time className="text-sm text-zinc-400 dark:text-zinc-500 mb-2 md:mb-0 block">
        {formattedDate}
      </time>
      <h2 className="text-xl font-semibold tracking-tight text-zinc-800 dark:text-zinc-100 mt-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
        <Link href={`/posts/${slug}`}>
          <span className="absolute -inset-x-4 -inset-y-6 z-0 scale-95 opacity-0 bg-zinc-50/50 dark:bg-zinc-800/20 transition group-hover:scale-100 group-hover:opacity-100 sm:-inset-x-6 rounded-2xl" />
          <span className="relative z-10">{title}</span>
        </Link>
      </h2>
      <p className="relative z-10 mt-3 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed line-clamp-3">
        {excerpt}
      </p>
      <div className="relative z-10 mt-4 flex items-center text-sm font-medium text-blue-600 dark:text-blue-400">
        Read article
        <svg
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
          className="ml-1 h-4 w-4 stroke-current transition group-hover:translate-x-1"
        >
          <path
            d="M6.75 5.75 9.25 8l-2.5 2.25"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </article>
  );
}
