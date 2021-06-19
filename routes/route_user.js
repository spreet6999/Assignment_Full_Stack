const express = require("express");
const router = express.Router();
const User = require("../models/model_user");

router.get("/userget/:id", function (req, res) {

  User.findById(req.params.id, function (err, user) {
    if (err) {
      console.log(err);
    }
    else {
      res.json(user);
    }
  })
})

router.get("/usergetall", function (req, res) {

  User.find({}, function (err, user) {
    if (err) {
      console.log(err);
    }
    else {
      res.json(user);
    }
  })
})

router.post('/userpost', function (req, res, next) {
  var user = new User({
    name: req.body.name,
    mail: req.body.mail,
    roles: req.body.roles,
  })
  user.save(function (err, user) {
    if (err) { return next(err) }
    res.json(201, user)
  })
})

module.exports = router;