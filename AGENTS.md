# Repository Instructions

## Project Overview

This is a Vite + React 19 + TypeScript app for managing a guest list and seating plan ("spisak gostiju"). The app stores guests and tables in `localStorage`, supports desktop drag-and-drop seating, has a separate mobile flow, and exports/imports data via JSON, Excel, PDF, and canvas PDF utilities.

Core entry points:

- `src/main.tsx` mounts the React app and wraps it in PostHog.
- `src/App.tsx` is the desktop app shell and owns guest/table state.
- `src/MobileApp.tsx` is the mobile app shell and mostly duplicates desktop state logic with mobile-specific table assignment flows.
- `src/components/DeviceWrapper.tsx` chooses mobile vs desktop based on user agent and viewport width.
- `src/components/TableCanvas.tsx`, `src/components/TableComponent.tsx`, and `src/components/ChairComponent.tsx` handle the visual seating plan.
- `src/components/tabs/*` contains sidebar tab content.
- `src/utils/*` contains chair layout, export/import, PDF/Excel, and device helpers.
- `src/types.ts` defines `Guest`, `Table`, and `Chair`.

## Working Rules

- Push back when a request is likely to waste significant time/tokens, increase complexity without a clear payoff, or conflicts with the project shape. Explain the risk plainly, then follow the user's decision.
- Prefer small, scoped changes that match the existing React component and utility structure.
- Preserve the Serbian UI language. Some current strings appear mojibake-encoded. Do not mix encodings casually. If fixing copy, fix related strings deliberately and verify rendering.
- Treat `localStorage` data shape as user data. Be careful with migrations or resets, and preserve assigned guests when recalculating chairs.
- Keep desktop and mobile behavior in sync when changing shared guest/table semantics. The app currently has duplicated logic in `App.tsx` and `MobileApp.tsx`.
- Use `react-icons` for the existing icon style unless the surrounding component already uses another asset.
- Avoid broad refactors unless they directly reduce risk for the requested change.

## Commands

- Install dependencies: `npm install`
- Run dev server: `npm run dev`
- Build: `npm run build`
- Lint: `npm run lint`

Current baseline as of 2026-06-10:

- `npm run build` succeeds.
- `npm run lint` fails. ESLint currently scans `.vite_cache` generated dependency files, and there are also source issues including unused imports/variables and explicit `any` types. Do not describe lint as passing until these are fixed.
- Git may require `git -c safe.directory=C:/Users/cb-66/OneDrive/Desktop/spisak-gostiju ...` in this sandbox because the repository owner differs from the sandbox user.

## Notes For Future Changes

- `src/DeviceWrapper.tsx` appears unused; `src/components/DeviceWrapper.tsx` is the wrapper imported by `src/App.tsx`.
- `Guest.inviteSent` and `Guest.confirmedAttendance` are currently typed as `any`, but the app initializes them as booleans. Prefer tightening these to `boolean` when touching related code.
- Table chair positions are recalculated in `src/utils/calculateChairPositions.ts`; preserve existing chair IDs and `occupiedBy` values unless the user explicitly wants seating assignments cleared.
- Export utilities depend on browser DOM/canvas behavior, so verify in a browser for UI/export changes, not only with TypeScript build.
