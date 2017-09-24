const chai = require('chai');
const should = chai.should();
const sinon = require('sinon');

describe('Expense entry controller tests:', () => {
  let ExpenseModel;
  let controller;
  let req;
  let res;
  let spySave;
  let spyExpenseModel;

  beforeEach(() => {
    spySave = sinon.spy();
    spyExpenseModel = sinon.spy();
    ExpenseModel = function (obj) {
      spyExpenseModel(obj);
      this.save = function () {
        spySave();
      };
    };
    controller = require('../../src/controllers/expense')(ExpenseModel);
    res = {
      status: sinon.spy(),
      send: sinon.spy()
    };
  });

  describe('expense entry POST', () => {
    it('Should have a post method', () => {
      controller.should.have.property('post');
      controller.post.should.be.a('function');
    });
    it('Should not allow a POST without a value field', () => {
      req = {};
      req.body = {
        'necessity': 'low',
        'category': 'food',
        'timestamp': 1506200350770
      };

      controller.post(req, res);

      res.status.calledWith(400).should.equal(true, 'Bad Status ' + res.status.args[0][0]);
      res.send.calledWith('Value field is required').should.equal(true);
    });
    it('Should not allow a POST without a necessity field', () => {
      req = {};
      req.body = {
        'value': 34.09,
        'category': 'food',
        'timestamp': 1506200350770
      };

      controller.post(req, res);

      res.status.calledWith(400).should.equal(true, 'Bad Status ' + res.status.args[0][0]);
      res.send.calledWith('Necessity field is required').should.equal(true);
    });
    it('Should not allow a POST without a category field', () => {
      req = {};
      req.body = {
        'value': 34.09,
        'necessity': 'low',
        'timestamp': 1506200350770
      };

      controller.post(req, res);

      res.status.calledWith(400).should.equal(true, 'Bad Status ' + res.status.args[0][0]);
      res.send.calledWith('Category field is required').should.equal(true);
    });
    it('Should not allow a POST without a timestamp field', () => {
      req = {};
      req.body = {
        'value': 34.09,
        'necessity': 'low',
        'category': 'food'
      };

      controller.post(req, res);

      res.status.calledWith(400).should.equal(true, 'Bad Status ' + res.status.args[0][0]);
      res.send.calledWith('Timestamp field is required').should.equal(true);
    });
    it('Should call .save() on a correct POST ', () => {
      req = {};
      req.body = {
        'value': 34.09,
        'necessity': 'low',
        'category': 'food',
        'timestamp': 1506200350770
      };
      controller.post(req, res);
      spySave.called.should.equal(true);
      spyExpenseModel.calledWith(req.body).should.equal(true);
    });
    it('Should return status 201 on a correct POST', () => {
      req = {};
      req.body = {
        'value': 34.09,
        'necessity': 'low',
        'category': 'food',
        'timestamp': 1506200350770
      };
      controller.post(req, res);
      res.status.calledWith(201).should.equal(true, 'Bad Status ' + res.status.args[0][0]);
      res.send.calledWith('Expense entry saved').should.equal(true, 'Bad message ' + res.send.args[0][0]);
    });
  });
  describe('expense entries GET', () => {
    it('Should have a get method', () => {
      controller.should.have.property('get');
      controller.post.should.be.a('function');
    });
    it('Should call .find()');
    it('Should return status 500 on error');
    it('Should return the results on success ');
  });
});
