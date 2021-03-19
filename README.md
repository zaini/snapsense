# SnapSense 🤳

## A web application for the automated management and recognition of diabetic wounds. 🏥

This project was developed as part of coursework for 5CCS2SEG.

# Features

- Invite doctors and patients
- Send images and view questionnaire responses
- Send requests for patients to send you responses
- ...

TODO add more features to this list

# Setup & Installation 📄

This application requires setting up various environment and configuration files for all the services used to work correct.

1. Set up a MySQL database by following the instructions below.

2. In `backend/config/config.json` add the following config with your details and ensure it is in `.gitignore`.

```
{
    "development": {
      "username": "dev",
      "password": "dev",
      "database": "database_development",
      "host": "127.0.0.1",
      "dialect": "mysql"
    },
    "test": {
      "username": "test",
      "password": "test_password",
      "database": "database_test",
      "host": "127.0.0.1",
      "dialect": "mysql"
    },
    "production": {
      "username": "dev_user",
      "password": "dev_user",
      "database": "snapsense",
      "host": "yourhostIPgoeshere",
      "dialect": "mysql"
    }
  }
```

3. In the backend, add the following `.env` with your data, again ensuring it is also in the `.gitignore`:

```
DATABASE_CONNECTION = 'yourhostIPgoeshere'
DATABASE_USERNAME = 'dev_user'
DATABASE_PASSWORD = 'dev_user'
DATABASE_SCHEMA = 'snapsense'

AWS_ACCESS_KEY_ID = 'YOUR_AWS_ACCESS_KEY'
AWS_SECRET_ACCESS_KEY = 'YOUR_AWS_SECRET_ACCESS_KEY'
AWS_REGION = 'e.g. ap-south-1, get this from AWS'
AWS_S3_BUCKET = 'bucketname'

MAIL_AUTH_EMAIL = 'something@email.com'
MAIL_AUTH_PW = 'emailpassword'

ACCESS_TOKEN_SECRET_KEY = 'somesecretaccesstoken'
```

4. Ensure you have the latest packages installed by running `npm install` within both the `frontend` and `backend`

TODO: consider moving all the config and env folders to the root of the project

# Database Instructions

Follow [this guide](https://www.digitalocean.com/community/tutorials/how-to-install-mysql-on-ubuntu-20-04) or something similar to set up a MySQL database. You may want to create a local test and development server and create the production one on AWS.

To create the databases locally, ensure you have MySQL installed and then do the following:

1. Run `npx sequelize-cli db:drop` to remove your old database **(optional)**
2. Run `npx sequelize-cli db:create` to create your database from the specification
3. Run `npx sequelize-cli db:migrate` to run all the migrations and set up the database properly

The database should now work. You will probably want to run the backend and create Hospitals and invite Admins to get started.

TODO Ayan: add more instructions for how to set this up on AWS

# Running Application

To run the frontend, `cd frontend && npm start`

To run the backend, `cd backend && npm start`

TODO consolidate this into a single package.json command later which covers the whole app.

# Testing

You can run the frontend tests by calling `npm test` in the frontend.

You can run the backend tests by calling `npm test` in the backend.

# Deployment

HOW TO DEPLOY

# Other

This project has a Trello board which can be viewed [here.](https://trello.com/b/RinZfAWQ/seg-large-group-project)

Notes related to this project are kept [here.](https://emckclac-my.sharepoint.com/:f:/r/personal/k1925171_kcl_ac_uk/Documents/CS%20G401/Year%202/Term%202/Software%20Engineering%20Group%20Project/SEG%20Large%20Group%20Project?csf=1&web=1&e=Il0jLi)
