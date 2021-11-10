const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//Get route for school and district data

router.get('/', (req, res) => {
    const queryText = `
    select  school.id, school.name as School_Name, district.name
    as District_Name, school.q1, school.q2, school.q3, school.q4 from school 
    join district on school.district_id = district.id;`;
    pool.query(queryText)
        .then((result) => {
            res.send(result.rows);
        })
        .catch((error) =>{
            console.log("Error in select schooldistrict data", error);
            res.send(500);
        })
})



module.exports = router;