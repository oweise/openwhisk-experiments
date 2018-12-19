#!/usr/bin/env bash

SCRIPT_DIR=$(cd `dirname $0` && pwd)

cd $SCRIPT_DIR/find-people-by-name
rm -rf node_modules
npm install
zip -r ../find-people-by-name.zip *

cd $SCRIPT_DIR/find-people-by-mail
rm -rf node_modules
npm install
zip -r ../find-people-by-mail.zip *

cd $SCRIPT_DIR/store-people
rm -rf node_modules
npm install
zip -r ../store-people.zip *

cd $SCRIPT_DIR/conductor
rm -rf node_modules
npm install
zip -r ../conductor.zip *

cd $SCRIPT_DIR
wskdeploy -m manifest.yaml
