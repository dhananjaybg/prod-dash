const MongoClient = require('mongodb').MongoClient;

const uri = "mongodb+srv://dataloader:mypassword@cluster0-girti.mongodb.net/admin";

MongoClient.connect(uri, function(err, client) {

   const collection = client.db("ProductionReporting").collection("Products")   
   //var myquery = "{'SerialNumber' : '4080786488975706'}"   
	var res = FindAll(collection, client )
	//PingEach(res, collection, client)
    console.log("connected now close")
   //client.close();
});


function FindAll(coll,client) {
  console.log("Verified 11 888 FROM Node JS ...");  
  
  coll.find( { $and: [ {'quantity' : 10, 'size': 'case'}]}).toArray(function(err, results) {
	  //console.log(results)
	  // send HTML file populated with quotes here
	  
		for(var val of results) {
			//setInterval(print, Math.random()*1000)
			console.log("\n---------")
			console.log(val['SerialNumber'])
			var obj = {'SerialNumber':""};
			obj.SerialNumber = val['SerialNumber'];			
			//console.log(obj)			
			coll.find(obj).toArray(function(err, resultsX) { 
			
			
			console.log(resultsX)
			})
			
			
			var waitTill = new Date(new Date().getTime() + 10 * 1000);
			while(waitTill > new Date()){}
				 
			console.log("----firing after wait ..-----\n")
			
			
		}
	  client.close();
	  
	})
	
  
}

function PingEach() {
  console.log("\n\n\nVerifyLatercall");
  //alert("VerifyLatercall");
  //client.close();
}