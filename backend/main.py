from typing import Union

from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/users")
def get_users():
    # TODO ASSIGNMENT: Return a list of users
    return []