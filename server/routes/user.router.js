const express = require("express");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const encryptLib = require("../modules/encryption");
const pool = require("../modules/pool");
const userStrategy = require("../strategies/user.strategy");
const { randomString } = require("../modules/randomString");
const { sendMail } = require("../modules/sendMail");
const { ADMIN, TEACHER, STUDENT } = require("../modules/authLevels");

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get("/", rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
});

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post("/register", (req, res, next) => {
  const username = req.body.username;
  const password = encryptLib.encryptPassword(req.body.password);
  const role = req.body.role;
  const firstName = req.body.firstName;
  const lastInitial = req.body.lastInitial;
  const school = req.body.school;
  const ranString = randomString();
  console.log("incoming user info for registering",req.body);
  const queryText = `INSERT INTO "user"("role_id","username","password","first_name","last_initial","school_id", "verification_string")
  VALUES($1, $2, $3, $4, $5, $6, $7)
  RETURNING id`;
  pool
    .query(queryText, [
      role,
      username,
      password,
      firstName,
      lastInitial,
      school,
      ranString,
    ])
    .then(() => {
      sendMail(username, ranString, true);
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log("User registration failed: ", err);
      res.sendStatus(500);
    });
});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post("/login", userStrategy.authenticate("local"), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.post("/logout", (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});

router.post("/addstudent", rejectUnauthenticated, (req, res, next) => {
  const firstName = req.body.firstName;
  const lastInitial = req.body.lastInitial;
  const email = req.body.email;
  const gender = req.body.gender;
  const race = req.body.race;
  const latinX = req.body.latinX;
  const iep = req.body.iep;
  const grade = req.body.grade;
  const school = req.user.school_id;
  const username = encryptLib.encryptPassword(randomString());
  const password = encryptLib.encryptPassword(randomString());
  const verification_string = randomString();

  if(req.user.role_id === ADMIN || req.user.role_id === TEACHER){
  const queryText = `INSERT INTO "demographics"("gender_id","iep","race_id","hispanic_latino","grade")
  VALUES ($1, $2, $3, $4, $5)
  RETURNING id`;
  pool.query(queryText, [gender, iep, race, latinX, grade])
    .then((result) => {
      const demoId = result.rows[0].id;
      const queryText = `INSERT INTO "user"("role_id","username","password","first_name","last_initial","school_id","demographics_id","verification_string","parent_email")
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);`;
      pool
        .query(queryText, [1, username, password, firstName, lastInitial, school, demoId, verification_string, email])
        .then(() => {
          res.sendStatus(201)
        })
        .catch((err) => {
          console.log('User registration failed: ', err);
          res.sendStatus(500);
        });
    })
    .catch((err) => {
      console.log("User registration failed: ", err);
      res.sendStatus(500);
    });
  } else {
    console.log("User is not authorized to add student")
  }
});

router.get("/students", rejectUnauthenticated, async (req, res, next) => {
  console.log("in get students")
  if (req.user.role_id === ADMIN) {
    console.log("level 3")
    const allStudentsQuery = `SELECT "user"."id", concat("user"."first_name", ' ', "user"."last_initial") as "student_name", 
    "user"."parent_email", now()::DATE - 2 < "user"."date_assessment_email_sent" as "email_sent", 
    now()::DATE - 40 < "user"."last_assessment_taken" as "assessment_completed", 
    "demographics"."grade"
    FROM "user", "demographics"
    WHERE "user"."role_id" = 1
    AND "demographics"."id" = "user"."demographics_id";`
    pool.query(allStudentsQuery)
    .then((result) => {
      res.send(result.rows);
    }).catch((error) => console.log("error getting students", error))
  } else if (req.user.role_id === TEACHER){
    console.log("level 2")
    const schoolSpecificStudentsQuery = `SELECT "user"."id", 
    concat("user"."first_name", ' ', "user"."last_initial") as "student_name", "user"."parent_email", 
    now()::DATE - 2 < "user"."date_assessment_email_sent" as "email_sent", "demographics"."grade"
    FROM "user", "demographics"
    WHERE "user"."school_id" = $1
    AND "user"."role_id" = 1
    AND "demographics"."id" = "user"."demographics_id";`
    pool.query(schoolSpecificStudentsQuery, [req.user.school_id])
    .then((result) => { 
      console.log(result.rows);
      res.send(result.rows);
    }).catch((error) => console.log("error getting students", error))
  } else {
    console.log("get outta here")
  }
})






module.exports = router;