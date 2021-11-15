const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const cron = require('node-cron');
const {randomString} = require('../modules/randomString');
const ranString = randomString();
const { sendMail } = require("../modules/sendMail");

const { 
  ADMIN,
  TEACHER,
  STUDENT,
  REQUESTING_ADMIN,
  REQUESTING_TEACHER, 
} = require("../modules/authLevels");

router.put('/sendassessment', (req, res) => {
  const studentId = req.body.data.studentId;
  const email = req.body.data.email;
  console.log(email)
  const newRandomString = randomString();
  const currentDate = new Date();
  const putQuery = 'UPDATE "user" SET "verification_string" = $1, "date_assessment_email_sent"=$2 WHERE "id" = $3;';
  pool.query(putQuery, [newRandomString, currentDate, studentId])
    .then((result) => {
      console.log("verification string updated")
      sendMail(email, newRandomString, false);
    })
    .catch((error) => {
      console.log("error updating verification string", error)
    })
})

//PUT
router.put('/email/:randomString', (req, res) => {
  const randomString = req.params.randomString;
  const searchQuery = 'SELECT * FROM "user" WHERE "verification_string" = $1;';
  pool.query(searchQuery, [randomString])
      .then((result) => {
        console.log(result.rows);
        const verifyID = result.rows[0].id;
        const putQuery = 'UPDATE "user" SET "email_verified" = TRUE WHERE "id" = $1;';
        pool.query(putQuery, [verifyID])
        .then(() => {
          res.sendStatus(200);
        })
        .catch((error) => {
          console.log(error);
          res.sendStatus(500);
        })
      })
      .catch((error) => {
        res.sendStatus(500);
        console.log(error);
      })
})

router.get('/startAssessment/:randomString', (req, res) => {
  const randomString = req.params.randomString;
  const searchQuery = `SELECT * FROM "user" 
  WHERE "verification_string" = $1
  AND "role_id" = 1;`;
  pool.query(searchQuery, [randomString])
      .then((result) => {
        console.log('YO TJ WHAT IS THIS PLZ TELL ME', result.rows[0].id);
        const userId = result.rows[0].id;
        resetRandomString(userId);
        res.send(result.rows);
      })
      .catch((error) => {
        res.sendStatus(500);
        console.log(error);
      })
})

const resetRandomString = (id) => {
  console.log("IN RESET RANDOM STRING, SHOULD BE ANOTHER 1 MINUTE(S) UNTIL ANOTHER CONSOLE LOG");
  cron.schedule('* * * * *', () => {
    console.log("starting process of reseting random string");
    const newString = ranString();
    const resetQuery = `UPDATE "user"
    SET "verification_string" = $1
    WHERE "id" = $1`;
    pool.query(resetQuery, [newString, id])
    .then((result) => {
      console.log("THE USERS VERIFICATION STRING SHOULD BE RESET");
      
    })
    .catch((error) => {
      res.sendStatus(500);
      console.log(error);
    })
  });
}




module.exports = router;