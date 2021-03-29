# SnapSense 🤳

# A web application for the automated management and recognition of diabetic wounds. 🏥

This project was developed as part of coursework for 5CCS2SEG.

## Features

- Superadmin can create hospitals and admins for those hospitals
- Superadmins can manage their hospitals and admins
- Admins can login and send invites to doctors
- Admins can manage (view, delete, etc.) their doctors
- Doctors can invite and manage patients
- Patients can post submissions, including images and questionnaire responses
- Doctors can send requests for patients to make a submission
- Doctors can view their patients submissions and review/flag them
- Send requests for patients to send you responses
- Considerations for accessiblity and mobile use have been made where possible
- There is validation and testing throughout the application
- Well documented for future extensibilty, implementing all features for the client as well as documenting the development progress
- And much much more...

## Setup & Installation 📄

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

3. In the frontend, add the following `.env` with your data. The frontend URL is what will be used for things such as the entires and the backend URL should link to the GraphQL connection.

```
REACT_APP_FRONTEND_URL_PREFIX = http://localhost:3000
REACT_APP_BACKEND_URL = http://localhost:5000/graphql
```

4. In the root of the project, add the following `.env` with your data. Ensure it is also in the `.gitignore`.

```
DATABASE_CONNECTION = 'db_connection_ip'
DATABASE_USERNAME = 'username'
DATABASE_PASSWORD = 'password'
DATABASE_SCHEMA = 'schema_name'

AWS_ACCESS_KEY_ID = 'key'
AWS_SECRET_ACCESS_KEY = 'secretaccesskey'
AWS_REGION = 'e.g. ap-south-1'
AWS_S3_BUCKET = 'bucketname'

MAIL_AUTH_EMAIL = 'gmail for sending emails e.g. email@gmail.com'
MAIL_AUTH_PW = 'password for that gmail'

ACCESS_TOKEN_SECRET_KEY = 'secret token key'

FRONTEND_URL = http://localhost:3000
BACKEND_URL = `http://localhost:5000/graphql
```

5. Ensure you have the latest packages installed by running `npm install` within both the `frontend` and `backend`

You may also want to log into your GMail account on the server that is running the backend to ensure it doesn't require any authentication key.

## Database Instructions

Follow [this guide](https://www.digitalocean.com/community/tutorials/how-to-install-mysql-on-ubuntu-20-04) or something similar to set up a MySQL database. You may want to create a local test and development server and create the production one on AWS.

To create the databases locally, ensure you have MySQL installed and then do the following:

1. Run `npx sequelize-cli db:drop` to remove your old database **(optional)**
2. Run `npx sequelize-cli db:create` to create your database from the specification
3. Run `npx sequelize-cli db:migrate` to run all the migrations and set up the database properly

The database should now work. You'll probably also want to seed it by running `npx sequelize-cli db:seed:all`

## Running Application

To run the frontend, `cd frontend && npm start`

To run the backend, `cd backend && npm start`

## Testing

You can run the frontend tests by calling `npm test` in the frontend folder.

You can run the backend tests by calling `npm test` in the backend folder.

## Simple Deployment
### Prerequisites
* An Amazon AWS Account with up to date billing information.
* An S3 Bucket with Public Read privileges
* An EC2 Instance (Instructions for Ubuntu Instance)
* An RDS Databse cluster with public endpoint access
* All services must be in the same **REGION**
* EC2 with `PM2`, `NGINX`, `NODE`, `NPM`, `GIT` installed 

### Procedure
* Setup RDS credentials
* Store Database credentials and API endpoint in `config/config.json`
* Make sure the root `.env` file contains the correct **AWS** configuration details
* Login to the EC2 and `git clone` the repo
* `cd` into the folder (ex: snapsense)
* run `cd frontend && npm i`
* run `npm run build`
* run `cd ../ && cd backend && npm i`
* run `cd /etc/nginx/sites-available`
* run `sudo nano default`
* Paste the following nginx configurations in the file
```
server {
    listen 80 default_server;
    listen [::]:80 default_server;
    client_max_body_size 100M;
    
    root /home/ubuntu/snapsense/frontend/build;
    
    index index.html index.htm index.nginx-debian.html;
    
    server_name _;
    location / {
        try_files $uri /index.html;
    }
    
    location /graphql {
        client_max_body_size 100M;
        proxy_pass http://localhost:5000/graphql/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
```
* Save the file
* run `systemctl sudo restart nginx`
* run `cd /home/ubuntu/snapsense/backend/`
* run `pm2 start server.js --name server`
* The App should now be running on the EC2 public url
## Other

This project has a Trello board which can be viewed [here.](https://trello.com/b/RinZfAWQ/seg-large-group-project)

Notes related to this project are kept [here.](https://emckclac-my.sharepoint.com/:f:/r/personal/k1925171_kcl_ac_uk/Documents/CS%20G401/Year%202/Term%202/Software%20Engineering%20Group%20Project/SEG%20Large%20Group%20Project?csf=1&web=1&e=Il0jLi)
