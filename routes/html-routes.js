// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");

// Routes
// =============================================================
module.exports = function(app) {

  // Each of the below routes just handles the HTML page that the user gets sent to.

  // index route loads view.html

app.get("/experience", function(req, res) {
  // Handlebars 
  res.render("experience");
  /*db.User.findOne({
      where: {
        id: req.body.user.id,
      }
    }).then(function(dbUser) {
      res.render("experience", { user: dbUser });*/
});

app.get("/skills", function(req, res) {
  // Handlebars 
  res.render("skills");
  /*db.User.findOne({
    where: {
      id: req.body.user.id,
    }
  }).then(function(dbUser) {
    res.render("skills", { user: dbUser });*/
});

app.get("/buildresume", function(req, res) {
  // Handlebars 
  res.render("build");
  /*db.User.findOne({
    where: {
      id: req.body.user.id,
    }
  }).then(function(dbUser) {
    res.render("build", { user: dbUser });*/
});

};