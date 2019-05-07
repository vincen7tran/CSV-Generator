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
  fs.writeFile('form.csv', CSV, 'utf8', err => {
    if (err) return console.log(err);
    console.log('File Written!');
    res.download('./form.csv', err => {
      if (err) console.log(err);
      res.redirect('/');
    })
  })
});

app.listen(PORT, (() => console.log(`Listening on Port ${PORT}`)));
