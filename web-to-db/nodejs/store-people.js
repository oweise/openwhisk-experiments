const mongodb = require('mongodb');
const mongo_uri = 'mongodb://userDDP:vEyVqSR1QEbKbfS4@mongodb.openwhisk.svc:27017?authMechanism=DEFAULT&authSource=users';

async function getClient(uri) {
  return await mongodb.MongoClient.connect(uri, {useNewUrlParser: true});
}

async function storeDoc(doc) {
  const client = await getClient(mongo_uri);
  const db = await client.db('users');
  const docs = await db.collection('stored').insertOne(doc);
  return doc;
}

async function main(args) {
  var doc = {
    name: args.name.last + ", " + args.name.first
  }
  var returnedDoc = await storeDoc(doc)
  .then(
    function(result){return {body: result}},
    function(err){
      console.error(err);
      return {statusCode: 500, body: JSON.stringify(err)};
    }
  )
}

exports.main = main;