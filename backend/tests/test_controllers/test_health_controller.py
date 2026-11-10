def test_health_check_returns_200(client):
    response = client.get("/api/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "HEALTHY"


def test_health_check_response_structure(client):
    response = client.get("/api/health")
    assert response.status_code == 200
    data = response.json()
    assert "status" in data
    assert "service" in data
    assert "database" in data
    assert "timestamp" in data
    assert data["service"] == "SeniorSphere Backend API"
    assert data["database"] == "PostgreSQL"
