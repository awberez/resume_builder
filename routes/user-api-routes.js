const db = require("../models"), Sequelize = require('sequelize'), Op = Sequelize.Op;

module.exports = (app)=>{

  app.post("/api/login", (req, res)=>{
    db.User.findOne({
      where: {
        email: req.body.email,
        password: req.body.password
      }
    }).then((dbUser)=>{
      res.json(dbUser);
    });
  });

  app.post("/api/register", (req, res)=>{
    db.User.findOne({
      where: {
        email: req.body.email
      }
    }).then((dbUser)=>{
      if (!dbUser) {
        db.User.create(req.body).then((dbUser)=>{
          res.json(dbUser);
        });
      }
      else res.json(false);
    });
  });

  app.post("/api/work", (req, res)=>{
    db.Work.create(req.body).then((dbWork)=>{
      res.json(dbWork);
    });
  });

  app.post("/api/experience", (req, res)=>{
    db.Experience.create(req.body).then((dbExperience)=>{
      res.json(dbExperience);
    });
  });

  app.post("/api/education", (req, res)=>{
    db.Education.create(req.body).then((dbEducation)=>{
      res.json(dbEducation);
    });
  });

};











