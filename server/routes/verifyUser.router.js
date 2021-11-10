const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//PUT
router.put('/:randomString', (req, res) => {
  const randomString = req.params.randomString;
  const searchQuery = 'SELECT * FROM "user" WHERE "verification_string" = $1;';
  pool.query(searchQuery, [randomString])
      .then((result) => {
        console.log(result.rows);
        const verifyID = result.rows[0].id;
        const putQuery = 'UPDATE "user" SET "email_verified" = TRUE WHERE "id" = $1;';
        pool.query(putQuery, [verifyID])
        .then(() => {
          res.sendStatus(200);
        })
        .catch((error) => {
          console.log(error);
          res.sendStatus(500);
        })
      })
      .catch((error) => {
        res.sendStatus(500);
        console.log(error);
      })
})




module.exports = router;