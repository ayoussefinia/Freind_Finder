
var friendsData = require("../data/friends");
var fs = require("fs");

//function for calculating the sum of elements in an array
const arrSum = arr => arr.reduce((a,b) => a + b, 0)
const arrMin = arr => Math.min(...arr);
  
  module.exports = function(app) {
  
    app.get("/api/friends", function(req, res) {
      res.json(friendsData);
    });

    // If no matching route is found default to home
    app.post("/api/friends", function(req, res) {
      var differenceArr = [];
      var userChoices = req.body.scores;
      
      // console.log(userChoices);
      
      // for(i=0; i<friendsData.length; i++) {
      //   var comparison = f
      //   console.log(friendsData[i].scores);
      // }
      for(i=0; i<friendsData.length; i++) {
        var comparisonArr = [];
        for(j=0;j<userChoices.length; j++) {
          var diff = Math.abs(Number(userChoices[j])-Number(friendsData[i].scores[j]));
          comparisonArr.push(diff);
        }
        var totalDiff = arrSum(comparisonArr)
        // var name = friendsData[i].name;
        differenceArr.push(totalDiff);
      }

      friendsData.push(req.body);
      var minDiff = arrMin(differenceArr);
      var diffIndex =  differenceArr.indexOf(minDiff);


      var friendName =  friendsData[diffIndex].name;
      var friendPic =   friendsData[diffIndex].photo;

      // alert(friendPic, friendName);
      var friendObj = {
        "name": friendName,
        "image": friendPic
      };

      console.log(friendsData.length);
      console.log("differences Arr: " ,  differenceArr);
      console.log(diffIndex);

      // console.log("total ", totalDiff);
      // console.log("comparison Arr:" , comparisonArr);
      // console.log(friendsData);
      // console.log(req.body);
      res.json(friendObj);
    });

  }