const getPopularToppingsWebhook = "ProtectPatients"; // <webhook url>?secret=<secret>

const stitch = require("mongodb-stitch"); // Set-up the MongoDB connection
const chance = require("chance").Chance(); // Package for random variables

// Seeds for the random data
const LOCATIONS = ["Optel L1", "Optel L2", "VedioJet L3","Optel L4", "Optel L5", "VedioJet L6"];

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

const BatchNum = ["blister", "bottle", "carton", "pack", "case"];

//generateReceipts();
generateProduct();

function generateProduct() {
   
   var rxprod = chance.weighted(PRODUCTS, [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]);
   var rxbatchnum = Date.getDay() + rxprod;
  // Create a random pizza order
  //const receipt = {
  const product = {
    timestamp: Date.now(),
	ManufactureDate: Date.getDate(),
	Expity: Date.setDate(Date.getDate()+3000),
	Batch: rxbatchnum,
    customerName: chance.name({ nationality: "en" }),
    SerialNumber: chance.cc(),
    location: chance.weighted(LOCATIONS, [2, 5, 3]),
    size: chance.weighted(SIZES, [1, 2, 3, 4, 5]),    
	products: rxprod,
    total: parseFloat(chance.normal({ mean: 20, dev: 3 }).toFixed(2))
  };

  var fx = JSON.stringify(product);
  console.log(fx);
  
  // Post the order to the addOrder webhook
  //fetch(getPopularToppingsWebhook, {
 
}

function randomDelay(fn) {
  // Wait for up to one second before executing the given function
  setTimeout(fn, chance.integer({ min: 0, max: 4000 }));
}
