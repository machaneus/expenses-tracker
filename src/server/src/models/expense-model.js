// const pg = require('pg');
// const pgConnectionDetails = require('../secret-config').postgres;

// const pool = new pg.Pool(pgConnectionDetails);

let expensesModel = (pool) => {
  let find = (filter, callback) => {
    let queryStr;
    pool.connect((err, client, done) => {
      if (err) {
        callback(new Error('Error on db connection: ' + err), undefined)
      }

      if (!filter.category && !filter.value && !filter.necessity) {
        queryStr = 'SELECT value, necessity, category, timestamp FROM expense';
      }
      client.query(queryStr, (error, results) => {
        done();
        if (error) {
          console.log(error);
          callback(new Error('Error on query: ' + error), undefined);
        } else {
          callback(null, results);
        }
      });
    });
  };

  let save = (entry, callback) => {
    pool.connect((err, client, done) => {
      if (err) {
        console.log('PG pool connection error' + err);
      }

      let queryStr = 'INSERT INTO expense (value, necessity, category) VALUES ($1, $2, $3);';
      let values = [entry.value, entry.necessity, entry.category];
      client.query(queryStr, values, (error, results) => {
        done();
        if (error) {
          console.log(error);
          callback(new Error(error), undefined);
        } else {
          callback(null, results);
        }
      });
    });
  };

  return { find: find, save: save };
};

module.exports = expensesModel;
