const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req, res) => {
    const demographics = {};
    const raceQuery = `SELECT * FROM "race";`;
    pool.query(raceQuery)
        .then((result) => {
            demographics.race = result.rows;
            const genderQuery = `SELECT * FROM "gender";`;
            pool.query(genderQuery)
            .then((result) => {
                demographics.gender = result.rows;
                res.send(demographics)
            })
            .catch((error) =>{
                console.log("Error in getting demographics, gender", error);
                res.send(500);
            })
        })
        .catch((error) =>{
            console.log("Error in getting demographics, race", error);
            res.send(500);
        })
})




module.exports = router;