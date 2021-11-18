const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const cron = require('node-cron');
const { randomString } = require('../modules/randomString');
const ranString = randomString();
const { sendMail } = require("../modules/sendMail");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

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
      res.sendStatus(200);
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

router.delete('/hasaccess/:userId', rejectUnauthenticated, (req, res) => {
  console.log(req.params.userId);
  if(req.user.role_id != ADMIN ){
    console.log("user does not have access")
     return res.sendStatus(500);
  } 
  const queryText = ` DELETE from "user" WHERE "user"."id" = $1;`
  pool.query(queryText, [req.params.userId])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log("Error in deleting a user", error);
    })
})
const preventDuplicateEntryQuery = `SELECT now()::DATE - 40 > "assessments"."date" as "no_assessment_taken_this_quarter"
  FROM "user", "assessments"
  WHERE "user"."id" = $1
  AND "user"."id" = "assessments"."student_id"
  ORDER BY DATE DESC
  LIMIT 1;`

router.get('/startAssessment/:randomString', async (req, res) => {
  const verification_string = req.params.randomString;
  const studentInfoQuery = `SELECT now()::DATE - 2 < "user"."date_assessment_email_sent" as "email_sent_recently", "user".*, "user"."id" as "student_id", "demographics".* FROM "user", "demographics"
  WHERE "user"."verification_string" = $1
  AND "user"."role_id" = 1
  AND "user"."demographics_id" = "demographics"."id";`;
  try {
    const studentInfo = await pool.query(studentInfoQuery, [verification_string]);
    const studentId = studentInfo.rows[0].student_id;
    console.log(studentInfo.rows)
    const preventDuplicateEntryCheck = await pool.query(preventDuplicateEntryQuery, [studentId]);
    console.log(preventDuplicateEntryCheck.rows)
    console.log()
    if(preventDuplicateEntryCheck.rows.length === 0){
      preventDuplicateEntryCheck.rows.push({no_assessment_taken_this_quarter: true})
    }
    if(studentInfo.rows[0].email_sent_recently && preventDuplicateEntryCheck.rows[0].no_assessment_taken_this_quarter){
      console.log("email sent recently", studentInfo.rows[0].email_sent_recently)
      console.log("no assessment taken this quarter", preventDuplicateEntryCheck.rows[0].no_assessment_taken_this_quarter)
      res.send(studentInfo.rows);
    } else {
      console.log("email was not sent within the last two days, or student already has an assessment for this quarter")
      res.sendStatus(500);
    }
    } catch (error){
    console.log("error verifying student", error)
    res.send(500);
    }
})

router.post('/postassessment', async (req, res) => {
  const studentId = req.body.student.student_id;
  const verification_string = req.body.student.verification_string;
  const grade = req.body.student.grade;
  console.log(grade)
  const currentAssessment = {
    confidence_adult: req.body.assessment.confidence_adult_end.score,
    confidence_peer: req.body.assessment.confidence_peer_end.score,
    succeed_pressure: req.body.assessment.succeed_pressure_end.score,
    persistence: req.body.assessment.persistence_end.score,
    express_adult: req.body.assessment.express_adult_end.score,
    express_peer: req.body.assessment.express_peer_end.score,
    ask_help: req.body.assessment.ask_help_end.score}
  const previousAssessment = {
    confidence_adult: req.body.assessment.confidence_adult_start.score,
    confidence_peer: req.body.assessment.confidence_peer_start.score,
    succeed_pressure: req.body.assessment.succeed_pressure_start.score,
    persistence: req.body.assessment.persistence_start.score,
    express_adult: req.body.assessment.express_adult_start.score,
    express_peer: req.body.assessment.express_peer_start.score,
    ask_help: req.body.assessment.ask_help_start.score}
  try{
    const confirmStudentQuery = `SELECT now()::DATE - 2 < "user"."date_assessment_email_sent" as "email_sent_recently"
    FROM "user"
    WHERE "user"."id" = $1
    AND "user"."verification_string" = $2
    AND "user"."role_id" = 1`
    const confirmStudentResponse = await pool.query(confirmStudentQuery, [studentId, verification_string])
    const preventDuplicateEntryCheck = await pool.query(preventDuplicateEntryQuery, [studentId]);
    console.log(preventDuplicateEntryCheck.rows)
    if(preventDuplicateEntryCheck.rows.length === 0){
      preventDuplicateEntryCheck.rows.push({no_assessment_taken_this_quarter: true})
    }
    if(confirmStudentResponse.rows[0].email_sent_recently && preventDuplicateEntryCheck.rows[0].no_assessment_taken_this_quarter){
    const postAssessment = `INSERT INTO "assessments"("student_id","entered_by_id","grade","ask_help","confidence_adult",
    "confidence_peer","succeed_pressure","persistence","express_adult","express_peer","current")
    VALUES ($1, $1, $2, $3, $4, $5, $6, $7, $8, $9, $10);`  
    await pool.query(postAssessment, [studentId, grade, previousAssessment.ask_help, previousAssessment.confidence_adult, previousAssessment.confidence_peer,
    previousAssessment.succeed_pressure, previousAssessment.persistence, previousAssessment.express_adult, previousAssessment.express_peer, false])
    console.log("previous assessment posted successfully")
    await pool.query(postAssessment, [studentId, grade, currentAssessment.ask_help, currentAssessment.confidence_adult, currentAssessment.confidence_peer,
    currentAssessment.succeed_pressure, currentAssessment.persistence, currentAssessment.express_adult, currentAssessment.express_peer, true])
    console.log("current assessment posted successfully")
    const currentDate = new Date();
    const updateLastAssessmentTakenDateQuery = `UPDATE "user" SET "last_assessment_taken" = $1 WHERE "user"."id" = $2`
    await pool.query(updateLastAssessmentTakenDateQuery, [currentDate, studentId])
    console.log("last_assessment_taken date updated")
    res.sendStatus(200);
    } else {
      console.log("email was not sent within the last two days, or student already has an assessment for this quarter")
      res.sendStatus(500);
    }
  } catch (error){
    res.sendStatus(500);
    console.log(error);
  }
})



router.get('/request', rejectUnauthenticated, (req, res) => {
  if(req.user.role_id != ADMIN ){
    console.log("user does not have access")
    return res.sendStatus(500);
  } 
  const requestingAndHasAccess = {}
  const requestingQueryText = `SELECT "user".id, CONCAT_WS(' ', "user".first_name, "user".last_initial) AS Name,
  "role".name AS "access_level", "role"."id" as "role_number"
  FROM "user" 
  JOIN "role" ON "role".id = "user".role_id
  WHERE "user".role_id BETWEEN 4 AND 5;`;
  pool.query(requestingQueryText)
    .then((result) => {
      requestingAndHasAccess.requesting = result.rows;
      const hasAccessQueryText = `SELECT "user".id, CONCAT_WS(' ', "user".first_name, "user".last_initial) AS Name,
      "role".name AS "access_level", "role"."id" as "role_number"
      FROM "user" 
      JOIN "role" ON "role".id = "user".role_id
      WHERE "user".role_id BETWEEN 2 AND 3;`;
      pool.query(hasAccessQueryText)
      .then((result) => {
        requestingAndHasAccess.hasAccess = result.rows;
        res.send(requestingAndHasAccess);
      })
      .catch((error) => {
        console.log("Error in select user access", error);
        res.send(500);
      })   
    })
    .catch((error) => {
      console.log("Error in select user access", error);
      res.send(500);
    })
})
router.put('/addAccessUser/:userId', (req, res) =>{
  console.log("user ID", req.params.userId)
  console.log(req.body)
  console.log("role number", req.body.roleId)
  let newRole;
  if(req.user.role_id != ADMIN ){
    console.log("user does not have access")
     return res.sendStatus(500);
  } 
  if (req.body.roleId === REQUESTING_TEACHER){
    newRole = TEACHER;
  } else if (req.body.roleId === REQUESTING_ADMIN){
    newRole = ADMIN;
  }
  const queryText = `UPDATE "user" SET role_id = $1 where id= $2; `;
  pool.query(queryText, [newRole, req.params.userId])
  .then((result) =>{
    res.sendStatus(200)
  })
  .catch((error) =>{
    console.log("There was an error in changing the user status", error)
  })
})


module.exports = router;