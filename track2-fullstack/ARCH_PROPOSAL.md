# Architectural Proposal: Eliminate N+1 Query in GET /animals

## Problem
`GET /animals` fires one SQL query to fetch animals, then one additional query
per animal to fetch its latest health event. 50 animals = 51 queries. This
will degrade noticeably as the herd grows.

## Proposed Fix
Replace the per-animal loop with a single query using a LEFT JOIN and a
correlated subquery:

```sql
SELECT
  a.*,
  h.id         AS he_id,
  h.event_type AS he_event_type,
  h.date       AS he_date,
  h.vet_name   AS he_vet_name,
  h.notes      AS he_notes
FROM animals a
LEFT JOIN health_events h ON h.id = (
  SELECT id FROM health_events
  WHERE animal_id = a.id
  ORDER BY date DESC
  LIMIT 1
)
LIMIT ? OFFSET ?
```

The result row is then mapped to reconstruct the `latest_health_event` object
in the same shape the frontend expects, so no frontend changes are needed.

## Why Not Done Now
Scope — the bug fixes and weight feature are the priority. This proposal is
concrete enough that another developer could implement it without clarification.