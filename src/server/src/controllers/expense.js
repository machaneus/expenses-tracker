function expenseController (expenseModel) {
  let post = function post (req, res) {
    if (!req.body.value) {
      res.status(400);
      res.send('Value field is required');
    } else if (!req.body.category) {
      res.status(400);
      res.send('Category field is required');
    } else if (!req.body.necessity) {
      res.status(400);
      res.send('Necessity field is required');
    } else if (!req.body.timestamp) {
      res.status(400);
      res.send('Timestamp field is required');
    } else {
      expenseModel.save(req.body);
      res.status(201);
      res.send('Expense entry saved');
    }
  };

  let get = function get (req, res) {
    if (!req.body) {
      expenseModel.find({}, (err, expenses) => {
        if (err) {
          res.status(500);
          res.send('Database error');
        } else {
          res.json(expenses);
        }
      });
    }
  };

  return { post, get };
}

module.exports = expenseController;
