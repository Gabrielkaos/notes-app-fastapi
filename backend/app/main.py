from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings
from app.routes import router as notes_router



app = FastAPI(title="Notes App", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(notes_router)

@app.get("/")
def root():
    return {"message": "Welcome to the Notes App API!"}