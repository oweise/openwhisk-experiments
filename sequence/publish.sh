#!/usr/bin/env bash

SCRIPT_DIR=$(cd `dirname $0` && pwd)

cd $SCRIPT_DIR/find-people
rm -rf node_modules
npm install
zip -r ../find-people.zip *

cd $SCRIPT_DIR/store-people
rm -rf node_modules
npm install
zip -r ../store-people.zip *

cd $SCRIPT_DIR
wskdeploy -m manifest.yaml
