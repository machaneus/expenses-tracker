const chai = require('chai');
const should = chai.should();
const sinon = require('sinon');

let pool;
let done;
let client;
let findCallback;
let clientSpy;
let expenseModel;

describe('Expense model tests:', () => {

  beforeEach(() => {
    pool = {
      connect: undefined
    };
    done = sinon.spy();
    client = {};
    clientSpy = sinon.spy();
    findCallback = sinon.spy();
  });

  describe('Expense model find', () => {
    it('Should perform a SELECT query with no WHERE if no filter is specified', () => {

      client.query = (queryStr, values, callback) => {
        clientSpy(queryStr, values);
        callback(null, {});
      };

      let queryStr = 'SELECT value, necessity, category, timestamp FROM expense';
      let filter = {};
      pool.connect = (callback) => {
        callback(null, client, done);
      };

      expenseModel = require('../../src/models/expense-model')(pool);
      expenseModel.find(filter, findCallback);

      clientSpy.calledWith(queryStr).should.equal(true, 'Bad queryStr ' + clientSpy.args[0][0]);
      clientSpy.args[0][1].length.should.equal(0);
      done.calledOnce.should.equal(true, 'Done not called at all or called more than once ');
    });
    it('Should perform a SELECT ... WHERE category=... if category filter is specified', () => {
      client.query = (queryStr, values, callback) => {
        clientSpy(queryStr, values);
        callback(null, {});
      };

      let queryStr = 'SELECT value, necessity, category, timestamp FROM expense WHERE category=$1';
      let filter = {
        category: { value: 'food', operator: '=' }
      };
      pool.connect = (callback) => {
        callback(null, client, done);
      };

      expenseModel = require('../../src/models/expense-model')(pool);
      expenseModel.find(filter, findCallback);

      clientSpy.calledWith(queryStr).should.equal(true, 'Bad queryStr: ' + clientSpy.args[0][0]);
      clientSpy.args[0][1].length.should.equal(1);
      clientSpy.args[0][1][0].should.equal('food');
      done.calledOnce.should.equal(true, 'Done not called at all or called more than once ');
    });
    it('Should perform a SELECT ... WHERE necessity=... if necessity filter is specified', () => {
      client.query = (queryStr, values, callback) => {
        clientSpy(queryStr, values);
        callback(null, {});
      };

      let queryStr = 'SELECT value, necessity, category, timestamp FROM expense WHERE necessity=$1';
      let filter = {
        necessity: { value: 'low', operator: '=' }
      };
      pool.connect = (callback) => {
        callback(null, client, done);
      };

      expenseModel = require('../../src/models/expense-model')(pool);
      expenseModel.find(filter, findCallback);

      clientSpy.calledWith(queryStr).should.equal(true, 'Bad queryStr: ' + clientSpy.args[0][0]);
      clientSpy.args[0][1].length.should.equal(1);
      clientSpy.args[0][1][0].should.equal('low');
      done.calledOnce.should.equal(true, 'Done not called at all or called more than once ');
    });
    it('Should perform a SELECT ... WHERE value=... if value filter and = operator is specified', () => {
      client.query = (queryStr, values, callback) => {
        clientSpy(queryStr, values);
        callback(null, {});
      };

      let queryStr = 'SELECT value, necessity, category, timestamp FROM expense WHERE value=$1';
      let filter = {
        value: { value: 38.08, operator: '=' }
      };
      pool.connect = (callback) => {
        callback(null, client, done);
      };

      expenseModel = require('../../src/models/expense-model')(pool);
      expenseModel.find(filter, findCallback);

      clientSpy.calledWith(queryStr).should.equal(true, 'Bad queryStr: ' + clientSpy.args[0][0]);
      clientSpy.args[0][1].length.should.equal(1);
      clientSpy.args[0][1][0].should.equal(38.08);
      done.calledOnce.should.equal(true, 'Done not called at all or called more than once ');
    });
    it('Should perform a SELECT ... WHERE value<=... if value filter and <= operator is specified', () => {
      client.query = (queryStr, values, callback) => {
        clientSpy(queryStr, values);
        callback(null, {});
      };

      let queryStr = 'SELECT value, necessity, category, timestamp FROM expense WHERE value<=$1';
      let filter = {
        value: { value: 56.91, operator: '<=' }
      };
      pool.connect = (callback) => {
        callback(null, client, done);
      };

      expenseModel = require('../../src/models/expense-model')(pool);
      expenseModel.find(filter, findCallback);

      clientSpy.calledWith(queryStr).should.equal(true, 'Bad queryStr: ' + clientSpy.args[0][0]);
      clientSpy.args[0][1].length.should.equal(1);
      clientSpy.args[0][1][0].should.equal(56.91);
      done.calledOnce.should.equal(true, 'Done not called at all or called more than once ');
    });
    it('Should perform a SELECT ... WHERE value<=... if value filter and <= operator is specified', () => {
      client.query = (queryStr, values, callback) => {
        clientSpy(queryStr, values);
        callback(null, {});
      };

      let queryStr = 'SELECT value, necessity, category, timestamp FROM expense WHERE value<=$1';
      let filter = {
        value: { value: 56.91, operator: '<=' }
      };
      pool.connect = (callback) => {
        callback(null, client, done);
      };

      expenseModel = require('../../src/models/expense-model')(pool);
      expenseModel.find(filter, findCallback);

      clientSpy.calledWith(queryStr).should.equal(true, 'Bad queryStr: ' + clientSpy.args[0][0]);
      clientSpy.args[0][1].length.should.equal(1);
      clientSpy.args[0][1][0].should.equal(56.91);
      done.calledOnce.should.equal(true, 'Done not called at all or called more than once ');
    });
    it('Should perform a SELECT ... WHERE value>... if value filter and <= operator is specified', () => {
      client.query = (queryStr, values, callback) => {
        clientSpy(queryStr, values);
        callback(null, {});
      };

      let queryStr = 'SELECT value, necessity, category, timestamp FROM expense WHERE value>$1';
      let filter = {
        value: { value: 3.16, operator: '>' }
      };
      pool.connect = (callback) => {
        callback(null, client, done);
      };

      expenseModel = require('../../src/models/expense-model')(pool);
      expenseModel.find(filter, findCallback);

      clientSpy.calledWith(queryStr).should.equal(true, 'Bad queryStr: ' + clientSpy.args[0][0]);
      clientSpy.args[0][1].length.should.equal(1);
      clientSpy.args[0][1][0].should.equal(3.16);
      done.calledOnce.should.equal(true, 'Done not called at all or called more than once ');
    });
    it('Should perform a SELECT ... FROM expense WHERE ... AND ...', () => {
      client.query = (queryStr, values, callback) => {
        clientSpy(queryStr, values);
        callback(null, {});
      };

      let queryStr = 'SELECT value, necessity, category, timestamp FROM expense WHERE value>$1 AND category=$2';
      let filter = {
        value: { value: 43.62, operator: '>' }, 
        category: { value: 'house', operator: '=' }
      };

      pool.connect = (callback) => {
        callback(null, client, done);
      };

      expenseModel = require('../../src/models/expense-model')(pool);
      expenseModel.find(filter, findCallback);

      clientSpy.calledWith(queryStr).should.equal(true, 'Bad queryStr: ' + clientSpy.args[0][0]);
      clientSpy.args[0][1].length.should.equal(2);
      clientSpy.args[0][1][0].should.equal(43.62);
      clientSpy.args[0][1][1].should.equal('house');
      done.calledOnce.should.equal(true, 'Done not called at all or called more than once ');
    });
    it('Should return results on succesfull query', () => {
      client.query = (queryStr, values, callback) => {
        let results = 'results';
        clientSpy(queryStr, values);
        callback(null, results);
      };

      let filter = {};

      pool.connect = (callback) => {
        callback(null, client, done);
      };

      expenseModel = require('../../src/models/expense-model')(pool);
      expenseModel.find(filter, findCallback);

      findCallback.calledOnce.should.equal(true, 'findCallback not called at all or called more than once ');
      findCallback.calledWith(null, 'results').should.equal(true, 'findCallback called with ' + findCallback.args[0]);
      done.calledOnce.should.equal(true, 'Done not called at all or called more than once ');
    });
    it('Should call callback with connection error if pool connection fails', () => {
      client.query = (queryStr, values, callback) => {
        let results = 'results';
        clientSpy(queryStr, values);
        callback(null, results);
      };

      let filter = {};

      pool.connect = (callback) => {
        callback('db not found!', client, done);
      };

      expenseModel = require('../../src/models/expense-model')(pool);
      expenseModel.find(filter, findCallback);
      findCallback.calledOnce.should.equal(true, 'findCallback not called at all or called more than once ');
      findCallback.args[0][0].message.should.equal('Error on db connection: db not found!', 'findCallback error message: ' + findCallback.args[0][0].message);
      done.calledOnce.should.equal(true, 'Done not called at all or called more than once ');
    });
    it('Should call callback with query error if query fails', () => {
      client.query = (queryStr, values, callback) => {
        let results = 'results';
        clientSpy(queryStr, values);
        callback('Syntax Error near ...', results);
      };

      let filter = {};

      pool.connect = (callback) => {
        callback(null, client, done);
      };

      expenseModel = require('../../src/models/expense-model')(pool);
      expenseModel.find(filter, findCallback);
      findCallback.calledOnce.should.equal(true, 'findCallback not called at all or called more than once ');
      findCallback.args[0][0].message.should.equal('Error on query: Syntax Error near ...');
      done.calledOnce.should.equal(true, 'Done not called at all or called more than once ');
    });
    it('Should sanitize queries');
  });

  describe('Expense model save', () => {
    it('Should perform an INSERT query with the specified entry', () => {
      client.query = (queryStr, values, callback) => {
        let results = 'results';
        clientSpy(queryStr, values);
        callback(null, results);
      };
      let queryStr = 'INSERT INTO expense (value, necessity, category) VALUES ($1, $2, $3);';
      let entry = {
        value: 98.65,
        necessity: 'low',
        category: 'transportation'
      };

      pool.connect = (callback) => {
        callback(null, client, done);
      };

      expenseModel = require('../../src/models/expense-model')(pool);
      expenseModel.save(entry, findCallback);
      clientSpy.callCount.should.equal(1);
      clientSpy.args[0][0].should.equal(queryStr);
      clientSpy.args[0][1][0].should.equal(98.65);
      clientSpy.args[0][1][1].should.equal('low');
      clientSpy.args[0][1][2].should.equal('transportation');
      done.calledOnce.should.equal(true, 'Done not called at all or called more than once ');
    });
    it('Should return results on succesfull query', () => {
      client.query = (queryStr, values, callback) => {
        let results = 'results';
        clientSpy(queryStr, values);
        callback(null, results);
      };

      let entry = {
        value: 98.65,
        necessity: 'low',
        category: 'transportation'
      };

      pool.connect = (callback) => {
        callback(null, client, done);
      };

      expenseModel = require('../../src/models/expense-model')(pool);
      expenseModel.save(entry, findCallback);

      findCallback.calledOnce.should.equal(true, 'findCallback not called at all or called more than once ');
      findCallback.calledWith(null, 'results').should.equal(true, 'findCallback called with ' + findCallback.args[0]);
      done.calledOnce.should.equal(true, 'Done not called at all or called more than once ');
    });
    it('Should call callback with connection error if pool connection fails', () => {
      client.query = (queryStr, values, callback) => {
        let results = 'results';
        clientSpy(queryStr, values);
        callback(null, results);
      };

      let entry = {};

      pool.connect = (callback) => {
        callback('db not found!', client, done);
      };

      expenseModel = require('../../src/models/expense-model')(pool);
      expenseModel.save(entry, findCallback);
      findCallback.calledOnce.should.equal(true, 'findCallback not called at all or called more than once ');
      findCallback.args[0][0].message.should.equal('Error on db connection: db not found!', 'findCallback error message: ' + findCallback.args[0][0].message);
      done.calledOnce.should.equal(true, 'Done not called at all or called more than once ');
    });
    it('Should call callback with query error if query fails', () => {
      client.query = (queryStr, values, callback) => {
        let results = 'results';
        clientSpy(queryStr, values);
        callback('Syntax Error near ...!', results);
      };

      let entry = {};

      pool.connect = (callback) => {
        callback(null, client, done);
      };

      expenseModel = require('../../src/models/expense-model')(pool);
      expenseModel.save(entry, findCallback);
      findCallback.calledOnce.should.equal(true, 'findCallback not called at all or called more than once ');
      findCallback.args[0][0].message.should.equal('Error on query: Syntax Error near ...!');
      done.calledOnce.should.equal(true, 'Done not called at all or called more than once ');
    });
    it('Should sanitize queries');
  });
});
