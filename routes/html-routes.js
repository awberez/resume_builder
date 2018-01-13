// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");
var db = require("../models");
var Sequelize = require('sequelize');
const Op = Sequelize.Op;
// Routes
// =============================================================
module.exports = function(app) {

  // Each of the below routes just handles the HTML page that the user gets sent to.

  // index route loads view.html

app.get("/", function(req, res) {
    res.render("login", {layout: false});
});

app.get("/experience/:id", function(req, res) {
  // Handlebars 
  //res.render("experience");
  db.User.findOne({
      where: {
        id: req.params.id,
      }
    }).then(function(dbUser) {
      res.render("experience", { user: dbUser });
    });
});

app.get("/skills/:id", function(req, res) {
  // Handlebars 
  //res.render("skills");
  db.User.findOne({
      where: {
        id: req.params.id,
      }
    }).then(function(dbUser) {
    res.render("skills", { user: dbUser });
    });
});

app.get("/education/:id", function(req, res) {
  // Handlebars 
  //res.render("build");
  db.User.findOne({
      where: {
        id: req.params.id,
      }
    }).then(function(dbUser) {
    res.render("education", { user: dbUser });
    });
});

/*app.get("/buildresume/:id", function(req, res) {
  // Handlebars 
  //res.render("build");
  db.User.findOne({
      where: {
        id: req.params.id,
      }
    }).then(function(dbUser) {
    res.render("build", { user: dbUser });
    });
});*/

app.get("/buildresume/:id", function(req, res) {
  db.User.findOne({
    where: {
      id: req.params.id,
    }
  }).then(function(dbUser) {
    db.Experience.findAll({
      attributes: [
        "tagOne", "tagTwo", "tagThree"
      ],
      where: {
        UserId: req.params.id
      },
    }).then(function(dbExperience) {
      db.Education.findAll({
        attributes: [
          "tagOne", "tagTwo", "tagThree"
        ],
        where: {
          UserId: req.params.id
        },
      }).then(function(dbEducation) {
        db.Work.findAll({
          attributes: [
            "tagOne", "tagTwo", "tagThree"
          ],
          where: {
            UserId: req.params.id
          },
        }).then(function(dbWork) {
          var data = {
            expTags: dbExperience,
            eduTags: dbEducation,
            workTags: dbWork
                  }
          var dataTags = {};
          for (let object of data.expTags) {
            if (object.tagOne != "") dataTags[object.tagOne] = object.tagOne;
            if (object.tagTwo != "") dataTags[object.tagTwo] = object.tagTwo;
            if (object.tagThree != "") dataTags[object.tagThree] = object.tagThree;
          }
          for (let object of data.eduTags) {
            if (object.tagOne != "") dataTags[object.tagOne] = object.tagOne;
            if (object.tagTwo != "") dataTags[object.tagTwo] = object.tagTwo;
            if (object.tagThree != "") dataTags[object.tagThree] = object.tagThree;
          }
          for (let object of data.workTags) {
            if (object.tagOne != "") dataTags[object.tagOne] = object.tagOne;
            if (object.tagTwo != "") dataTags[object.tagTwo] = object.tagTwo;
            if (object.tagThree != "") dataTags[object.tagThree] = object.tagThree;
          }
          var tagArr = [];
          for (let tag in dataTags) tagArr.push({ "tag": tag } );
          res.render("build", { user: dbUser, tags: tagArr });
        });
      });
    });
  });
});

};











