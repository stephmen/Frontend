#!/bin/bash
ls -all config/prod.env
echo This is the Apollo Server endpoint:
cat config/prod.env 
npm run build
npm run start
