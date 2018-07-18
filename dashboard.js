const appId = "pdash-vokvd";

const statusMessage = document.getElementById("auth-type-identifier");
const loginForm = document.getElementById("login-form");
const logoutButton = document.getElementById("logout-button");

var stitchClient;
stitch.StitchClientFactory.create(appId)
  .then(client => {
    stitchClient = client;
    if (stitchClient.authedId()) {
      stitchClient.logout()
    }
  })
  .catch(err => console.error(err));

function handleLogin() {
  getLoginFormInfo()
    .then(user => emailPasswordAuth(user.email, user.password))
    .then(() => build(Date.now()))
    .catch(err => console.error(err));
}

// Authenticate with Stitch as an email/password user
function emailPasswordAuth(email, password) {
  if (stitchClient.authedId()) {
    return hideLoginForm()
  }
  return stitchClient.login(email, password)
           .then(hideLoginForm)
           .then(revealDashboardContainer)
           .catch(err => console.error('e', err))
}

//function getPopularToppings() {
function getProducts() {
  return stitchClient.executeFunction("getProducts");
}

//function getSalesTimeline(start, end) {
function getProductionTimeline(start, end) {
  return stitchClient.executeFunction("ProductionTimeline", start, end);
}



/* 
  Instantiate and refresh the data in the dashboard
*/
function build(now) {
  // buildTable() and buildGraph() come from chart.js

  let tablePromise = getProducts()
    .then(buildTable)
    .catch(err => console.error(err));
	
	//console.log(" DJ 1.==>" + tablePromise);
  let graphPromise = getProductionTimeline(now - duration, now)  
    .then(buildGraph)
    .catch(err => console.error(err));

	//console.log(" DJ 2.==>" + graphPromise);

  Promise.all([tablePromise, graphPromise])
    .then(values => {
      let graphPromiseValue = values[1];
	  
      let salesLine = graphPromiseValue.salesLine;
      let path = graphPromiseValue.path;

      setTimeout(() => refresh(salesLine, path, Date.now()), 1000);
    })
    .catch(err => console.error(err));

}

function refresh(salesLine, path, now) {
  // refreshTable() and refreshGraph() come from chart.js
	//console.log("calling refresh..");

  let then = salesLine[salesLine.length - 1].timestamp * 1;

  let refreshTablePromise = getProducts()
    .then(refreshTable)
    .catch(err => console.error(err));
  let refreshGraphPromise = getProductionTimeline(then, now).then(newSalesTimeline =>
    refreshGraph(salesLine, path, newSalesTimeline)
  );
  Promise.all([refreshTablePromise, refreshGraphPromise])
    .then(values => {
      let refreshGraphPromiseValues = values[1];
      let refreshSalesLine = refreshGraphPromiseValues.salesLine;
      let refreshPath = refreshGraphPromiseValues.path;

      setTimeout(() => refresh(refreshSalesLine, refreshPath, Date.now()), 1000);
    })
    .catch(err => console.error(err));
}


/* UI Management Functions */
function getLoginFormInfo() {
  const emailEl = document.getElementById("emailInput");
  const passwordEl = document.getElementById("passwordInput");
  // Parse out input text
  const email = emailEl.value;
  const password = passwordEl.value;
  // Remove text from login boxes
  emailEl.value = "";
  passwordEl.value = "";
  return new Promise(resolve => resolve({ email: email, password: password }));
}

function hideLoginForm() {
  return stitchClient.userProfile().then(user => {
    // Hide login form
    loginForm.classList.add("hidden");
    // Set login status message
    statusMessage.innerText = "Logged in as: " + user.data.email;
  });
};

function revealDashboardContainer() {
  const container = document.getElementById("dashboard-container");
  container.classList.remove("hidden");
}