#!/bin/bash
ls -all dev.env
echo This is the Apollo Server endpoint:
echo PRODENDPOINT='"'$PRODENDPOINT'"'
echo PRODENDPOINT='"'$PRODENDPOINT'"' >> config/dev.env
npm run build
