const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { ADMIN, TEACHER, STUDENT } = require("../modules/authLevels");
const {
    rejectUnauthenticated,
  } = require("../modules/authentication-middleware");
//Get route for school and district data

router.get('/', (req, res) => {
    const queryText = `
    select  school.id as school_id, school.name as School_Name, district.name
    as District_Name, district.id as district_id, school.q1, school.q2, school.q3, school.q4 from school 
    join district on school.district_id = district.id;`;
    pool.query(queryText)
        .then((result) => {
            res.send(result.rows);
        })
        .catch((error) => {
            console.log("Error in select schooldistrict data", error);
            res.sendStatus(500);
        })
})


router.post('/', rejectUnauthenticated, (req, res) => {
    const schoolInfo = req.body
    const insertDistrictQuery = `INSERT INTO "district" ("name") VALUES($1) RETURNING "id";`;
        console.log("user role", req.user.role_id)
    if(req.user.role_id === ADMIN) {
    pool.query(insertDistrictQuery, [req.body.district])
        .then(result => {
            const district_id = result.rows[0].id;
            const queryText = `INSERT INTO "school" ("name", "district_id", "q1", "q2","q3","q4","domain")  VALUES($1, $2, $3, $4, $5, $6, $7);`;
            pool.query(queryText, [schoolInfo.school, district_id, '2021/03/01', '2021/05/01', '2021/05/07','2021/01/05',schoolInfo.domain])
                .then(result => {
                    console.log(result);
                    res.sendStatus(201);
                })
                .catch(error => {
                    console.log(error)
                    res.sendStatus(500);
                })
        })
        .catch(error => {
            console.log(error)
        })
    } else {
        console.log("not authorized")
    }

})

module.exports = router;
