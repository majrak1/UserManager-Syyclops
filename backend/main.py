from typing import List
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, EmailStr, Field
from users import get_users  # Import the get_users function
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Change this to your React app's origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class User(BaseModel):
    name: str = Field(..., min_length=1, example="John Doe")
    email: EmailStr = Field(..., min_length=1, example="john@doe.com")

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/users")
def get_users_endpoint():
    users = get_users()
    return {"users": users}

@app.put("/users/{user_id}")
def update_user(user_id: int, user: User):
    users = get_users()

    for existing_user in users:
        if existing_user["id"] == user_id:
            existing_user["name"] = user.name
            existing_user["email"] = user.email
            return {"message": "User updated successfully", "user": existing_user}
        
    raise HTTPException(status_code=404, detail="User not found")
