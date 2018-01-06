var db = require("../models");
var Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = function(app) {

  app.get("/api/login/:user/:password", function(req, res) {
    db.User.findOne({
      where: {
        userName: req.params.user,
        password: req.params.password
      }
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  });

  app.post("/api/users/:user", function(req, res) {
    db.User.findOne({
      where: {
        userName: req.params.user
      }
    }).then(function(dbUser) {
      if (!dbUser) {
        db.User.create(req.body).then(function(dbUser) {
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

  app.get("/api/work/:tag", function(req, res) {
    db.Work.findAll({
      where: {
        [Op.or]: [{tagOne: req.params.tag}, {tagTwo: req.params.tag}, {tagThree: req.params.tag}]
      },
      include: [db.User]
    }).then(function(dbWork) {
      res.json(dbWork);
    });
  });

};



















