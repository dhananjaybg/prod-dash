const stitch = require("mongodb-stitch")
const clientPromise = stitch.StitchClientFactory.create('productiondash-yuyhk');
clientPromise.then(client => {
  const db = client.service('mongodb', 'mongodb-atlas').db('ProductionReporting');
  client.login().then(() =>
    db.collection('Products').updateOne({owner_id: client.authedId()}, {$set:{number:42}}, {upsert:true})
  ).then(() =>
    db.collection('Products').find({owner_id: client.authedId()}).limit(100).execute()
  ).then(docs => {
    console.log("Found docs", docs)
    console.log("[MongoDB Stitch] Connected to Stitch")
  }).catch(err => {
    console.error(err)
  });
});