from fastapi import FastAPI, APIRouter, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List
import uuid
from datetime import datetime, timezone
ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')
mongo_url = os.environ.get('MONGO_URL')
db = None
if mongo_url:
    from motor.motor_asyncio import AsyncIOMotorClient
    client = AsyncIOMotorClient(mongo_url)
    db = client[os.environ.get('DB_NAME', 'portfolio_prod')]
else:
    client = None
app = FastAPI()
api_router = APIRouter(prefix="/api")
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
class StatusCheckCreate(BaseModel):
    client_name: str
class ContactMessageCreate(BaseModel):
    name: str = Field(min_length=1, max_length=120)
    email: EmailStr
    message: str = Field(min_length=1, max_length=4000)
class ContactMessage(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    message: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
@api_router.get("/")
async def root():
    return {"message": "ember_forge online", "service": "PATTRADHARA.DEV", "db": db is not None}
@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    if db is None:
        raise HTTPException(status_code=501, detail="DB not configured")
    status_obj = StatusCheck(**input.model_dump())
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    await db.status_checks.insert_one(doc)
    return status_obj
@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    if db is None:
        raise HTTPException(status_code=501, detail="DB not configured")
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    for check in status_checks:
        if isinstance(check.get('timestamp'), str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    return status_checks
@api_router.post("/contact", response_model=ContactMessage)
async def create_contact_message(payload: ContactMessageCreate):
    if db is None:
        raise HTTPException(status_code=501, detail="DB not configured")
    if not payload.name.strip() or not payload.message.strip():
        raise HTTPException(status_code=400, detail="empty_fields")
    msg = ContactMessage(
        name=payload.name.strip(),
        email=str(payload.email),
        message=payload.message.strip(),
    )
    doc = msg.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    await db.contact_messages.insert_one(doc)
    return msg
@api_router.get("/contact", response_model=List[ContactMessage])
async def list_contact_messages():
    if db is None:
        raise HTTPException(status_code=501, detail="DB not configured")
    items = await db.contact_messages.find({}, {"_id": 0}).sort("timestamp", -1).to_list(500)
    for it in items:
        if isinstance(it.get('timestamp'), str):
            it['timestamp'] = datetime.fromisoformat(it['timestamp'])
    return items
app.include_router(api_router)
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

FRONTEND_BUILD = (ROOT_DIR.parent / "frontend" / "build").resolve()
logger.info("FRONTEND_BUILD = %s, exists = %s", FRONTEND_BUILD, FRONTEND_BUILD.exists())
for static_dir in ["static"]:
    d = FRONTEND_BUILD / static_dir
    if d.exists():
        app.mount(f"/{static_dir}", StaticFiles(directory=str(d)), name=f"frontend_{static_dir}")
if FRONTEND_BUILD.exists():
    index_path = FRONTEND_BUILD / "index.html"
    @app.route("/{full_path:path}", methods=["GET", "HEAD", "OPTIONS"])
    async def serve_frontend(full_path: str):
        file_path = FRONTEND_BUILD / full_path
        if file_path.exists() and file_path.is_file():
            return FileResponse(str(file_path))
        return FileResponse(str(index_path))
else:
    @app.get("/")
    async def api_root():
        return {"service": "pattradhara.dev", "status": "online"}

@app.on_event("shutdown")
async def shutdown_db_client():
    if client:
        client.close()

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("server:app", host="0.0.0.0", port=8000, reload=False)
