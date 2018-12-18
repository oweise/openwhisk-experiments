#!/usr/bin/env bash

for f in ../people/*.json; do
  curl --insecure \
  --header "Content-Type: application/json" \
  --data "$(cat $f)" \
  https://openwhisk-openwhisk.192.168.99.100.nip.io/api/v1/web/whisk.system/web-action/store-people
done
