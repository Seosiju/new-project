# Architecture

## Local development

```text
Browser -> Next.js web app -> FastAPI API -> Postgres/pgvector
                                  └-------> Redis
```

## Environment strategy

- macOS: repo를 일반 로컬 경로에 clone합니다.
- Windows: WSL2 Ubuntu 내부 `/home/<user>/projects` 아래에 clone합니다.
- Docker Compose는 Postgres/Redis 같은 공통 의존성을 제공합니다.
- 앱 서버는 빠른 hot reload를 위해 로컬/WSL에서 직접 실행합니다.
