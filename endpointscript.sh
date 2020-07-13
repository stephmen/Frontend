#!/bin/bash
echo Creating dev.env
touch config/dev.env
chmod 777 config/dev.env
echo checking dev.env
ls -all config/dev.env
echo This is the Apollo Server endpoint:
echo PRODENDPOINT='"'$PRODENDPOINT'"'
echo PRODENDPOINT='"'$PRODENDPOINT'"' >> config/dev.env
npm run build
