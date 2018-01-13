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

  app.get("/api/education/:id/:tag", function(req, res) {
    db.Education.findAll({
      where: {
        [Op.or]: [{tagOne: req.params.tag}, {tagTwo: req.params.tag}, {tagThree: req.params.tag}],
        UserId: req.params.id
      },
    }).then(function(dbEducation) {
      res.json(dbEducation);
    });
  });

  app.get("/api/tags/:id/", function(req, res) {
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
          res.json(dataTags);
        });
      });
    });
  });

};











