const getProductsWebhook ="https://webhooks.mongodb-stitch.com/api/client/v2.0/app/pdash-vokvd/service/ProductionAPI/incoming_webhook/addProduct?secret=rxproducts";

// <webhook url>?secret=<secret>

const stitch = require("mongodb-stitch"); // Set-up the MongoDB connection
const chance = require("chance").Chance(); // Package for random variables

// Seeds for the random data
//const LOCATIONS = ["Optel L1", "Optel L2", "VedioJet L3","Optel L4", "Optel L5", "VedioJet L6"];
const LOCATIONS = ["Optel L1", "Optel L2", "VedioJet L3"];

const PRODUCTS = [
  "Humira",
  "Crestor",
  "Enbrel",
  "Neulasta",
  "Spiriva",
  "Januvia",
  "Lyrica",
  "Truvada",
  "Levemir",
  "Cialis"
];
const SIZES = ["blister", "bottle", "carton", "pack", "case"];

const quantity = [10,25,50,100,200];



//generateReceipts();
generateProduct();

function generateProduct() {
   
   var rxprod = chance.weighted(PRODUCTS, [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]);
   var rxbatchnum = "THURS-" + rxprod;
   
   var qualitycheck = "yes"; 
   var miscinf = "misc"; 
   
  // Create a random pizza order
  //const receipt = {
 //quantity:chance.weighted(quantity, [1, 2, 3, 4, 5]),
	
  const product = {
    timestamp: Date.now(),
	ManufacturingDate: Date.now(),
	ExpiryDate: Date.now(),
	Batch: rxbatchnum,
    SerialNumber: chance.cc(),
    location: chance.weighted(LOCATIONS, [2, 5, 3]),
    size: chance.weighted(SIZES, [1, 2, 3, 4, 5]),   
	productname: rxprod,		
	quantity:parseFloat(chance.normal({ mean: 20, dev: 3 }).toFixed(2)),
	qualitycheck:qualitycheck,
    MiscInfo: miscinf
  };

  // Post the order to the addOrder webhook
  //fetch(getPopularToppingsWebhook, {
  fetch(getProductsWebhook, {
    method: "POST",
    mode: "CORS",
    // The webhook handler expects the body to be stringified JSON
    body: JSON.stringify(product)
  })
    .then(response => response.json())
    .then(res => {
      // Log a successful order and generate another	  
      console.log(res);	  	  
      randomDelay(generateProduct);
    })
    .catch(err => console.error(" DJAY went Wrong .."+err));
}

function randomDelay(fn) {
  // Wait for up to one second before executing the given function
  setTimeout(fn, chance.integer({ min: 0, max: 4000 }));
}
