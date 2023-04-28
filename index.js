import express from 'express';
const app = express();
const Pool = import('pg').Pool;

const connectionString = "postgres://llgkghku:kphPG35kI-fFenIueMDaPtgr1fmSr-Gd@hattie.db.elephantsql.com:5432/llgkghku";

const pool = new Pool({
  connectionString
})


app.get('/findStudentById', (request, response) => {
  pool.query('SELECT id, fornavn, efternavn, fag, karakter FROM studerende where id=' + request.query.id + ';', (error, results) => {
    if (error)
      response.status(500).json(error);
    else
      if(results.length === undefined)
        response.status(200).json(results.rows);
      else
        response.status(200).json(results[results.length-1].rows);
  })
});


const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
