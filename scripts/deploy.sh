#!/usr/bin/env bash

# tar -zcvf ../package/release.tar ./dist ./package.json ./procfile.js

scp -r ./dist root@119.45.31.41:/root/apps/assitant
scp -r ./procfile.js root@119.45.31.41:/root/apps/assitant
scp -r ./package.json root@119.45.31.41:/root/apps/assitant