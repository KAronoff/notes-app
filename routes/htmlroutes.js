function htmlroutes (app){

  var path = require("path");
  
  app.get("/", function(req, res){
    // connect to index.html
    res.sendFile(path.join(__dirname, "../public/html/index.html"));
  });

  app.get("/notes", function(req, res){
    res.sendFile(path.join(__dirname, "../public/html/notes.html"));
  });
}

module.exports = htmlroutes;