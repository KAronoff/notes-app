const express = require("express");
const connection = require("./database/connection");
const path = require("path");

const htmlroutes = require("./routes/htmlroutes");
const apiroutes = require("./routes/apiroutes")

// create server using express
const app = express();
const PORT = process.env.PORT || 3000;

// set up middleware
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static("public"));

// routes
apiroutes(app);
htmlroutes(app);

app.listen(PORT, function() {
  console.log("Now listening on PORT: ", PORT);
});
