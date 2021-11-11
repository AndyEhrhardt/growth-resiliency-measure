const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


router.get('/demographics/:id', (req,res) => {
    // get the average response for each question
    // based on selected demographic
    // $1 is the parameter being searched
    // should come from an object value on
    // the overview charts page in format of
    // "race"."name", "gender"."name", "demographics"."hispanic_latino"
    const demographicId = req.params;
    queryText=`SELECT $1, AVG("assessments"."ask_help") AS "ask_help", AVG("assessments"."confidence_adult") AS "confidence_adult", AVG("assessments"."confidence_peer") AS "confidence_peer", AVG("assessments"."succeed_pressure") AS "succeed_pressure", AVG("assessments"."persistence") AS "persistence", AVG("assessments"."express_adult") AS "express_adult", AVG("assessments"."express_peer") AS "express_peer" FROM "assessments"
    JOIN "user" on "assessments"."student_id" = "user"."id"
    JOIN "demographics" ON "user"."demographics_id" = "demographics"."id"
    JOIN "gender" ON "gender"."id" = "demographics"."gender_id"
    JOIN "race" ON "race"."id" = "demographics"."race_id" GROUP BY $1;`
    pool.query(queryText,[demographicId])
    .then(results => {
        res.send(results.rows);
    }).catch(error => {
        res.sendStatus(500);
    })
})



module.exports = router;