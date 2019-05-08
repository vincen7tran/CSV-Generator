const express = require('express');
const fs = require('fs');
const path = require('path');
const hbs = require('handlebars');
const bodyParser = require('body-parser');
const CSVGenerator = require('./public/CSVGenerator');

const app = express();
const PORT = 3000;

const viewsPath = path.join(__dirname, './templates/views');

app.set('view engine', 'hbs');
app.set('views', viewsPath);

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

app.use(express.static('public'));

app.post('/upload_json', (req, res) => {
  const CSV = CSVGenerator(req.body);
  res.render('upload', { CSV });
});

app.listen(PORT, (() => console.log(`Listening on Port ${PORT}`)));
