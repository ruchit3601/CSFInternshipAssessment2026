# Retrospective

## Trade-offs Made

- **Capacity rollback in PUT**: When moving an animal to a full paddock, I
  decrement the old paddock first then check the new one. On failure I
  manually roll back. A database transaction would be cleaner, but
  `node:sqlite`'s synchronous API made inline transactions cumbersome.
  With more time I would wrap paddock count changes in a BEGIN/COMMIT block.

- **N+1 query left as proposal**: The GET /animals query-per-animal issue is a
  real performance problem. I documented the fix in ARCH_PROPOSAL.md rather
  than implementing it mid-assessment to keep the bug commits clean and the
  scope contained.

## What I Would Do Differently With More Time

- Separate route files from DB logic into a proper controller/service layer
- Add input sanitization middleware rather than per-route checks
- Add a weight chart (line graph) to the frontend for visual trend tracking

## What I Deliberately Left Alone

The frontend has no error display for most API failures — errors are silently
swallowed except in the weight form. Fixing this consistently across all forms
would require restructuring `app.js` and was out of scope for this assessment.cd..
