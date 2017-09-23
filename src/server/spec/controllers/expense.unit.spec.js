describe('Expense entry controller tests:', () => {
  describe('expense entry POST', () => {
    it('Should have a post method');
    it('Should not allow a POST without a value field');
    it('Should not allow a POST without a necessity field');
    it('Should not allow a POST without a category field');
    it('Should not allow a POST without a timestamp field');
    it('Should call .save() on a correct POST ');
    it('Should return status 201 on a correct POST');
  });
  describe('expense entries GET', () => {
    it('Should have a get method');
    it('Should call .find()');
    it('Should return status 500 on error');
    it('Should return the results on success ');
  });
});
