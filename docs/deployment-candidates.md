# 배포 후보 조사 및 연결 준비

## 현재 repo 기준

- Web: `apps/web` — Next.js 15 / React 19 / pnpm workspace
- API: `apps/api` — FastAPI / Python package `new-project-api`
- Local services: Docker Compose `postgres` + `redis`
- DB: Postgres + pgvector 이미지 사용

## 1차 추천 조합

### Web: Vercel

추천 이유:

- Next.js 공식/최적화 배포 경로와 가장 잘 맞음
- GitHub PR preview URL을 만들기 쉬움
- 초반에는 frontend만 먼저 배포하고 API는 별도 backend URL로 연결 가능

준비할 것:

- Vercel project root: `apps/web`
- Build command: `pnpm --filter @new-project/web build`
- Install command: `pnpm install`
- Output은 Next.js 기본값 사용
- 환경변수 후보:
  - `NEXT_PUBLIC_API_BASE_URL=https://<backend-domain>`

### DB: Neon 또는 Supabase

#### Neon

추천 상황:

- 서버리스 Postgres 중심으로 단순하게 시작하고 싶을 때
- Vercel과 연결해서 preview/prod DB 분리를 고려할 때
- pgvector 기반 검색/AI 기능을 나중에 붙일 가능성이 있을 때

준비할 것:

- production branch/database 생성
- connection string 확보
- `DATABASE_URL`에 production URL 설정
- local `.env`와 production secret을 분리

#### Supabase

추천 상황:

- DB 외에 Auth, Storage, Edge Function 같은 제품군을 함께 쓸 가능성이 있을 때
- 관리 UI와 SQL editor를 적극적으로 쓰고 싶을 때

준비할 것:

- Supabase project 생성
- Postgres connection string 확보
- Auth/Storage를 쓸지 여부 결정
- `DATABASE_URL` 또는 Supabase 전용 env 이름 결정

### Backend: Render, Railway, Fly.io 중 택1

#### Render

추천 상황:

- FastAPI 웹 서비스 배포를 단순하게 시작하고 싶을 때
- GitHub 연결 기반 자동 deploy가 필요할 때

준비할 것:

- Service root: `apps/api`
- Build command 예시: `pip install -e ".[dev]"` 또는 production dependencies 분리 후 `pip install -e .`
- Start command 예시: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
- Environment:
  - `APP_ENV=production`
  - `DATABASE_URL=<managed-postgres-url>`
  - `REDIS_URL=<managed-redis-url 또는 비워두기>`

#### Railway

추천 상황:

- Backend + DB + Redis를 한 서비스 안에서 빠르게 연결하고 싶을 때
- 초기 실험/프로토타입 속도가 중요할 때

주의:

- 장기 운영 비용과 리소스 한도를 나중에 다시 확인해야 함

#### Fly.io

추천 상황:

- Docker 기반으로 backend를 직접 컨트롤하고 싶을 때
- 지역/네트워크 배치를 더 세밀하게 다루고 싶을 때

주의:

- 초반 팀에게는 Render/Railway보다 운영 난도가 조금 높을 수 있음

## 현재 권장 결정

초기 MVP 기준으로는 다음 조합을 1순위로 둔다.

1. Web: Vercel
2. DB: Neon
3. Backend: Render
4. Redis: 당장은 local only, backend에서 실제 queue/cache가 필요해지는 시점에 Upstash 또는 provider-managed Redis 검토

이유:

- Next.js는 Vercel이 가장 빠르게 preview/prod 배포를 만들 수 있음
- Neon은 Postgres + pgvector 흐름과 잘 맞고, production DB 연결이 단순함
- Render는 FastAPI 배포 절차가 단순해서 초기 운영 부담이 낮음
- Redis는 아직 앱 기능에서 필수 사용처가 없으므로 production 연결을 늦춰도 됨

## 연결 전 repo TODO

- [ ] `apps/web`에서 API base URL을 env로 받는 구조 추가
- [ ] `apps/api` production dependency 설치 경로 정리: dev dependency와 runtime dependency 분리 검토
- [ ] DB migration 도구 선택: Alembic 후보
- [ ] backend health endpoint를 production smoke test로 사용
- [ ] CORS 허용 origin을 env로 설정
- [ ] production secret 이름 확정: `DATABASE_URL`, `REDIS_URL`, `APP_ENV`, `AUTH_SECRET`
- [ ] GitHub Actions에 production 배포 전 최소 check 유지

## 확인한 공식 문서 출처

- Vercel Next.js docs: https://vercel.com/docs/frameworks/full-stack/nextjs
- Neon docs: https://neon.com/docs/introduction
- Supabase database docs: https://supabase.com/docs/guides/database/overview
- Render FastAPI docs: https://render.com/docs/deploy-fastapi
- Railway docs: https://docs.railway.com/platform
- Fly.io docs: https://fly.io/docs/
