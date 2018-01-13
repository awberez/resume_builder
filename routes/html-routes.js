const path = require("path"), db = require("../models"), Sequelize = require('sequelize'), Op = Sequelize.Op;
 
module.exports = (app)=>{

  app.get("/", (req, res)=>{
      res.render("login", {layout: false});
  });

  app.get("/experience/:id", (req, res)=>{
    db.User.findOne({
        where: {
          id: req.params.id,
        }
      }).then((dbUser)=>{
        res.render("experience", { user: dbUser });
      });
  });

  app.get("/skills/:id", (req, res)=>{
    db.User.findOne({
        where: {
          id: req.params.id,
        }
      }).then((dbUser)=>{
        res.render("skills", { user: dbUser });
      });
  });

  app.get("/education/:id", (req, res)=>{
    db.User.findOne({
        where: {
          id: req.params.id,
        }
      }).then((dbUser)=>{
        res.render("education", { user: dbUser });
      });
  });

  app.get("/buildresume/:id", (req, res)=>{
    db.User.findOne({
      where: {
        id: req.params.id,
      }
    }).then((dbUser)=>{
      db.Experience.findAll({
        attributes: [
          "tagOne", "tagTwo", "tagThree"
        ],
        where: {
          UserId: req.params.id
        },
      }).then((dbExperience)=>{
        db.Education.findAll({
          attributes: [
            "tagOne", "tagTwo", "tagThree"
          ],
          where: {
            UserId: req.params.id
          },
        }).then((dbEducation)=>{
          db.Work.findAll({
            attributes: [
              "tagOne", "tagTwo", "tagThree"
            ],
            where: {
              UserId: req.params.id
            },
          }).then((dbWork)=>{
            let data = { expTags: dbExperience, eduTags: dbEducation, workTags: dbWork }, dataTags = {}, tagArr = [];
            getTags(data.expTags, dataTags);
            getTags(data.eduTags, dataTags);
            getTags(data.workTags, dataTags);
            for (let tag in dataTags) tagArr.push({ "tag": tag, "id": dbUser.id } );
            res.render("build", { user: dbUser, tags: tagArr });
          });
        });
      });
    });
  });

  app.get("/resume/:id/:tag", (req, res)=>{
    db.User.findOne({
        where: {
          id: req.params.id,
        }
      }).then((dbUser)=>{
        db.Work.findAll({
          where: {
            [Op.or]: [{tagOne: req.params.tag}, {tagTwo: req.params.tag}, {tagThree: req.params.tag}],
            UserId: req.params.id
          },
        }).then((dbWork)=>{
          db.Experience.findAll({
            where: {
              [Op.or]: [{tagOne: req.params.tag}, {tagTwo: req.params.tag}, {tagThree: req.params.tag}],
              UserId: req.params.id
            },
          }).then((dbExperience)=>{
            db.Education.findAll({
              where: {
                [Op.or]: [{tagOne: req.params.tag}, {tagTwo: req.params.tag}, {tagThree: req.params.tag}],
                UserId: req.params.id
              },
            }).then((dbEducation)=>{
              res.render("resume", { layout: false, user: dbUser, works: dbWork, skills: dbExperience, educations: dbEducation });
            });
          });
        });
      });
  });

  function getTags(objArr, newObj) {
    for (let object of objArr) {
      if (object.tagOne != "") newObj[object.tagOne] = object.tagOne;
      if (object.tagTwo != "") newObj[object.tagTwo] = object.tagTwo;
      if (object.tagThree != "") newObj[object.tagThree] = object.tagThree;
    }
  }

};