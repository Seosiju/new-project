# 0001. Mac + Windows/WSL2 개발환경 표준화

## Status

Accepted

## Context

개발자가 macOS와 Windows를 함께 사용합니다. 경로, line ending, shell, 파일 권한 차이로 인한 문제를 줄여야 합니다.

## Decision

- Windows 개발은 WSL2 Ubuntu 내부를 공식 환경으로 삼습니다.
- repo는 WSL 내부 파일시스템에 clone합니다.
- DB/Redis는 Docker Compose로 실행합니다.
- 명령은 Makefile로 통일합니다.
- LF line ending을 기본으로 고정합니다.

## Consequences

Windows native PowerShell 전용 스크립트는 주 개발 경로에서 제외됩니다. 필요한 경우 보조 스크립트로만 둡니다.
