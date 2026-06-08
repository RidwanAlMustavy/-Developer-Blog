---
title: "Stale-While-Revalidate: Micro-Caching at the Network Edge"
date: "2026-06-08"
category: "DevOps"
excerpt: "How to minimize origin server load and drop TTFB to sub-10ms by leveraging smart edge-runtime caching headers."
---

Delivering dynamic data globally demands caching models that don't compromise freshness. Traditional time-to-live (TTL) architectures force a hard choice: cache aggressively and serve stale data, or cache lightly and risk crashing your database during traffic spikes.

The industry-standard solution is the **Stale-While-Revalidate (SWR)** caching pattern.

### The Lifecycle of an SWR Request

When a client requests a resource at an edge node (Cloudflare, Vercel, or AWS CloudFront), the CDN evaluates the asset's age:

1. **Fresh Window:** If the asset is within its fresh period, it is returned instantly from edge memory.
2. **Stale Window:** If the asset enters the stale window, the CDN immediately serves the cached version to the user (0ms latency), while asynchronously kicking off a hidden request to your origin server to fetch fresh data and update the cache.
3. **Expired Window:** If completely expired, the request waits for the origin server.

### Implementation: The Cache-Control Header

You don't need complex code to implement this; it is managed completely via standard HTTP headers:

```http
Cache-Control: public, max-age=60, s-maxage=300, stale-while-revalidate=86400
```
