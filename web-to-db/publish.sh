#!/usr/bin/env bash

cd $(dirname "$0")/nodejs
rm -rf node_modules
npm install
zip -r ../app.zip *
cd ..
wsk -i action update web-action/store-people \
  app.zip \
  --web yes \
  --kind nodejs:8
