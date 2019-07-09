
var friendsData = require("../data/friends");
var fs = require("fs");

  
  
  module.exports = function(app) {
  
    app.get("/api/friends", function(req, res) {
      res.json(friendsData);
    });

    // If no matching route is found default to home
    app.post("/api/friends", function(req, res) {
      friendsData.push(req.body);
    
      console.log(req.body);
      res.json(true);
    });

  }