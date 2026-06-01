from fastapi.testclient import TestClient

from app.main import app


def test_health() -> None:
    client = TestClient(app)
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json()["status"] == "ok"


def test_strategy_frameworks() -> None:
    client = TestClient(app)
    response = client.get("/api/strategy/frameworks")
    assert response.status_code == 200
    assert "SWOT" in response.json()["frameworks"]
