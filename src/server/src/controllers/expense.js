function expenseController (ExpenseModel) {
  let post = function post (req, res) {
    let expense = new ExpenseModel(req.body);
    if (!req.value) {
      res.status(400);
      res.send('Value field is required');
    }
    if (!req.category) {
      res.status(400);
      res.send('Category field is required');
    }
    if (!req.necessity) {
      res.status(400);
      res.send('Necessity field is required');
    }
    if (!req.timestamp) {
      res.status(400);
      res.send('Timestamp field is required');
    } else {
      expense.save();
      res.status(201);
      res.send('Expense entry saved');
    }
  };

  let get = function get (req, res) {
    ExpenseModel.find({}, (err, expenses) => {
      if (err) {
        res.status(500);
        res.send('Database error');
      } else {
        res.json(expenses);
      }
    });
  };

  return {post, get};
}

module.exports = expenseController;
