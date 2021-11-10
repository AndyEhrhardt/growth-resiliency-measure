const { default: axios } = require('axios');
const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');

router.get('/:id', (req,res) => {
    console.log('in get student report router');
    queryText = `SELECT * FROM assessments WHERE "student_id" = $1;`;
    pool.query(queryText, [req.user.id]).then(result => {res.send(result.rows);}).catch(error => {res.sendStatus(500);});
});

module.exports = router;