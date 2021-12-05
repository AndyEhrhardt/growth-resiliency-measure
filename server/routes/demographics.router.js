const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

router.get('/', async (req, res) => {
    try {
    const demographics = {};
    const raceQuery = `SELECT * FROM "race";`;
    const raceResults = await pool.query(raceQuery);
    demographics.race = raceResults.rows;
    const genderQuery = `SELECT * FROM "gender";`;
    const genderResults = await pool.query(genderQuery)
    demographics.gender = genderResults.rows;
    const demographicsQuery = `SELECT DISTINCT "demographics"."grade" FROM "demographics" GROUP BY "demographics"."grade" ORDER BY "demographics"."grade" ASC;`;
    const demographicResults = await pool.query(demographicsQuery);
    demographics.demographic = demographicResults.rows;
    res.send(demographics);
    } catch
    (error) {
        console.log('ROLLBACK', error);
        await pool.query('ROLLBACK');
        throw error;
    }
});




router.put('/demo/:id', rejectUnauthenticated, async (req, res) => {
    const idToUpdate = req.params.id;
    try {
        const searchQuery = `SELECT * FROM "demographics" WHERE ("gender_id" = $1 AND "iep" = $2 AND "race_id" = $3 AND "hispanic_latino" = $4 AND "grade" = $5);`;
        const searchResult = await pool.query(searchQuery, [req.body.gender_id, req.body.iep, req.body.race_id, req.body.hispanic_latino, req.body.grade]);
        const demoCodeExists = (searchResult.rows.length == 1 ? true : false);
        switch (demoCodeExists) {
            case false:
                const insertDemoCode = `INSERT INTO "demographics" ("gender_id", "iep", "race_id", "hispanic_latino", "grade") VALUES ($1, $2, $3, $4, $5) RETURNING "id";`;
                const postResult = await pool.query(insertDemoCode, [req.body.gender_id, req.body.iep, req.body.race_id, req.body.hispanic_latino, req.body.grade]);
                const demoCodeID1 = postResult.rows[0].id;
                const putDemoCode1 = `UPDATE "user" SET "demographics_id" = $1 WHERE "id" = $2;`;
                const putResult1 = await pool.query(putDemoCode1, [demoCodeID1, idToUpdate]);
                break;
            case true:
                const demoCodeID2 = searchResult.rows[0].id;
                const putDemoCode2 = `UPDATE "user" SET "demographics_id" = $1 WHERE "id" = $2;`;
                const putResult2 = await pool.query(putDemoCode2, [demoCodeID2, idToUpdate]);
                break;
        }
        res.sendStatus(201);
    } catch (error) {
        console.log('Error updating demographics', error);
        res.sendStatus(500);
    }
})




module.exports = router;