// src/app/page.tsx
"use client";

import { useEffect, useState } from "react";
import BlogCard from "../components/BlogCard";

interface PostSummary {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  category: string;
  readingTime: string;
}

export default function Home() {
  const [allPosts, setAllPosts] = useState<PostSummary[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/posts")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setAllPosts(data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching posts:", err);
        setLoading(false);
      });
  }, []);

  const categories = [
    "All",
    ...Array.from(new Set(allPosts.map((p) => p.category))),
  ];

  const filteredPosts = allPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="sm:px-8 mt-12 sm:mt-16">
      <div className="mx-auto max-w-5xl lg:px-8">
        <div className="max-w-3xl px-6">
          <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-5xl">
            The Production Logbook.
          </h1>
          <p className="mt-4 text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Highly optimized developer documentation, system layout deep dives,
            and architectural logs.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 items-center">
            <input
              type="text"
              placeholder="Search posts by titles or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-zinc-800 dark:text-zinc-100"
            />
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 py-1 rounded-full text-xs font-medium border transition-all ${
                  selectedCategory === category
                    ? "bg-zinc-900 text-white border-zinc-900 dark:bg-zinc-100 dark:text-zinc-900 dark:border-zinc-100"
                    : "bg-zinc-50 text-zinc-600 border-zinc-200 hover:bg-zinc-100 dark:bg-zinc-900 dark:text-zinc-400 dark:border-zinc-800"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-12 border-t border-zinc-100 dark:border-zinc-800/50 pt-10 px-6">
          <div className="flex max-w-3xl flex-col space-y-10">
            {loading ? (
              <p className="text-zinc-400 font-mono text-sm">
                Hydrating blog indexing trees...
              </p>
            ) : filteredPosts.length === 0 ? (
              <p className="text-zinc-400 dark:text-zinc-500 font-mono text-sm">
                No matching posts found. Try refining your keyword criteria.
              </p>
            ) : (
              filteredPosts.map((post) => (
                <div key={post.slug} className="relative group">
                  <span className="absolute top-0 right-0 inline-flex items-center gap-2 text-xs font-mono text-zinc-400">
                    <span className="px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300">
                      {post.category}
                    </span>
                    <span>•</span>
                    <span>{post.readingTime}</span>
                  </span>
                  <BlogCard {...post} />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
