// const pg = require('pg');
// const pgConnectionDetails = require('../secret-config').postgres;

// const pool = new pg.Pool(pgConnectionDetails);

let expensesModel = (pool) => {
  let find = (filter, callback) => {
    let queryStr = 'SELECT value, necessity, category, timestamp FROM expense';
    pool.connect((err, client, done) => {
      if (err) {
        callback(new Error('Error on db connection: ' + err), undefined)
      }

      let whereFilters = [];
      let whereValues = [];
      Object.keys(filter).forEach(function (key, index) {
        whereFilters.push(key + filter[key].operator + '$' + (index + 1));
        whereValues.push(filter[key].value);
      });

      if (whereFilters.length > 0) {
        queryStr += ' WHERE ' + whereFilters.join(' AND ');
      }
      console.log(queryStr);
      client.query(queryStr, whereValues, (error, results) => {
        done();
        if (error) {
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
