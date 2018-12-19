OpenWhisk Examples
==================

NodeJS Examples from the talk "Serverless on Kubernetes".

- web-action: Demo #1, a simple web action
- web-to-db: Demo #2, storing user input to MongoDB
- sequence: Demo #3, A fixed sequence of actions
- conductor: Demo #4, A conductor-controlled sequence of actions
- people: Some JSON data from fictional people to work with


Prerequisites
-------------

- Needs an installed OpenWhisk framework
- Needs the wsk and wskdeploy CLI tools
- Needs a MongoDB. Connection/Credentials currently hardcoded as: "mongodb://userDDP:vEyVqSR1QEbKbfS4@mongodb.openwhisk.svc:27017?authMechanism=DEFAULT&authSource=users". (No, these are no production credentials, just what my minishift-hosted MongoDB auto-generated) Change like appropriate.
- Needs a MongoDB database named "users", collection "users" containing the people definitions from folder "people"


Instructions Demo #1
--------------------

Execute from folder "web-action".

### Upload action
```
wsk package create web-action
wsk action create web-action/receive-people receive-people.js --web yes
```
### Call action
```
curl -v --insecure -X POST   https://<host>/api/v1/web/whisk.system/web-action/receive-people -H 'Content-Type: application/json' --data @../people/1.json
```

### Analyze activations
```
wsk activation list --limit 5
wsk activation get <id>
```

Instructions Demo #2
--------------------

Execute from folder "web-to-db".

### Upload action
```
./publish.sh
```

### Call action
```
curl -v --insecure -X POST   https://<host>/api/v1/web/whisk.system/web-action/store-people -H 'Content-Type: application/json' --data @../people/1.json
```

Instructions Demo #3
--------------------

Execute from folder "sequence".

### Upload action
```
./publish.sh
```

### Call action
```
curl -v --insecure -X POST   https://<host>/api/v1/web/whisk.system/web-action-sequence/find-and-store-people   -H 'Content-Type: application/json' --data @query1.json
curl -v --insecure -X POST   https://<host>/api/v1/web/whisk.system/web-action-sequence/find-and-store-people   -H 'Content-Type: application/json' --data @query2.json
```

Instructions Demo #4
--------------------

Execute from folder "conductor".

### Upload action
```
./publish.sh
```

### Call action
```
curl -v --insecure -X POST   https://<host>/api/v1/web/whisk.system/web-action-sequence/find-and-store-people   -H 'Content-Type: application/json' --data @query1.json
curl -v --insecure -X POST   https://<host>/api/v1/web/whisk.system/web-action-sequence/find-and-store-people   -H 'Content-Type: application/json' --data @query2.json
```
