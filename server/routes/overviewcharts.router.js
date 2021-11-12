const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// all of the parameters that can be 
// entered into queries
// checks to make sure no malicious queries are entered
const acceptedInputs = ["assessments", "demographics", "district", "role","school","user","race", "gender", "q1", "q2", "q3", "q4", "student_id", "entered_by_id", "grade", "date", "ask_help", "confidence_adult", "succeed_pressure", "confidence_peer", "persistence", "express_adult", "express_peer", "iep", "hispanic_latino", "created_at", "name", "domain", "first_name", "last_initial", "school_id", "demographics_id", "active", "email_sent", "assessment_completed", "email_verified", "parent_email", ];

router.get('/range', (req, res) => {
    const filterBy = req.query.filterBy;
    const searchOn = req.query.searchOn;
    const startDate = req.query.startDate;
    const endDate = req.query.endDate;
    console.log('in router range', req.query)
    
    if(acceptedInputs.includes(filterBy) && acceptedInputs.includes(searchOn)){

    const queryText = `SELECT ${filterBy}.${searchOn}, 
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
    WHERE ("assessments"."date" >= $1 AND "assessments"."date" <= $2)
    GROUP BY ${filterBy}.${searchOn};`;
    pool.query(queryText, [startDate,endDate]).then(results => {
        console.log('results', results.rows);
        
        res.send(results.rows);
    }).catch(error => {
        console.log('there was an error getting ranged data', error);
        res.sendStatus(500);
    })
        // if input not accepted type do not query
} else {
    console.log('invalid search type');
}
})

router.get('/quarter', (req, res) => {
    console.log('req.query', req.query);
    // get search parameters from url
    const filterBy = req.query.filterBy;
    const searchOn = req.query.searchOn;
    const quarterStart = req.query.quarterStart;
    const quarterEnd = req.query.quarterEnd;
    // check that the queries are of accepted type
    if(acceptedInputs.includes(filterBy) && acceptedInputs.includes(searchOn) && acceptedInputs.includes(quarterStart) && acceptedInputs.includes(quarterEnd)){
    const queryText = `SELECT "${filterBy}"."${searchOn}", 
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
    WHERE ("assessments"."date" >= "school"."${quarterStart}" AND "assessments"."date" <= "school"."${quarterEnd}")
    GROUP BY "${filterBy}"."${searchOn}";`;
    pool.query(queryText).then(results => {
        res.send(results.rows);
        console.log('results', results.rows);
    }).catch(error => {
        console.log('there was an error getting quarter data', error);
        res.sendStatus(500);
    })
    // if input not accepted type do not query
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
    const filterBy = req.query.filterBy;
    const searchOn = req.query.searchOn;
    if(acceptedInputs.includes(filterBy) && acceptedInputs.includes(searchOn)){
    queryText = `SELECT "${filterBy}"."${searchOn}", AVG("assessments"."ask_help") AS "ask_help", AVG("assessments"."confidence_adult") AS "confidence_adult", AVG("assessments"."confidence_peer") AS "confidence_peer", AVG("assessments"."succeed_pressure") AS "succeed_pressure", AVG("assessments"."persistence") AS "persistence", AVG("assessments"."express_adult") AS "express_adult", AVG("assessments"."express_peer") AS "express_peer" 
    FROM "assessments"
    JOIN "user" on "assessments"."student_id" = "user"."id"
    JOIN "demographics" ON "user"."demographics_id" = "demographics"."id"
    JOIN "gender" ON "gender"."id" = "demographics"."gender_id"
    JOIN "race" ON "race"."id" = "demographics"."race_id" 
    JOIN "school" ON "user"."school_id" = "school"."id"
    JOIN "district" ON "school"."district_id" = "district"."id"
    GROUP BY "${filterBy}"."${searchOn}";`
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