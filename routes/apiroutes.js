var connection = require("../database/connection");

function apiroutes (app){
  

  app.get("/api/notes", function(req, res){
    connection.query("SELECT * FROM tables", function(err, dbNotes){
      if (err) throw err;

      res.json(dbNotes);
    });
  });

  app.post("/api/notes", function(req, res){
    connection.query("INSERT INTO tables SET ?", [req.body], function(err, result){
      if (err) throw err;

      res.json(result);
    });
  })

  app.get("/api/notes/:id", function(req, res){

    connection.query("SELECT * FROM tables WHERE id = ?", [req.params.id], function(err, result){
      if (err){
        return res.json(err);
      }
      res.json(result);
    })
  })

  app.put("/api/notes/:id", function(req, res){
    connection.query("UPDATE tables  SET ? WHERE id = ?", [req.body, req.params.id], function(err, result){
      if (err){
        return res.json(err);
      }
      res.json(result);
    })
  })

  app.delete("/api/notes/:id", function(req, res){
    connection.query("DELETE FROM tables WHERE id = ?", [req.params.id],function(err, result){
      if (err) throw err;

      res.json(result);
    });
  });
  
}

module.exports = apiroutes;