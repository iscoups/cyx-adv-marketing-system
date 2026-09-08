# CYX Advertising Marketing System

Monorepo scaffold for a one-stop advertising marketing platform.

## Structure

- `backend/` - Express + MySQL + Sequelize API
- `frontend/` - Vue 3 + Element Plus admin UI
- `advertising-platform-brief.html` - Product brief

## Quick start

1. Run `npm install` from the repo root.
2. Configure `backend/.env` from `backend/.env.example`.
3. If you want demo data, set `SYNC_DB=1` before starting the backend.
4. Run `npm run dev:backend` and `npm run dev:frontend` in separate terminals.

## Notes

- Vue 3 should use `Element Plus` instead of the old Vue 2 `Element UI`.
- The current frontend is a shell scaffold; business pages and API wiring can be filled in next.
