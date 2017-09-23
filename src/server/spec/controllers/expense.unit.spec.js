const chai = require('chai');
const should = chai.should();

describe('Expense entry controller tests:', () => {
  let ExpenseModel;
  let controller;
  beforeEach(() => {
    ExpenseModel = (obj) => {};
    controller = require('../../src/controllers/expense')(ExpenseModel);
  });
  describe('expense entry POST', () => {
    it('Should have a post method', () => {
      controller.should.have.property('post');
      controller.post.should.be.a('function');
    });
    it('Should not allow a POST without a value field');
    it('Should not allow a POST without a necessity field');
    it('Should not allow a POST without a category field');
    it('Should not allow a POST without a timestamp field');
    it('Should call .save() on a correct POST ');
    it('Should return status 201 on a correct POST');
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
