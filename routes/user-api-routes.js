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

  app.get("/api/work/:id/:tag", function(req, res) {
    db.Work.findAll({
      where: {
        [Op.or]: [{tagOne: req.params.tag}, {tagTwo: req.params.tag}, {tagThree: req.params.tag}],
        UserId: req.params.id
      },
    }).then(function(dbWork) {
      res.json(dbWork);
    });
  });

  app.get("/api/experience/:id/:tag", function(req, res) {
    db.Experience.findAll({
      where: {
        [Op.or]: [{tagOne: req.params.tag}, {tagTwo: req.params.tag}, {tagThree: req.params.tag}],
        UserId: req.params.id
      },
    }).then(function(dbExperience) {
      res.json(dbExperience);
    });
  });

};



















