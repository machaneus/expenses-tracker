const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');

let port = process.env.PORT || 3000;

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('combined'));

app.use('/static', express.static(path.join(__dirname, 'public')));

app.listen(port, function () {
  console.log('Listening on port ' + port);
});
