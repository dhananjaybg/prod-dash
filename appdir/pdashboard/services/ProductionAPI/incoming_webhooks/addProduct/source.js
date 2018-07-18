exports = function(payload, response) {
  // Connect to MongoDB Atlas
  var atlas = context.services.get('mongodb-atlas');
  var products = atlas.db("ProductionReporting").collection("Products");
  
  // Parse the stringified JSON body into an EJSON object
  var prodstr = payload.body.text();
  var prod = EJSON.parse(prodstr);
  
  // The insertOne method will only succeed if the collection write rule evaluates to true
  products.insertOne(prod).then(a => {
    // If all went according to plan, return a response object
    response.setStatusCode(201);   // 201 - Resource Created
    response.setBody(prodstr); // Response body is the order document that was just inserted
  });
  
};