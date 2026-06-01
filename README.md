# new-project

전략기획 업무를 돕는 웹앱형 어시스턴트 서비스입니다.

## 개발환경 원칙

- macOS와 Windows가 같은 명령으로 개발할 수 있도록 Linux/Unix-like 기준으로 맞춥니다.
- Windows 개발자는 **WSL2 Ubuntu 내부**에서 clone하고 실행합니다. `/mnt/c/...` 아래에서 개발하지 않습니다.
- DB/Redis는 Docker Compose로 띄우고, 앱은 로컬/WSL에서 실행합니다.
- 실제 토큰은 `.env`에만 두고 git에는 올리지 않습니다. 공유는 `.env.example`만 사용합니다.

## 기술 스택 초안

- Web: Next.js + TypeScript
- API: FastAPI + Python
- DB: PostgreSQL + pgvector
- Cache/Queue placeholder: Redis
- Package manager: pnpm
- Local service orchestration: Docker Compose

## 빠른 시작 - macOS

```bash
git clone https://github.com/Seosiju/new-project.git
cd new-project
cp .env.example .env
make setup
make services
make dev
```

## 빠른 시작 - Windows / WSL2

PowerShell에서 WSL2를 먼저 설치합니다.

```powershell
wsl --install
```

이후 Ubuntu 터미널에서 실행합니다.

```bash
sudo apt update
sudo apt install -y git curl build-essential make
mkdir -p ~/projects
cd ~/projects
git clone https://github.com/Seosiju/new-project.git
cd new-project
cp .env.example .env
make setup
make services
make dev
```

> 주의: repo는 `/home/<user>/projects/new-project`처럼 WSL 내부 파일시스템에 두세요. `/mnt/c/Users/...`는 파일 감시, 권한, Docker volume 문제를 만들 수 있습니다.

## 개발 명령

```bash
make setup          # 의존성 설치
make services       # Postgres/Redis 실행
make services-down  # Postgres/Redis 중지
make dev            # 웹 개발 서버 실행
make dev-api        # API 개발 서버 실행
make test           # 테스트/체크
make lint           # lint
make format         # format
```

## 로컬 URL

- Web: http://localhost:3000
- API: http://localhost:8000
- API docs: http://localhost:8000/docs

## 첫 MVP 후보

1. 전략기획 문서 초안 생성
2. SWOT / 3C / PEST / OKR 프레임워크 기반 분석
3. 업로드/붙여넣기 자료 요약 및 실행 항목 추출

## Secret 관리

`.env`에는 실제 토큰을 넣어도 되지만 절대 commit하지 않습니다. `.gitignore`에 포함되어 있습니다.
