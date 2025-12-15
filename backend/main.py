from fastapi import FastAPI, Depends, HTTPException
from backend.security import generate_password
from backend.auth import router
from backend.database import SessionLocal
from backend.models import User

app = FastAPI(title="ProSecure Password Generator")

app.include_router(router)

def get_current_user(email: str):
    db = SessionLocal()
    user = db.query(User).filter(User.email == email).first()
    if not user:
        raise HTTPException(status_code=401, detail="Not authenticated")
    return user

@app.get("/generate")
def generate(email: str, length: int = 16):
    user = get_current_user(email)

    if not user.is_paid:
        raise HTTPException(status_code=403, detail="Subscription required")

    return {"password": generate_password(length)}

