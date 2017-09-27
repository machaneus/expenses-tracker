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

      client.query = (queryStr, callback) => {
        clientSpy(queryStr);
        callback(null, {});
      };

      let queryStr = 'SELECT value, necessity, category, timestamp FROM expense';
      pool.connect = (callback) => {
        callback(null, client, done);
      };

      expenseModel = require('../../src/models/expense-model')(pool);
      expenseModel.find({}, findCallback);

      clientSpy.calledWith(queryStr).should.equal(true, 'Bad queryStr ' + clientSpy.args[0][0]);
      done.calledOnce.should.equal(true, 'Done not called at all or called more than once ');
    });
    it('Should perform a SELECT ... WHERE category=... if category filter is specified');
    it('Should perform a SELECT ... WHERE necessity=... if necessity filter is specified');
    it('Should perform a SELECT ... WHERE value^(=|>|<)$... if value filter and operator is specified');
    it('Should return results on succesfull query');
    it('Should call callback with connection error if pool connection fails');
    it('Should call callback with query error if query fails');
  });

  describe('Expense model save', () => {
    it('Should perform an INSERT query with the specified entry');
    it('Should return results on succesfull query');
    it('Should call callback with connection error if pool connection fails');
    it('Should call callback with query error if query fails');
  });
});
