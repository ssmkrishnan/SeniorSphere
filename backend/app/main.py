from contextlib import asynccontextmanager
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse

from app.config import settings
from app.database import engine, Base
import app.models  # Ensure all models are registered on Base.metadata
from app.websocket.manager import ws_manager

from app.controllers.health_controller import router as health_router
from app.controllers.resident_controller import router as resident_router
from app.controllers.emergency_controller import router as emergency_router
from app.controllers.complaint_controller import router as complaint_router
from app.controllers.activity_controller import router as activity_router
from app.controllers.service_controller import router as service_router
from app.controllers.community_controller import router as community_router
from app.controllers.entertainment_controller import router as entertainment_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Create all tables on startup
    Base.metadata.create_all(bind=engine)
    yield


app = FastAPI(
    title="SeniorSphere Backend API",
    lifespan=lifespan
)

# CORS Middleware
origins = [settings.CORS_ORIGIN] if settings.CORS_ORIGIN != "*" else ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers
app.include_router(health_router)
app.include_router(resident_router)
app.include_router(emergency_router)
app.include_router(complaint_router)
app.include_router(activity_router)
app.include_router(service_router)
app.include_router(community_router)
app.include_router(entertainment_router)


@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await ws_manager.connect(websocket)
    try:
        while True:
            await websocket.receive_text()
    except WebSocketDisconnect:
        ws_manager.disconnect(websocket)
    except Exception:
        ws_manager.disconnect(websocket)


@app.get("/", response_class=HTMLResponse)
def root_dashboard():
    return f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>SeniorSphere - Python Backend API Hub</title>
  <style>
    * {{ box-sizing: border-box; margin: 0; padding: 0; }}
    body {{
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      background: #0f172a;
      color: #f8fafc;
      padding: 2.5rem 1.5rem;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
    }}
    .container {{
      max-width: 720px;
      width: 100%;
      background: #1e293b;
      border: 1px solid #334155;
      border-radius: 20px;
      padding: 2rem;
      box-shadow: 0 20px 25px -5px rgba(0,0,0,0.5);
    }}
    .badge {{
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: #064e3b;
      color: #34d399;
      font-size: 12px;
      font-weight: 700;
      padding: 4px 12px;
      border-radius: 9999px;
      margin-bottom: 1rem;
    }}
    .pulse-dot {{
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #34d399;
      box-shadow: 0 0 10px #34d399;
    }}
    h1 {{ font-size: 1.75rem; font-weight: 800; margin-bottom: 0.5rem; color: #fff; }}
    p {{ color: #94a3b8; font-size: 14px; line-height: 1.6; margin-bottom: 1.5rem; }}
    .hero-btn {{
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      background: #0d9488;
      color: #ffffff;
      text-decoration: none;
      padding: 14px 20px;
      border-radius: 12px;
      font-weight: 700;
      font-size: 15px;
      margin-bottom: 2rem;
      transition: background 0.2s, transform 0.1s;
      box-shadow: 0 4px 14px rgba(13, 148, 136, 0.35);
    }}
    .hero-btn:hover {{ background: #0f766e; }}
    .hero-btn:active {{ transform: scale(0.99); }}
    .section-title {{
      font-size: 13px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: #64748b;
      margin-bottom: 0.75rem;
      border-bottom: 1px solid #334155;
      padding-bottom: 6px;
    }}
    .grid {{
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 10px;
      margin-bottom: 1.5rem;
    }}
    .card {{
      background: #0f172a;
      border: 1px solid #334155;
      border-radius: 10px;
      padding: 12px;
    }}
    .card-label {{ font-size: 11px; color: #64748b; font-weight: 600; text-transform: uppercase; }}
    .card-val {{ font-size: 14px; color: #f1f5f9; font-weight: 700; margin-top: 4px; }}
    .endpoints-list {{
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }}
    .endpoint-item a {{
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: #0f172a;
      border: 1px solid #334155;
      border-radius: 10px;
      padding: 10px 14px;
      color: #38bdf8;
      text-decoration: none;
      font-family: monospace;
      font-size: 13px;
      font-weight: 600;
      transition: border-color 0.2s;
    }}
    .endpoint-item a:hover {{ border-color: #38bdf8; }}
    .method {{
      font-size: 11px;
      font-weight: 800;
      background: #0369a1;
      color: #fff;
      padding: 2px 8px;
      border-radius: 6px;
    }}
  </style>
</head>
<body>
  <div class="container">
    <div class="badge">
      <span class="pulse-dot"></span>
      <span>PYTHON + FASTAPI + POSTGRESQL ONLINE</span>
    </div>
    <h1>SeniorSphere Backend API Server</h1>
    <p>
      You are connected to the <strong>Python + FastAPI + PostgreSQL Backend Service</strong> on port <strong>{settings.PORT}</strong>. 
      To launch the interactive Mobile Application interface, click the button below:
    </p>

    <a href="http://localhost:5180" class="hero-btn" target="_self">
      <span>📱 Open SeniorSphere Mobile App (Port 5180)</span>
      <span>&rarr;</span>
    </a>

    <div class="section-title">System Architecture</div>
    <div class="grid">
      <div class="card">
        <div class="card-label">Database</div>
        <div class="card-val" style="color: #34d399;">PostgreSQL 17 (Local)</div>
      </div>
      <div class="card">
        <div class="card-label">Database Name</div>
        <div class="card-val">seniorsphere</div>
      </div>
      <div class="card">
        <div class="card-label">API Port</div>
        <div class="card-val">{settings.PORT} (HTTP & WS)</div>
      </div>
      <div class="card">
        <div class="card-label">Mobile Port</div>
        <div class="card-val">5180 (Vite)</div>
      </div>
    </div>

    <div class="section-title">REST API Endpoints</div>
    <ul class="endpoints-list">
      <li class="endpoint-item">
        <a href="/api/health" target="_blank">
          <span>/api/health</span>
          <span class="method">GET</span>
        </a>
      </li>
      <li class="endpoint-item">
        <a href="/api/resident/profile" target="_blank">
          <span>/api/resident/profile</span>
          <span class="method">GET</span>
        </a>
      </li>
      <li class="endpoint-item">
        <a href="/api/complaints" target="_blank">
          <span>/api/complaints</span>
          <span class="method">GET</span>
        </a>
      </li>
      <li class="endpoint-item">
        <a href="/api/activities/today" target="_blank">
          <span>/api/activities/today</span>
          <span class="method">GET</span>
        </a>
      </li>
      <li class="endpoint-item">
        <a href="/api/community/birthdays" target="_blank">
          <span>/api/community/birthdays</span>
          <span class="method">GET</span>
        </a>
      </li>
      <li class="endpoint-item">
        <a href="/api/community/gallery" target="_blank">
          <span>/api/community/gallery</span>
          <span class="method">GET</span>
        </a>
      </li>
      <li class="endpoint-item">
        <a href="/api/entertainment/modules" target="_blank">
          <span>/api/entertainment/modules</span>
          <span class="method">GET</span>
        </a>
      </li>
      <li class="endpoint-item">
        <a href="/docs" target="_blank">
          <span>/docs (Swagger UI)</span>
          <span class="method">GET</span>
        </a>
      </li>
    </ul>
  </div>
</body>
</html>"""


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=settings.PORT, reload=True)
