# ⚡ LOG.IO — Edge-Optimized Developer Logbook

[![Next.js](https://img.shields.io/badge/Next.js-15.0-000000?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

> A blazing fast, beautifully typed, local-first technical blog engine. Built with Next.js App Router, structured with a unified parsing pipeline, and styled strictly to premium developer design aesthetics.

---

## 🎨 Visual Preview & Experience

* **Prismatic Code Highlighting:** Native support for syntax layouts (JavaScript, Python, SQL, Docker, etc.) powered directly by Markdown code blocks.
* **Instant Interactive Filtering:** Zero-latency client-side keyword search queries and dynamic category pill filtering.
* **Dark Mode Aesthetics:** Designed specifically using a clean, accessible monochrome dark grid scheme tailored for engineers.

---

## 🧠 Architectural Flow

To ensure the client UI remains fluid and interactive while still reading secure local file assets, the application decouples data-fetching from rendering tracks entirely:

```text
[Local .md Files] ──> [Unified Parser (Server)] ──> [/api/posts Endpoint] ──> [React State Search Filter (Client Browser)]
