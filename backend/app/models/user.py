from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional


class User(BaseModel):
    id: Optional[str] = None
    name: str
    email: EmailStr
    password: str
    created_at: datetime = datetime.utcnow()


class UserRegister(BaseModel):
    name: str
    email: EmailStr
    password: str


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class Token(BaseModel):
    access_token: str
    token_type: str


# =========================================================
# CHANGE PASSWORD
# =========================================================

class ChangePasswordRequest(BaseModel):
    current_password: str
    new_password: str


# =========================================================
# DELETE ACCOUNT
# =========================================================

class DeleteAccountRequest(BaseModel):
    password: str