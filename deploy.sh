#!/bin/sh

eval `ssh-agent -s`
ssh-add /home/ubuntu/keys/id_snap_gmail
git pull
sudo systemctl restart nginx
pm2 stop server
cd /home/ubuntu/snapsense
git checkout main
git pull
cd backend
npm install
git stash
npm run db:setup
git stash
pm2 restart server
