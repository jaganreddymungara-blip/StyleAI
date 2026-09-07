from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from app.routers.auth import router as auth_router
from app.routers.profile import router as profile_router
from app.routers.wardrobe import router as wardrobe_router
from app.routers.outfit import router as outfit_router
from app.routers.favorites import router as favorites_router
from app.routers.history import router as history_router
from app.routers import stylist


app = FastAPI(
    title="StyleAI API",
    version="1.0.0"
)


# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Authentication Routes
app.include_router(
    auth_router,
    prefix="/api/auth",
    tags=["Authentication"]
)


# Uploaded Images
app.mount(
    "/uploads",
    StaticFiles(directory="app/uploads"),
    name="uploads"
)


# Favorites Routes
app.include_router(
    favorites_router,
    prefix="/api/favorites",
    tags=["Favorites"]
)


# Profile Routes
app.include_router(
    profile_router,
    prefix="/api/profile",
    tags=["Profile"]
)


# Wardrobe Routes
app.include_router(
    wardrobe_router,
    prefix="/api/wardrobe",
    tags=["Wardrobe"]
)


# Outfit Routes
app.include_router(
    outfit_router,
    prefix="/api/outfit",
    tags=["Outfit"]
)


# History Routes
app.include_router(
    history_router,
    prefix="/api/history",
    tags=["History"]
)


# AI Stylist Routes
app.include_router(
    stylist.router,
    prefix="/api/stylist",
    tags=["AI Stylist"]
)

app.mount(
    "/uploads",
    StaticFiles(directory="app/uploads"),
    name="uploads"
)

@app.get("/")
async def root():
    return {
        "message": "Welcome to StyleAI API"
    }


@app.get("/health")
async def health():
    return {
        "status": "Running"
    }