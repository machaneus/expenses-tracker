const chai = require('chai');
const should = chai.should();
const sinon = require('sinon');

describe('Expense entry controller tests:', () => {
  let expenseModel;
  let controller;
  let req;
  let res;
  let spyFind;

  beforeEach(() => {
    spyFind = sinon.spy();

    expenseModel = {
      save: sinon.spy(),
      find: (filter, callback) => {
        spyFind(filter);
        callback(null, 'results');
      }
    };

    controller = require('../../src/controllers/expense')(expenseModel);
    res = {
      status: sinon.spy(),
      send: sinon.spy(),
      json: sinon.spy()
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
      res.send.calledOnce.should.equal(true);
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
      res.send.calledOnce.should.equal(true);
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
      res.send.calledOnce.should.equal(true);
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
      res.send.calledOnce.should.equal(true);
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
      expenseModel.save.calledWith(req.body).should.equal(true);
      res.send.calledOnce.should.equal(true);
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
      res.send.calledOnce.should.equal(true);
    });
  });
  describe('expense entries GET', () => {
    it('Should have a get method', () => {
      controller.should.have.property('get');
      controller.post.should.be.a('function');
    });
    it('Should call .find() with {} as filter', () => {
      req = {};
      controller.get(req, res);
      spyFind.calledOnce.should.equal(true, 'Called more than once or never');
      var spyArg = spyFind.args[0][0];
      var spyArgIsEmpty = Object.keys(spyArg).length === 0 && spyArg.constructor === Object;
      spyArgIsEmpty.should.equal(true, 'filter not empty: ' + spyArg);
    });
    it('Should return status 500 on error', () => {
      expenseModel.find = function (filter, callback) {
        spyFind(filter);
        callback(new Error('error'), {});
      };
      req = {};
      controller.get(req, res);
      res.status.calledWith(500).should.equal(true, 'Bad Status ' + res.status.args[0][0]);
      res.send.calledWith('Database error').should.equal(true, 'Bad message ' + res.send.args[0][0]);
      res.send.calledOnce.should.equal(true);
    });
    it('Should return the results on success', () => {
      req = {};
      controller.get(req, res);
      res.json.calledWith('results').should.equal(true, 'Bad json ' + res.json.args[0][0]);
      res.json.calledOnce.should.equal(true);
    });
  });
});
