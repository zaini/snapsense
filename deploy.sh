#!/bin/sh

eval `ssh-agent -s`
ssh-add /home/ubuntu/keys/id_snap_gmail
pm2 stop server
git pull
git checkout main
git pull
cd backend
npm install
npm run db:setup
git stash
pm2 restart server
cd /home/ubuntu/snapsense_production
git pull 
sudo systemctl restart nginx
