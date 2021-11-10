const { default: axios } = require('axios');
const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');

router.get('/', (req,res) => {
    console.log('in get student report router');
    queryText = `SELECT "user"."id" AS "user_id",
    "user"."first_name",
    "user"."last_initial",
    "user"."username",
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
    pool.query(queryText, [req.user.id]).then(result => {res.send(result.rows);}).catch(error => {res.sendStatus(500);});
});

module.exports = router;