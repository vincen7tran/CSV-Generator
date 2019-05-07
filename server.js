const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const CSVGenerator = require('./public/CSVGenerator');

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

app.use(express.static('public'));

app.post('/upload_json', (req, res) => {
  const CSV = CSVGenerator(req.body);
  res.end(CSV);
});

app.listen(PORT, (() => console.log(`Listening on Port ${PORT}`)));
