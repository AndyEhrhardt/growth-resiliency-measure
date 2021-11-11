const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


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
    const filterProps = req.query;
    const type = Object.keys(filterProps.type);
    const target = filterProps.type;
    const quarterStart = "q" + (filterProps.quarter);
    const quarterEnd = "q" + (parseInt(quarterStart) + 1);
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
    WHERE ("assessments"."date" >= "school"."$3" AND "assessments"."date" <= "school"."$4")
    GROUP BY "$1"."$2";`;
    pool.query(queryText, [type, target, quarterStart, quarterEnd]).then(results => {
        res.send(results.rows);
    }).catch(error => {
        console.log('there was an error getting quarter data', error);
        res.sendStatus(500);
    })
})


router.get('/type', (req, res) => {
    // get the average response for each question
    // based on selected demographic
    // $1 is the parameter being searched
    // should come from an object value on
    // the overview charts page in format of
    // "race"."name", "gender"."name", "demographics"."hispanic_latino"
    console.log('in router get type', req.query);
    const filterByType = `${req.query.type}`;
    const filterTarget = `${req.query.target}`;
    const filterQuery = `"${filterByType}"."${filterTarget}"`
    console.log('type, target', filterByType, filterTarget); 
    queryText = `SELECT $1, AVG("assessments"."ask_help") AS "ask_help", AVG("assessments"."confidence_adult") AS "confidence_adult", AVG("assessments"."confidence_peer") AS "confidence_peer", AVG("assessments"."succeed_pressure") AS "succeed_pressure", AVG("assessments"."persistence") AS "persistence", AVG("assessments"."express_adult") AS "express_adult", AVG("assessments"."express_peer") AS "express_peer" 
    FROM "assessments"
    JOIN "user" on "assessments"."student_id" = "user"."id"
    JOIN "demographics" ON "user"."demographics_id" = "demographics"."id"
    JOIN "gender" ON "gender"."id" = "demographics"."gender_id"
    JOIN "race" ON "race"."id" = "demographics"."race_id" 
    JOIN "school" ON "user"."school_id" = "school"."id"
    JOIN "district" ON "school"."district_id" = "district"."id"
    GROUP BY $1;`
    pool.query(queryText, [filterQuery])
        .then(results => {
            console.log('results of get', results.rows);
            
            res.send(results.rows);
        }).catch(error => {
            console.log('there was an error getting filtered data', error);
            
            res.sendStatus(500);
        })
})



module.exports = router;