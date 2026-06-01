# Windows / WSL2 개발환경 검증 체크리스트

kowinusa가 Windows에서 검증할 때는 **PowerShell이 아니라 WSL2 Ubuntu 터미널**에서 아래를 실행한다.

## 0. 위치 원칙

권장 위치:

```bash
/home/<user>/projects/new-project
```

피해야 할 위치:

```bash
/mnt/c/Users/<user>/...
```

`/mnt/c` 아래에서는 파일 감시, 권한, symlink, Docker volume 문제가 생길 수 있다.

## 1. 필수 도구 확인

```bash
gh --version
git --version
node --version
pnpm --version
python3 --version
make --version
docker compose version
```

기대 기준:

- Node.js: `22.x` 이상
- pnpm: `10.x` 이상
- Python: `3.11` 이상
- Docker Compose: `v2` 계열
- GitHub CLI `gh`는 로그인 필요

```bash
gh auth status
```

## 2. repo clone

```bash
mkdir -p ~/projects
cd ~/projects
git clone https://github.com/Seosiju/new-project.git
cd new-project
cp .env.example .env
```

## 3. 개발환경 설치

```bash
make setup
```

실패 시 보고할 것:

- 실행한 shell이 WSL2 Ubuntu인지 PowerShell인지
- repo 경로가 `/home/...`인지 `/mnt/c/...`인지
- 실패 로그 전체
- `python3 --version`, `node --version`, `pnpm --version`

## 4. 테스트

```bash
make test
```

기대 결과:

- API pytest 통과
- Web TypeScript check 통과

## 5. Docker services

Docker Desktop이 Windows에서 실행 중이고, WSL integration이 켜져 있어야 한다.

```bash
make services
docker compose ps
docker exec new-project-postgres pg_isready -U app -d new_project
docker exec new-project-redis redis-cli ping
```

기대 결과:

```text
postgres: healthy
redis: healthy
pg_isready: accepting connections
redis: PONG
```

## 6. 문제 보고 템플릿

```text
OS / WSL:
- Windows version:
- Ubuntu version:
- Repo path: /home/... or /mnt/c/...

Tool versions:
- gh:
- git:
- node:
- pnpm:
- python3:
- make:
- docker compose:

Commands run:
- make setup: pass/fail
- make test: pass/fail
- make services: pass/fail

Docker state:
- docker compose ps output:
- postgres health:
- redis ping:

Errors:
<full log>
```
