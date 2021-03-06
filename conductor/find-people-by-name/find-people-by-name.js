const mongodb = require('mongodb');
const mongo_uri = 'mongodb://userDDP:vEyVqSR1QEbKbfS4@mongodb.openwhisk.svc:27017?authMechanism=DEFAULT&authSource=users';

async function getClient(uri) {
  return await mongodb.MongoClient.connect(uri, {useNewUrlParser: true});
}

async function loadDoc(last, first) {
  const client = await getClient(mongo_uri);
  const db = await client.db('users');
  return await db.collection('users').findOne({
    "$and": [
      {"name.last":last},
      {"name.first": first}
    ]
  });
}

function main(args) {
  return loadDoc(args.last, args.first)
    .then(function(result) {
        if (result != null) {
          return {doc: result};
        }
        else {
          return {};
        }
    })
}

exports.main = main;
