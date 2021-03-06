const { default: axios } = require('axios');
const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const { ADMIN, TEACHER, STUDENT } = require("../modules/authLevels");

// route to get reports of the user that is
// logged in
router.get('/', (req, res) => {
    queryText = `SELECT "user"."id" AS "user_id",
    "user"."first_name",
    "user"."last_initial",
    "user"."demographics_id",
    "gender"."name" AS "gender",
    "race"."name" AS "race", 
    "demographics"."hispanic_latino", 
    "user"."role_id",
    "user"."active",
    "user"."assessment_completed",
    "user"."email_sent",
    "assessments".*, 
    "role"."name" AS "entered_by",
    "user"."school_id",
    "school"."name" AS "school_name", 
    "school"."district_id",
    "district"."name" AS "district_name",
    "school"."q1",
    "school"."q2",
    "school"."q3",
    "school"."q4"
    FROM "assessments"
    JOIN
    "user" ON "user"."id" = "assessments"."student_id"
    JOIN "school" ON "school"."id"="user"."school_id" 
    JOIN "district" ON "school"."district_id" = "district"."id"
    JOIN "demographics" ON "demographics"."id" = "user"."demographics_id"
    JOIN "gender" ON "gender"."id"="demographics"."gender_id"
    JOIN "race" ON "demographics"."race_id" = "race"."id"
    JOIN "role" ON "role"."id"="user"."role_id" WHERE "student_id" = $1`;
    pool.query(queryText, [req.user.id]).then(result => { res.send(result.rows); }).catch(error => { res.sendStatus(500); });
});

// this is for getting the assessment beginning of period perception 
// for specific student by matching the verification string
router.get('/perception/:verification_string', (req, res) => {
    const verification_string = req.params.verification_string;
    queryText = `  SELECT "user"."first_name", "user"."last_initial", "assessments"."date", "assessments"."ask_help" AS "ask_help", "assessments"."confidence_adult" AS "confidence_adult", "assessments"."confidence_peer" AS "confidence_peer", "assessments"."succeed_pressure" AS "succeed_pressure", "assessments"."persistence" AS "persistence", "assessments"."express_adult" AS "express_adult", "assessments"."express_peer" AS "express_peer" FROM "assessments" JOIN "user" ON "assessments"."student_id"="user"."id" WHERE ("user"."verification_string" = $1 AND "assessments"."current" = false) ORDER BY "assessments"."date" ASC limit 1;`;
    pool.query(queryText, [verification_string]).then(result => {
        res.send(result.rows);
    }).catch(error => { alert('There was an error') });
});


// this is for getting current assessment data 
// for specific student report by matching the verification string
router.get('/:verification_string', (req, res) => {
    const verification_string = req.params.verification_string;
    queryText = `  SELECT "user"."first_name", "user"."last_initial", "assessments"."date", "assessments"."ask_help" AS "ask_help", "assessments"."confidence_adult" AS "confidence_adult", "assessments"."confidence_peer" AS "confidence_peer", "assessments"."succeed_pressure" AS "succeed_pressure", "assessments"."persistence" AS "persistence", "assessments"."express_adult" AS "express_adult", "assessments"."express_peer" AS "express_peer" FROM "assessments" JOIN "user" ON "assessments"."student_id"="user"."id" WHERE ("user"."verification_string" = $1 AND "assessments"."current" = true) ORDER BY "assessments"."date" ASC limit 1;`;
    pool.query(queryText, [verification_string]).then(result => { res.send(result.rows); }).catch(error => { alert('There was an error') });
});

// this is for posting assessment data
router.post('/', (req, res) => {
    const assessmentData = req.body;
    const queryText = `  INSERT INTO "assessments" ("student_id","entered_by_id","grade","date","ask_help","confidence_adult","confidence_peer","succeed_pressure","persistence","express_adult","express_peer") VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11);`;
    pool.query(queryText, assessmentData.student_id, assessmentData.enteredBy, assessmentData.grade, assessmentData.date, assessmentData.askHelp, assessmentData.confidenceAdult, assessmentData.confidencePeer, assessmentData.succeedPressure, assessmentData.persistence, assessmentData.expressAdult, assessmentData.expressPeer)
        .then(result => {
            res.sendStatus(200)
        }).catch(error =>
            res.sendStatus(500));
});

module.exports = router;