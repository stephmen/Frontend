#!/bin/bash
echo This is the Apollo Server endpoint:
echo PRODENDPOINT='"'$PRODENPOINT'"'
echo PRODENDPOINT='"'$PRODENPOINT'"' >> config/dev.env
npm run build
