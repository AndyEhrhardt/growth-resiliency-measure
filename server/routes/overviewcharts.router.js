const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { ADMIN, TEACHER } = require("../modules/authLevels");
const {
    rejectUnauthenticated,
  } = require("../modules/authentication-middleware");

// all of the parameters that can be 
// entered into queries
// checks to make sure no malicious queries are entered
const acceptedInputs = ["assessments", "demographics", "district", "role", "school", "user", "race", "gender", "q1", "q2", "q3", "q4", "student_id", "entered_by_id", "grade", "date", "ask_help", "confidence_adult", "succeed_pressure", "confidence_peer", "persistence", "express_adult", "express_peer", "iep", "hispanic_latino", "created_at", "name", "domain", "first_name", "last_initial", "school_id", "demographics_id", "active", "email_sent", "assessment_completed", "email_verified", "parent_email","school_name", "grade"];

// get all of the data for the date range selected
// by search parameters entered by the user
router.get('/range', rejectUnauthenticated, (req, res) => {
    const filterBy = req.query.filterBy;
    const searchOn = req.query.searchOn;
    const startDate = req.query.startDate;
    const endDate = req.query.endDate;
    // check inputs are valid and user role is admin
    if(acceptedInputs.includes(filterBy) && acceptedInputs.includes(searchOn)){
        if (req.user.role_id === ADMIN) {
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
    WHERE ("assessments"."date" >= $1 AND "assessments"."date" <= $2 AND "assessments"."current" = TRUE)
    GROUP BY ${filterBy}.${searchOn};`;
    pool.query(queryText, [startDate,endDate]).then(results => {
        res.send(results.rows);
    
    }).catch(error => {
        res.sendStatus(500);
    })
        // if input not accepted type do not query
    } 
    // if user is a teacher get the ranged data
    // for the school they are assigned to
    else if (req.user.role_id === TEACHER) {
    const teacherSchool = req.user.school_id;
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
    WHERE ("assessments"."date" >= $1 AND "assessments"."date" <= $2 AND "user"."school_id" = $3 )
    GROUP BY ${filterBy}.${searchOn};`;
    pool.query(queryText, [startDate,endDate, teacherSchool]).then(results => {
        res.send(results.rows);
    }).catch(error => {
        res.sendStatus(500);
    })
} 
    else {
        alert('not authorized'); 
    }
    } else {
        alert('invalid search type');
    }
})

// get all of the assessments for a specific parameter
// based on quarter and year selected
router.get('/quarter', rejectUnauthenticated, (req, res) => {
    // get search parameters from url
    const filterBy = req.query.filterBy;
    const searchOn = req.query.searchOn;
    const quarterStart = req.query.quarterStart;
    const quarterEnd = req.query.quarterEnd;
    const firstYearSelected = req.query.firstYearSelected;
    const secondYearSelected = req.query.secondYearSelected;
    // check to make sure the search parameters are valid 
    // and are in the acceptedInputs array
    const inputsValid =  acceptedInputs.includes(filterBy) && acceptedInputs.includes(searchOn) && acceptedInputs.includes(quarterStart) && acceptedInputs.includes(quarterEnd);
    // check that the role is an admin
    if(req.user.role_id === ADMIN && inputsValid){
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
    WHERE EXTRACT(MONTH FROM "assessments"."date") >= EXTRACT(MONTH FROM "school"."${quarterStart}") AND EXTRACT(DAY FROM "assessments"."date") >= EXTRACT(DAY FROM "school"."${quarterStart}") AND EXTRACT(MONTH FROM "assessments"."date") <= EXTRACT(MONTH FROM "school"."${quarterEnd}") AND EXTRACT(DAY FROM "assessments"."date") <= EXTRACT(DAY FROM "school"."${quarterEnd}") AND "assessments"."current" = TRUE  AND EXTRACT(YEAR FROM "assessments"."date") = $1 AND EXTRACT(YEAR FROM "assessments"."date") = $2))
    GROUP BY "${filterBy}"."${searchOn}";`;
        pool.query(queryText, [firstYearSelected, secondYearSelected] ).then(results => {
            res.send(results.rows);
        }).catch(error => {
            res.sendStatus(500);
        })
        // if input not accepted type do not query
    } else {
        alert('invalid search type');
    }
})

router.get('/type', (req, res) => {
    // get the average response for each question
    // based on selected demographic
    // parameters are coming from an object value on
    // the overview charts page 
    const filterBy = req.query.filterBy;
    const searchOn = req.query.searchOn;
    if(req.user.role_id === ADMIN && acceptedInputs.includes(filterBy) && acceptedInputs.includes(searchOn)){
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
                res.send(results.rows);
            }).catch(error => {
                res.sendStatus(500);
            })
    } else {
       alert('not verified input')
    }
})



router.get('/specific', (req, res) => {
    // get the average response for each question
    // based on selected demographic
    // parameters are coming from an object value on
    // the overview charts page 
    const filterBy = req.query.filterBy;
    const searchOn = req.query.searchOn;
    const searchParameter = req.query.searchParameter;
    if (req.user.role_id === ADMIN && acceptedInputs.includes(filterBy) && acceptedInputs.includes(searchParameter)) {
        queryText = `SELECT "${filterBy}"."${searchParameter}", AVG("assessments"."ask_help") AS "ask_help", AVG("assessments"."confidence_adult") AS "confidence_adult", AVG("assessments"."confidence_peer") AS "confidence_peer", AVG("assessments"."succeed_pressure") AS "succeed_pressure", AVG("assessments"."persistence") AS "persistence", AVG("assessments"."express_adult") AS "express_adult", AVG("assessments"."express_peer") AS "express_peer" 
    FROM "assessments"
    JOIN "user" on "assessments"."student_id" = "user"."id"
    JOIN "demographics" ON "user"."demographics_id" = "demographics"."id"
    JOIN "gender" ON "gender"."id" = "demographics"."gender_id"
    JOIN "race" ON "race"."id" = "demographics"."race_id" 
    JOIN "school" ON "user"."school_id" = "school"."id"
    JOIN "district" ON "school"."district_id" = "district"."id" WHERE("${filterBy}"."${searchParameter}"=$1 AND "assessments"."current" = TRUE)
    GROUP BY "${filterBy}"."${searchParameter}";`
        pool.query(queryText, [searchOn])
            .then(results => {
                res.send(results.rows);
            }).catch(error => {
                res.sendStatus(500);
            })
    } else {
        alert('not verified input')
    }
})

router.get('/specificWithDate', (req, res) => {
    // get the average response for each question
    // based on selected demographic
    // parameters are coming from an object value on
    // the overview charts page 
    const filterBy = req.query.filterBy;
    const searchOn = req.query.searchOn;
    const searchParameter = req.query.searchParameter;
    const startDate = req.query.startDate;
    const endDate = req.query.endDate;
    if (req.user.role_id === ADMIN && acceptedInputs.includes(filterBy) && acceptedInputs.includes(searchParameter)) {
        queryText = `SELECT "${filterBy}"."${searchParameter}", AVG("assessments"."ask_help") AS "ask_help", AVG("assessments"."confidence_adult") AS "confidence_adult", AVG("assessments"."confidence_peer") AS "confidence_peer", AVG("assessments"."succeed_pressure") AS "succeed_pressure", AVG("assessments"."persistence") AS "persistence", AVG("assessments"."express_adult") AS "express_adult", AVG("assessments"."express_peer") AS "express_peer" 
    FROM "assessments"
    JOIN "user" on "assessments"."student_id" = "user"."id"
    JOIN "demographics" ON "user"."demographics_id" = "demographics"."id"
    JOIN "gender" ON "gender"."id" = "demographics"."gender_id"
    JOIN "race" ON "race"."id" = "demographics"."race_id" 
    JOIN "school" ON "user"."school_id" = "school"."id"
    JOIN "district" ON "school"."district_id" = "district"."id" WHERE("${filterBy}"."${searchParameter}"=$1 AND "assessments"."date" >= $2 AND "assessments"."date" <= $3 AND "assessments"."current" = TRUE)
    GROUP BY "${filterBy}"."${searchParameter}";`
        pool.query(queryText, [searchOn, startDate, endDate])
            .then(results => {
                res.send(results.rows);
            }).catch(error => {
                res.sendStatus(500);
            })
    } else {
        alert('not verified input')
    }
})

// get all of the assessment years that have data
// to use for the dropdown menu
router.get('/assessmentYears', (req, res) => {
    queryText = `SELECT DISTINCT EXTRACT(YEAR from date) from "assessments";`
    pool.query(queryText).then(results => {
        res.send(results.rows);
    })
        .catch(error => {
           res.sendStatus(500);
        })
})

// get gain scores for each parameter
// based on selected quarter
router.get('/gains', async (req, res) => {
    const filterBy = req.query.filterBy;
    const searchParameter = req.query.searchParameter;
    const searchOn = req.query.searchOn;
    const q1Start = req.query.q1Start;
    const q1End = req.query.q1End;
    const q2Start = req.query.q2Start;
    const q2End = req.query.q2End;
    // check that the queries are of accepted type
    // and that the user is an admin
    if (filterBy && req.user.role_id === ADMIN && acceptedInputs.includes(filterBy) && acceptedInputs.includes(searchParameter)) {
        try {
            const queryText = `SELECT "${filterBy}"."${searchParameter}", AVG("assessments"."ask_help") AS "ask_help", AVG("assessments"."confidence_adult") AS "confidence_adult", AVG("assessments"."confidence_peer") AS "confidence_peer", AVG("assessments"."succeed_pressure") AS "succeed_pressure", AVG("assessments"."persistence") AS "persistence", AVG("assessments"."express_adult") AS "express_adult", AVG("assessments"."express_peer") AS "express_peer" 
            FROM "assessments"
            JOIN "user" on "assessments"."student_id" = "user"."id"
            JOIN "demographics" ON "user"."demographics_id" = "demographics"."id"
            JOIN "gender" ON "gender"."id" = "demographics"."gender_id"
            JOIN "race" ON "race"."id" = "demographics"."race_id" 
            JOIN "school" ON "user"."school_id" = "school"."id"
            JOIN "district" ON "school"."district_id" = "district"."id" WHERE("${filterBy}"."${searchParameter}"=$1 AND "assessments"."date" >= $2 AND "assessments"."date" <= $3 AND "assessments"."current" = TRUE)
            GROUP BY "${filterBy}"."${searchParameter}";`;
            const firstRange = await pool.query(queryText, [searchOn, q1Start, q1End])
            const secondRange = await pool.query(queryText, [searchOn, q2Start, q2End])
            const rangeData = [firstRange.rows, secondRange.rows, q1Start, q2End]
            res.send(rangeData);
        } catch (error) {
            await pool.query('ROLLBACK');
            res.sendStatus(500);
        }
    }
    else {
        alert('not verified input')
    }
})



module.exports = router;