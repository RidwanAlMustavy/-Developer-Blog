// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Modern Engineering Log",
  description: "A cleanly architectural markdown reader layout engine",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className="h-full antialiased selection:bg-blue-500/10 selection:text-blue-500"
    >
      <head>
        {/* Industry Standard CDN delivery for Code Syntax Highlighting styles */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github-dark.min.css"
        />
      </head>
      <body className="flex h-full flex-col bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50">
        <div className="fixed inset-0 flex justify-center sm:px-8">
          <div className="flex w-full max-w-7xl lg:px-8">
            <div className="w-full bg-zinc-50/50 ring-1 ring-zinc-100 dark:bg-zinc-900/20 dark:ring-zinc-300/20" />
          </div>
        </div>
        <div className="relative z-50 flex-none">
          <header className="top-0 z-50 h-16 pt-6 max-w-4xl mx-auto px-6 lg:px-8 flex items-center justify-between">
            <span className="font-mono font-bold tracking-tight text-lg text-zinc-800 dark:text-zinc-200">
              ⚡ Developer Blog
            </span>
          </header>
        </div>
        <div className="relative flex-auto">{children}</div>
      </body>
    </html>
  );
}
