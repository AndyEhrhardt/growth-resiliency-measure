const { default: axios } = require('axios');
const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');

router.get('/:id', rejectUnauthenticated, (req,res) => {
    queryText = `SELECT * FROM "assessment" WHERE "id" = $1;`;
    pool.query(queryText, [req.params.id]).then(result => {res.send(result.rows);}).catch(error => {res.sendStatus(500);});
});




module.exports = router;