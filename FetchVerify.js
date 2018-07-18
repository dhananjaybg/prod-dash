const appId = "pdash-vokvd";

 const clientPromise = stitch.StitchClientFactory.create(appId);

         let client;
         let db;
         function displayCommentsOnLoad() {
             clientPromise.then(stitchClient => {
                 client = stitchClient;
                 db = client.service('mongodb', 'mongodb-atlas').db('Production');
                 return client.login().then(displayComments)
             });
         }

         function displayComments() {
             db.collection('comments').find({}).limit(1000).execute().then(docs => {
                 var html = docs.map(c => "<div>" + c.comment + "</div>").join("");
                 document.getElementById("comments").innerHTML = html;
             });
         }
         
         function addComment() {
             var foo = document.getElementById("new_comment");
             db.collection("comments").insertOne({owner_id : client.authedId(), comment: foo.value}).then(displayComments);
             foo.value = "";
         }
		 
		 function fverify() {
            console.log("FetchVerify");
			var list = displayCommentsOnLoad();
         }
         