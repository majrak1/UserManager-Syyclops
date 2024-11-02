from fastapi.testclient import TestClient
from main import app  # Import the FastAPI app
import pytest

client = TestClient(app)

# Test fetching all users
def test_get_users():
    response = client.get("/users")
    assert response.status_code == 200
    assert "users" in response.json()
    assert len(response.json()["users"]) == 20

# Test updating a user
def test_update_user():
    user_data = {"name": "Updated Name", "email": "updated@example.com"}
    response = client.put("/users/1", json=user_data)
    assert response.status_code == 200
    assert response.json()["message"] == "User updated successfully"
    assert response.json()["user"]["name"] == user_data["name"]
    assert response.json()["user"]["email"] == user_data["email"]

# Test updating a non-existent user (non-existent ID)
def test_update_non_existent_user():
    user_data = {"name": "Does Not Exist", "email": "nonexistent@example.com"}
    response = client.put("/users/999", json=user_data)
    assert response.status_code == 404
    assert response.json()["detail"] == "User not found"

def test_update_user_empty_name():
    response = client.put("/users/1", json={"name": "", "email": "john@doe.com"})
    assert response.status_code == 422
    assert response.json()["detail"][0]["msg"] == "String should have at least 1 character"
    assert response.json()["detail"][0]["type"] == "string_too_short"

def test_update_user_empty_email():
    response = client.put("/users/1", json={"name": "John Doe", "email": ""})
    assert response.status_code == 422
    assert response.json()["detail"][0]["msg"] == "value is not a valid email address: An email address must have an @-sign."
    assert response.json()["detail"][0]["type"] == "value_error"

def test_update_user_with_valid_data():
    # Update a user with valid data
    response = client.put("/users/1", json={"name": "John Updated", "email": "john.updated@doe.com"})
    assert response.status_code == 200
    assert response.json()["message"] == "User updated successfully"
    assert response.json()["user"]["name"] == "John Updated"
    assert response.json()["user"]["email"] == "john.updated@doe.com"


