---
title: "Database Performance: When Postgres Indexes Make Queries Slower"
date: "2026-06-05"
category: "Databases"
excerpt: "Investigating index scan performance bottlenecks, write overhead costs, and structural index selection logic."
---

Adding an index to a slow SQL query feels like an automatic fix. However, adding indexes without analyzing database engine query planners can silently destroy your system's write throughput.

### The Write Penalty Matrix

Every time an application executes an `INSERT`, `UPDATE`, or `DELETE` block, PostgreSQL must update the core heap table and rewrite internal reference points across **every single index** bound to that table.

| Operations / Second | No Indexes | 1 Index | 5 Indexes |
| :------------------ | :--------- | :------ | :-------- |
| **Bulk Inserts**    | 45,000     | 28,000  | 9,500     |
| **Point Updates**   | 62,000     | 41,000  | 14,000    |

### Spotting Underutilized Indexes

You can query your engine's systemic metrics schema directly to track down index configurations that consume memory without serving active query operations:

```sql
SELECT
    relname AS table_name,
    indexrelname AS index_name,
    idx_scan AS total_scans_executed
FROM pg_stat_user_indexes
WHERE idx_scan = 0;
```
