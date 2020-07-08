#!/bin/bash
echo PRODENDPOINT='"'$prodEndpoint'"' >> config/dev.env
npm run build
