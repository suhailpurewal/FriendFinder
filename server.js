// putting require files for webserver & app
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

var app = express();
var PORT = process.env.PORT || 3000;
// not sure which one i needed, so pasted a bunch of ones from the npm documentation
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type:'application/vnd.api+json'}));

require('./app/routing/apiRoutes.js')(app); 
require('./app/routing/htmlRoutes.js')(app);


app.listen(PORT, function() {
	console.log("App listening on PORT: " + PORT);
});

