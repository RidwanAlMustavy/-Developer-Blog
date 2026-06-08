---
title: "Shrinking Production Docker Images by 85% via Multi-Stage Builds"
date: "2026-06-01"
category: "DevOps"
excerpt: "A practical guide to stripping out development dependencies, build toolchains, and file headers from your deployment images."
---

Standard container images often ship filled with heavy build packages like compilers, build configs, and package cache files. This inflates image sizes, slows down CI/CD deployments, and introduces unnecessary security vulnerabilities.

**Multi-Stage Builds** solve this by separating your _build environment_ from your _production runtime environment_.

### The Hard Comparison Metrics

```text
Standard Node Image Build:   [████████████████████████████████] 920MB
Multi-Stage Alpine Build:    [████] 82MB
```

The Optimized Production Dockerfile Configuration

# Stage 1: Build compilation workspace

FROM node:20-alpine AS builder
WORKDIR /app
COPY package\*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Clean execution environment

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/package\*.json ./
COPY --from=builder /app/.next ./.next
RUN npm ci --only=production

EXPOSE 3000
CMD ["npm", "start"]
