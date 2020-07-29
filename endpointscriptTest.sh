#!/bin/bash
ls -all config/test.env
echo This is the Apollo Server endpoint:
cat config/test.env 
npm run build
npm run start
