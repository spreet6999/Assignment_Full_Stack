const express = require("express");
const router = express.Router();
const Interview = require("../models/model_interview");
const User = require("../models/model_user");
const nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'abc@gmail.com',
    pass: 'password'
  }
});

var mailOptions = {
  from: 'abc@gmail.com',
  to: 'cde@gmail.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

function sendEmail(transporter, mailOptions) {
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

router.get("/interviewget/:id", function (req, res) {

  Interview.findById(req.params.id, function (err, interview) {
    if (err) {
      console.log(err);
    }
    else {
      res.json(interview);
    }
  })
})

router.post("/interviewupdate/:id", function (req, res) {
  var next;
  const result=interviewService(req, res, next)
  if(result instanceof Interview)
  {
    Interview.findByIdAndUpdate(req.params.id, req.body, function (err, interview) {
      if (err) {
        console.log(err);
      }
      else {
        return res.status(202).json({ "text": "Interview updated" })
      }
    })
  }
})

router.get("/interviewgetall", function (req, res) {

  Interview.find({}, function (err, interview) {
    if (err) {
      console.log(err);
    }
    else {
      res.json(interview);
    }
  })
})

router.post('/interviewpost',  function (req, res,next){
  interviewService(req, res, next);
})

function interviewService(req, res, next) {
  var start = req.body.start_time;
  var end = req.body.end_time;
  var participants = req.body.participant_names;
  var schedule_interview = new Interview({
    start_time: start,
    end_time: end,
    participant_names: participants,
  })
  if (participants.length < 2) {
    return res.status(400).json({ "error": "Error!! Number of Participants are less than 2" });
  }
  else {
    var query = { name: participants }
    User.find(query, function (err, user) {
      if (err) {
        console.log(err);
      }
      else {
        if (user.length !== participants.length) {
          return res.status(400).json({ "error": "First create a user with the name mentioned in participants" });
        }
        else {
          var query = {
            participant_names: { $in: participants }
          };
          Interview.find(query, function (err, interviews) {
            if (err) {
              console.log(err);
            }
            else {
              if (interviews.length === 0) {
                schedule_interview.save(function (err, schedule_interview) {
                  if (err) { return next(err) }
                  sendEmail(transporter, mailOptions)
                  return res.status(201).json({ "text": "Interview Scheduled" })
                })
              }
              else {
                var q = {
                  $or: [
                    { start_time: { $lte: start }, end_time: { $gte: start } },
                    { start_time: { $lte: end }, end_time: { $gte: end } }
                  ]
                }
                Interview.find(q, function (err, inter) {
                  if (err) {
                    console.log(err);
                  }
                  else {
                    if (inter.length === 0) {
                      schedule_interview.save(function (err, schedule_interview) {
                        if (err) { return next(err) }
                        sendEmail(transporter, mailOptions)
                        return res.status(201).json({ "text": "Interview Scheduled" })
                      })
                    }
                    else {
                      return res.status(400).json({ "error": "Interview can't be scheduled" });
                    }
                  }
                })
              }
            }
          })
        }
      }
    })
  }
}

module.exports = router;