#!/bin/bash
ls -all config/dev.env
echo This is the Apollo Server endpoint:
cat config/dev.env 
npm run build
npm run start
