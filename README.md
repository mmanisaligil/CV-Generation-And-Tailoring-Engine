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
  - Run: `npm run start -- --hostname 0.0.0.0 --port ${PORT}`
- `backend` uses Docker from `backend/Dockerfile` on port `8000`

Use root `app.yaml` when creating the app in DigitalOcean (same spec is mirrored at `.do/app.yaml`).
Only `frontend` is publicly routed at `/`; backend has no public route and is intended for internal service-to-service traffic.

### DigitalOcean deployment steps
1. Push this repository to GitHub/GitLab.
2. In DigitalOcean App Platform, choose **Create App > App Spec** and select `app.yaml` from repo root (do not use raw autodetect flow).
3. Set secret `OPENAI_API_KEY` in the App Platform UI (or keep from spec prompt).
4. Confirm service config:
   - `frontend`: source `/frontend`, Node buildpack, build `npm install && npm run build`, run `npm run start -- --hostname 0.0.0.0 --port ${PORT}`
   - `backend`: source `/backend`, Dockerfile build, port `8000`
5. Deploy.
6. Verify:
   - Frontend URL loads app
   - Backend internal health responds from frontend runtime via `NEXT_PUBLIC_API_URL`

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
- In DigitalOcean, `NEXT_PUBLIC_API_URL` is wired to `${backend.PRIVATE_URL}` so frontend calls the internal backend service URL automatically.
