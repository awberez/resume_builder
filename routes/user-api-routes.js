var db = require("../models");
var Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = function(app) {

  app.post("/api/login", function(req, res) {
    console.log(req.body);
    db.User.findOne({
      where: {
        email: req.body.email,
        password: req.body.password
      }
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  });

  app.post("/api/register", function(req, res) {
    db.User.findOne({
      where: {
        email: req.body.email
      }
    }).then(function(dbUser) {
      console.log(dbUser);
      if (!dbUser) {
        db.User.create(req.body).then(function(dbUser) {
          console.log("newUser");
          console.log(dbUser);
          res.json(dbUser);
        });
      }
      else res.json(false);
    });
  });

  app.post("/api/work", function(req, res) {
    db.Work.create(req.body).then(function(dbWork) {
      res.json(dbWork);
    });
  });

  app.post("/api/experience", function(req, res) {
    db.Experience.create(req.body).then(function(dbExperience) {
      res.json(dbExperience);
    });
  });

  app.post("/api/education", function(req, res) {
    db.Education.create(req.body).then(function(dbEducation) {
      console.log(dbEducation);
      res.json(dbEducation);
    });
  });

};











