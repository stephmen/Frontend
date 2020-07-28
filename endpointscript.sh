#!/bin/bash
ls -all config/dev.env
echo This is the Apollo Server endpoint:
echo PRODENDPOINT='"'$PRODENDPOINT'"'
echo PRODENDPOINT='"'$PRODENDPOINT'"' >> config/dev.env
echo Content from config/env
cat config/dev.env 
npm run build
