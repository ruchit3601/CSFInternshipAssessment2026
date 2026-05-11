# FarmTracker — Code Audit

## Issues Found

### 1. Paddock count desync on animal reassignment [HIGH]
In `PUT /animals/:id`, when an animal is moved to a different paddock, the new
paddock's `animal_count` is incremented but the old paddock's count is never
decremented. Over time this causes `animal_count` to grow past the actual
occupancy, making capacity enforcement meaningless and the displayed counts
wrong.

### 2. No capacity enforcement [HIGH]
Neither `POST /animals` nor `PUT /animals/:id` checks whether the target
paddock is already at capacity before incrementing `animal_count`. A paddock
with capacity 5 will happily accept a 6th, 7th, or 50th animal without error.

### 3. Broken pagination [MEDIUM]
`GET /animals` uses the raw `page` query parameter directly as the SQL OFFSET.
`page=2` produces `OFFSET 2` instead of `OFFSET 20`. Every page after the
first returns wrong results. Fix: use `page * limit` as the offset.

### 4. Wrong status code on animal creation [LOW]
`POST /animals` returns HTTP 200. The REST convention (and the behaviour of
the health-events route in the same file) is 201 Created. Clients that check
status codes will misread this as a non-creation response.

### 5. No capacity validation on paddock creation [LOW]
`POST /paddocks` uses `!capacity` to validate, which rejects 0 but accepts
negative numbers and non-numeric strings. Capacity should be validated as a
positive integer.

## Priority Order

Fix 1 and 2 first — they corrupt data silently. Fix 3 next as it breaks a
core feature. Fixes 4 and 5 are quick and should be done before the weight
feature goes in.

## What I Would Leave for Later

The N+1 query in `GET /animals` (a separate DB call per animal to fetch its
latest health event) is a performance problem but not a correctness bug. I
am addressing it in `ARCH_PROPOSAL.md` as the main architectural improvement
rather than mixing it into the bug fix commits.