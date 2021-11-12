const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// all of the parameters that can be 
// entered into queries
// checks to make sure no malicious queries are entered
const acceptedInputs = ["assessments", "demographics", "district", "role","school","user","race", "gender", "q1", "q2", "q3", "q4", "student_id", "entered_by_id", "grade", "date", "ask_help", "confidence_adult", "succeed_pressure", "confidence_peer", "persistence", "express_adult", "express_peer", "iep", "hispanic_latino", "created_at", "name", "domain", "first_name", "last_initial", "school_id", "demographics_id", "active", "email_sent", "assessment_completed", "email_verified", "parent_email" ];

router.get('/range', (req, res) => {
    const filterProps = req.query;
    const type = Object.keys(filterProps.type);
    const target = filterProps.type;
    const start = filterProps.start;
    const end = filterProps.end;
    const queryText = `SELECT "$1"."2", 
    AVG("assessments"."ask_help") AS "ask_help", 
    AVG("assessments"."confidence_adult") AS "confidence_adult", 
    AVG("assessments"."confidence_peer") AS "confidence_peer", 
    AVG("assessments"."succeed_pressure") AS "succeed_pressure", 
    AVG("assessments"."persistence") AS "persistence", 
    AVG("assessments"."express_adult") AS "express_adult", 
    AVG("assessments"."express_peer") AS "express_peer" 
    FROM "assessments"
      JOIN "user" on "assessments"."student_id" = "user"."id"
    JOIN "school" ON "user"."school_id" = "school"."id"
    JOIN "district" ON "school"."district_id" = "district"."id"
    JOIN "demographics" ON "user"."demographics_id" = "demographics"."id"
    JOIN "gender" ON "gender"."id" = "demographics"."gender_id"
    JOIN "race" ON "race"."id" = "demographics"."race_id" 
    WHERE ("assessments"."date" >= $3 AND "assessments"."date" <= $4)
    GROUP BY "$1"."$2";`;
    pool.query(queryText, [type, target, start, end]).then(results => {
        res.send(results.rows);
    }).catch(error => {
        console.log('there was an error getting ranged data', error);
        res.sendStatus(500);
    })
})

router.get('/quarter', (req, res) => {
    const filterByType = req.query.type;
    const filterTarget = req.query.target;
    const quarterStart = "q" + (req.query.quarter);
    const quarterEnd = "q" + (parseInt(quarterStart) + 1);
    console.log('q start, q end', quarterStart, quarterEnd);
    
    if(acceptedInputs.includes(filterByType) && acceptedInputs.includes(filterTarget) && acceptedInputs.includes(quarterStart) && acceptedInputs.includes(quarterEnd)){
    const queryText = `SELECT "${filterByType}"."${filterTarget}", 
    AVG("assessments"."ask_help") AS "ask_help", 
    AVG("assessments"."confidence_adult") AS "confidence_adult", 
    AVG("assessments"."confidence_peer") AS "confidence_peer", 
    AVG("assessments"."succeed_pressure") AS "succeed_pressure", 
    AVG("assessments"."persistence") AS "persistence", 
    AVG("assessments"."express_adult") AS "express_adult", 
    AVG("assessments"."express_peer") AS "express_peer" 
    FROM "assessments"
      JOIN "user" on "assessments"."student_id" = "user"."id"
    JOIN "school" ON "user"."school_id" = "school"."id"
    JOIN "district" ON "school"."district_id" = "district"."id"
    JOIN "demographics" ON "user"."demographics_id" = "demographics"."id"
    JOIN "gender" ON "gender"."id" = "demographics"."gender_id"
    JOIN "race" ON "race"."id" = "demographics"."race_id" 
    WHERE ("assessments"."date" >= "school"."${quarterStart}" AND "assessments"."date" <= "school"."${quarterEnd}"
    GROUP BY "${filterByType}"."${filterTarget}";`;
    pool.query(queryText, [type, target, quarterStart, quarterEnd]).then(results => {
        res.send(results.rows);
    }).catch(error => {
        console.log('there was an error getting quarter data', error);
        res.sendStatus(500);
    })
} else {
    console.log('invalid search type');
    
}
})



router.get('/type', (req, res) => {
    // get the average response for each question
    // based on selected demographic
    // parameters are coming from an object value on
    // the overview charts page 
    console.log('in router get type', req.query);
    const filterByType = req.query.type;
    const filterTarget = req.query.target;
    if(acceptedInputs.includes(filterByType) && acceptedInputs.includes(filterTarget)){
    queryText = `SELECT "${filterByType}"."${filterTarget}", AVG("assessments"."ask_help") AS "ask_help", AVG("assessments"."confidence_adult") AS "confidence_adult", AVG("assessments"."confidence_peer") AS "confidence_peer", AVG("assessments"."succeed_pressure") AS "succeed_pressure", AVG("assessments"."persistence") AS "persistence", AVG("assessments"."express_adult") AS "express_adult", AVG("assessments"."express_peer") AS "express_peer" 
    FROM "assessments"
    JOIN "user" on "assessments"."student_id" = "user"."id"
    JOIN "demographics" ON "user"."demographics_id" = "demographics"."id"
    JOIN "gender" ON "gender"."id" = "demographics"."gender_id"
    JOIN "race" ON "race"."id" = "demographics"."race_id" 
    JOIN "school" ON "user"."school_id" = "school"."id"
    JOIN "district" ON "school"."district_id" = "district"."id"
    GROUP BY "${filterByType}"."${filterTarget}";`
    pool.query(queryText)
        .then(results => {
            console.log('results of get', results.rows);
            res.send(results.rows);
        }).catch(error => {
            console.log('there was an error getting filtered data', error);
            
            res.sendStatus(500);
        })
    } else {
        console.log('not verified input')
    }
})



module.exports = router;