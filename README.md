
# SnapSense 🤳

# A web application for the automated management and recognition of diabetic wounds. 🏥

This project was developed as part of coursework for 5CCS2SEG.

Developed by Ali Zaini, Mohammad Albinhassan, Ayan Ahmad, Sonia Baileys, Mahsum Kocabey, Era Mullahasani Dula, Soyoung Park, Benedict Udall and Alisher Zhaken.

## Features

- Superadmin can create hospitals and admins for those hospitals
- Superadmin can manage their hospitals and admins
- Admins can login and send invites to doctors
- Admins can manage (view, delete, etc.) their doctors
- Doctors can invite and manage patients
- Patients can post submissions, including images and questionnaire responses
- Doctors can send requests for patients to make a submission
- Doctors can view their patients submissions and review/flag them
- Send requests for patients to send you responses
- Considerations for accessability and mobile use have been made where possible
- There is validation and testing throughout the application
- Well documented for future extendibility, implementing all features for the client as well as documenting the development progress
- And much much more...

## Quick Setup Guide

If you just want to get the application running locally, there are commands in the root of the application although it is suggested that you follow the full guide and run the frontend/backend seperately.

0. Follow [this guide](https://www.digitalocean.com/community/tutorials/how-to-install-mysql-on-ubuntu-20-04) or something similar to set up a MySQL database. You also need to install [node](https://nodejs.org/en/download/).

1. Set up `backend/config/config.json` and the `.env` files in the root and `frontend` of this project. You can find more info on this below, or it may be provided to you (but you may have to change some variables)

2. From the root, run `npm run setup` to setup the frontend/backend (this will install all the relavent modules and set up the databases and seed them.)

3. (Optional) From the root, run `npm run test` to run the tests for the application (this will run the backend and then the frontend tests)

4. From the root, run `npm run start` to start the frontend and backend. It is suggested you start them seperately, but this works if you're in a hurry. You can access the frontend from `http://localhost:3000`

## Setup & Installation 📄

This application requires setting up various environment and configuration files for all the services used to work correct.

0. Set up a MySQL database by following the instructions [below](#database-instructions). You also need to install [node](https://nodejs.org/en/download/).

1. In `backend/config/config.json` add the following config with your details and ensure it is in `.gitignore`. These are the details to access your development, test and production databases.

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
DATABASE_CONNECTION = 'AWS RDS IP address e.g. 123.123.123.123'
DATABASE_USERNAME = `AWS RDS MySQL username'
DATABASE_PASSWORD = ' AWS RDS MySQL password'
DATABASE_SCHEMA = 'snapsense or whatever you called it'

AWS_ACCESS_KEY_ID = 'e.g. AKIAIOSFODNN7EXAMPLE '
AWS_SECRET_ACCESS_KEY = `e.g. wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY '
AWS_REGION = 'e.g. ap-south-1'
AWS_S3_BUCKET = 'e.g. snapsensebucket'

MAIL_AUTH_EMAIL = 'e.g. snapsense@gmail.com'
MAIL_AUTH_PW = 'e.g. gmailpassword123'

ACCESS_TOKEN_SECRET_KEY = 'e.g. random stuff fsdlkfsdlfjsd'

FRONTEND_URL = http://localhost:3000
BACKEND_URL = http://localhost:5000/graphql
```

5. Ensure you have the latest packages installed by running `npm install` within both the `frontend` and `backend`.

You may also want to log into your GMail account on the server that is running the backend to ensure it doesn't require any authentication key.

## Database Instructions

Follow [this guide](https://www.digitalocean.com/community/tutorials/how-to-install-mysql-on-ubuntu-20-04) or something similar to set up a MySQL database. You may want to create a local test and development server and create the production one on AWS.

To create the databases locally, ensure you have MySQL installed and then do the following:

1. Run `npx sequelize-cli db:drop` to remove your old database **(optional)**
2. Run `npx sequelize-cli db:create` to create your database from the specification
3. Run `npx sequelize-cli db:migrate` to run all the migrations and set up the database properly

The database should now work. You'll probably also want to seed it by running `npx sequelize-cli db:seed:all`

You can do this with a single command in the backend `npm run db:setup`.

## Running Application

To run the frontend, `cd frontend && npm start`

To run the backend, `cd backend && npm start`

Optionally, you can run both the backend and frontend by running `npm run start` in the root of the project although having the frontend and backend running in seperate terminal windows is preferred.

## Testing

You can run the frontend tests by calling `npm test` in the frontend folder.

You can run the backend tests by calling `npm test` in the backend folder.

## Simple Deployment (AWS Free Tier)

The client has particular deployment needs, so deployment can be more tricky to setup but this guide covers it in detail. You can also find guides for some of these steps online.

### Prerequisites

- An Amazon AWS Account with up to date billing information.
- An S3 Bucket with Public Read privileges [Support Link](https://aws.amazon.com/premiumsupport/knowledge-center/read-access-objects-s3-bucket/)
- An EC2 Instance (Instructions for Ubuntu Instance) [Support Link](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/EC2_GetStarted.html)
- An RDS Database cluster with public endpoint access [Support Link](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/CHAP_Tutorials.WebServerDB.CreateDBInstance.html)
- All services must be in the same **REGION**
- EC2 with `PM2`, `NGINX`, `NODE`, `NPM`, `GIT` installed [Support Link](https://www.youtube.com/watch?v=rE8mJ1OYjmM&t=1660s)

### Procedure

- Setup RDS credentials
- Store Database credentials and API endpoint in `config/config.json`
- Make sure the root `.env` file contains the correct **AWS** configuration details
- Login to the EC2 and `git clone` the repo
- `cd` into the folder (ex: snapsense)
- run `cd frontend && npm i`
- run `npm run build`
- run `cd ../ && cd backend && npm i`
- run `cd /etc/nginx/sites-available`
- run `sudo nano default`
- Paste the following nginx configurations in the file

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
- Save the file
- run `cd /home/ubuntu/`
- run `mkdir  snapsense_production`
-  run `cd /home/ubuntu/snapsense/frontend`
-  run `cp –r build/* /home/ubuntu/snapsense_production/
-  run  `git  stash`
- run `systemctl  sudo restart nginx`
- run `cd /home/ubuntu/snapsense/backend/`
- run `pm2 start server.js --name server`
- The App should now be running on the EC2 public URL

### Continuous Deployment / Integration (_Optional_)

(_Optional_) You could even go further and setup CI/CD for your application. For continuous deployment we are using GitHub actions to connect to the AWS EC2 instance on any changes to our master branch and then we perform a series of commands on the server itself.

In order to setup CD from GitHub:

- Add the **AWS_REGION**, **ACCESS_KEY_ID**, **AWS_SECRET_ACCESS_KEY** , **INSTANCE_ID** secrets to GitHub Secrets for your repository.
- In your server make sure you have setup ssh keys for your git account
- Go to the Actions tab and setup a new Workflow
- Name the new file `deploy.yml` and paste the following in it

```name: AWS SSM Send-Command Example

on:
  push:
    branches: [master]

jobs:
  start:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v2

      - name: AWS SSM Send-Command
        uses: peterkimzz/aws-ssm-send-command@master
        id: ssm
        with:
          aws-region: ${{ secrets.AWS_REGION }}
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          instance-ids: ${{ secrets.INSTANCE_ID }}

          working-directory: /home/ubuntu/snapsense
          command: /bin/sh ./deploy.sh
          comment: Done Gracefully

      # Catch SSM outputs
      - name: Get the outputs
        run: echo "The Command id is ${{ steps.ssm.outputs.command-id }}"
```

- Add a new file named `deploy.sh` in the root of the repository and add the following commands in it

```
#!/bin/sh
eval ssh-agent -s
ssh-add /home/ubuntu/keys/id_snap_gmail
sudo systemctl restart nginx
pm2 stop server
git pull
cd backend
npm install
cd ../ && cd frontend && npm  I
npm run build
rm –rf /home/ubuntu/snapsense_production
mkdir /home/ubuntu/snapsense_production
cp –r build/* /home/ubuntu/snapsense_production/
git stash
pm2 restart server
```

- And continuous integration is now setup.

## Default Access Credentials

We seed the database with some basic accounts and data so you can try out the application more easily. Here are the details:

- **Patient** - Email: patient1@gmail.com / patient2@gmail.com
- **Doctor** - Email: doctor1@nhs.net / doctor2@nhs.net
- **Admin** - Email: admin1@gmail.com / admin2@gmail.com
- **Superadmin** - Email: snapsense@gmail.com

Passwords for all these accounts is simply `Password123`

## Other

If you require a more detailed setup guide, checkout the Developer Setup Instructions PDF which is included in this repository.

This project has a Trello board which can be viewed [here.](https://trello.com/b/RinZfAWQ/seg-large-group-project)

Notes related to this project are kept [here.](https://emckclac-my.sharepoint.com/:f:/r/personal/k1925171_kcl_ac_uk/Documents/CS%20G401/Year%202/Term%202/Software%20Engineering%20Group%20Project/SEG%20Large%20Group%20Project?csf=1&web=1&e=Il0jLi)
