---
title: "Building Distributed API Rate Limiters with Redis Token Buckets"
date: "2026-05-26"
category: "Backend"
excerpt: "Protecting open integration endpoints from brute-force scripts and scraping bots using atomic Lua scripts."
---

Unprotected public API endpoints are an easy target for malicious scripts and scrapers. To protect your server resources without adding massive database latency overhead, you can build a high-speed rate limiter using Redis.

The **Token Bucket** algorithm allows for temporary spikes in user traffic while keeping a strict ceiling on overall request volume.

### Atomic Lua Execution Script

When managing distributed request volume, standard read-then-write code flows create dangerous **race conditions**. Using a Redis Lua script ensures the entire evaluation runs as a single, atomic operation:

```lua
local rateLimitKey = KEYS[1]
local allowedRequestLimit = tonumber(ARGV[1])
local expirationWindow = tonumber(ARGV[2])

local currentRequestCount = redis.call("INCR", rateLimitKey)

if currentRequestCount == 1 then
    redis.call("EXPIRE", rateLimitKey, expirationWindow)
end

if currentRequestCount > allowedRequestLimit then
    return 0 -- Request blocked
else
    return 1 -- Request allowed
end
```
