# Syyclops assignment


## How to run the app

### Frontend

To run the application, go to `frontend` folder and run:
- `npm i`
- `npm run start`

This will open the project in http://localhost:3000/


### Backend

The created backend has all the libraries imported in the virtual environment folder (.venv). To run it, cd to `backend` folder and run this command in the terminal (using .venv as source):

`fastapi dev main.py`

Your server should be available at http://127.0.0.1:8000



## Frontend

The app firstly displays a sidebar on the left with all the users stored in the backend. The main part of the screen is the "content" section, that displays the information of selected user (initially it will say "Select an account to see details"). 

You are also provided a functionality of changing the user's data (name and email). After saving the changed information, the user will be saved in the local storage, so that even after refreshing the page, the user will still have the newly changed name or email. 

This changed data is lost only on the restart of the backend server, as there is no actual database paermanently storing the new user information.

The app also features responsive functionality, so it is suitable for use on devices with various screen widths.


## Backend

Backend serves as a storage for accounts (sort of a database). It provides a functionality to edit (with HPPT PUT method) the existing users in the "users.py" file (but only temporarily; once the backend is refreshed, the frontend will display the original user credentials).

### Unit Tests

In the backend folder there is a `test_main.py` file containing tests for the `main.py` application. You can test it yourself by running the command `pytest -s test_main.py`. If your app setup is correct, you should get an output symilar to this:

`====== 6 passed in 0.90s ======`


## Second variation of the app

If you switch to the `dummies` branch, you will see there is another version of this app. The main difference is that you do not use your own backend server as you are now using the user data from `https://dummyjson.com/`. The app provides similar functionalities, with one main difference:

The user data fetched from the dummy site cannot be permanently changed. 

This means that when you edit users on the site, they will be displayed as if they were changed, although this isn't the case.

When you refresh the page, the users will be fetched again from the dummy site and have the same properties as before you applied your changes.