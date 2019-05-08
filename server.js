const express = require('express');
const fs = require('fs');
const path = require('path');
const hbs = require('handlebars');
const bodyParser = require('body-parser');
const formidable = require('formidable');
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
  console.log(req.body);
  const CSV = CSVGenerator(req.body);
  res.render('upload', { CSV });
});

app.post('/upload_file', (req, res) => {
  let uploadFile;
  new formidable.IncomingForm().parse(req)
    .on('field', (name, field) => {
      console.log('Field', name, field)
    })
    .on('file', (name, file) => {
      console.log('Uploaded File', name, file)
      uploadFile = file;
    })
    .on('aborted', () => {
      console.log('Request Aborted')
    })
    .on('error', err => console.log(err))
    .on('end', () => fs.readFile(uploadFile.path, (err, data) => {
      if (err) return console.log(err);
      const CSV = CSVGenerator({data: data.toString()});
      res.render('upload', { CSV });
    }));
});

app.listen(PORT, (() => console.log(`Listening on Port ${PORT}`)));
