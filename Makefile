SHELL := /bin/bash

.PHONY: help setup dev dev-web dev-api services services-down test lint format clean

help:
	@echo "new-project development commands"
	@echo "  make setup          Install web and api dependencies"
	@echo "  make services       Start Postgres/Redis with Docker Compose"
	@echo "  make services-down  Stop Docker services"
	@echo "  make dev            Run web + api locally"
	@echo "  make dev-web        Run Next.js web app"
	@echo "  make dev-api        Run FastAPI app"
	@echo "  make test           Run API tests and web checks"
	@echo "  make lint           Run lint/type checks"
	@echo "  make format         Format code"

setup:
	pnpm install
	python3 -m venv apps/api/.venv
	apps/api/.venv/bin/python -m pip install --upgrade pip
	apps/api/.venv/bin/pip install -e "apps/api[dev]"

services:
	docker compose up -d postgres redis

services-down:
	docker compose down

dev:
	pnpm dev

dev-web:
	pnpm --filter @new-project/web dev

dev-api:
	cd apps/api && .venv/bin/uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

test:
	apps/api/.venv/bin/pytest apps/api/tests
	pnpm --filter @new-project/web lint

lint:
	apps/api/.venv/bin/ruff check apps/api
	pnpm --filter @new-project/web lint

format:
	apps/api/.venv/bin/ruff format apps/api
	pnpm --filter @new-project/web format

clean:
	rm -rf apps/api/.venv node_modules apps/web/.next .pytest_cache
