# Vibecoding CV Engine (Alpha MVP)

Container-first MVP for AI-assisted CV parsing, editing, tailoring, and export.

## Stack
- Frontend: Next.js 14 + Tailwind + Zustand + shadcn-style UI primitives
- Backend: FastAPI + SQLite + OpenAI-compatible service stubs
- Rendering: Jinja2 -> LaTeX pipeline stub

## Project structure
- `frontend/` Next.js App Router frontend (buildpack deploy on DigitalOcean)
- `backend/` FastAPI API service (Dockerfile deploy on DigitalOcean)
- `backend/migrations/` SQL migrations
- `docker-compose.yml` starts frontend + backend together
- `.do/app.yaml` DigitalOcean App Platform multi-service spec

## Environment
1. Copy env files:
   - `cp backend/.env.example backend/.env`
   - `cp frontend/.env.local.example frontend/.env.local`
2. Set `OPENAI_API_KEY` in `backend/.env`.

## Run with Docker (recommended)
```bash
docker compose up --build
```
- Frontend: http://localhost:3000
- Backend docs: http://localhost:8000/docs
- Health: http://localhost:8000/health

## Run locally without Docker
```bash
cd frontend && npm install && npm run dev
```
```bash
cd backend && pip install -r requirements.txt && uvicorn app.main:app --reload
```

## DigitalOcean App Platform
This repo is configured as **two services**:
- `frontend` uses **Node buildpack auto-detection** from `frontend/package.json` with:
  - Build: `npm install && npm run build`
  - Run: `npm run start`
- `backend` uses Docker from `backend/Dockerfile` on port `8000`

Use `.do/app.yaml` when creating the app in DigitalOcean.
Only `frontend` is publicly routed; backend has no public route and is intended for internal service-to-service traffic.

## API endpoints
- `POST /api/parse` - Parse uploaded PDF/image into `MasterCVData`
- `POST /api/enhance/summary` - Rewrite summary text
- `POST /api/enhance/bullets` - Generate role bullets
- `POST /api/tailor` - Tailor CV to JD and return match score
- `POST /api/render` - Render CV output (PDF media type)
- `GET /api/templates` - List template metadata + tiers
- `GET /health` - Health check

## Assumptions
- OpenAI calls are stubbed for deterministic local startup; endpoints are contract-compatible.
- `/api/render` currently returns compiled LaTeX bytes with `application/pdf` header as an MVP-compatible stub.
- In DigitalOcean, frontend should call backend via internal URL `https://backend.cv-engine.internal` configured in `NEXT_PUBLIC_API_URL`.
