const express = require('express');
const path = require('path');
const chalk = require('chalk');
const open = require('open');
const compression = require('compression');


console.log(chalk.blue('Testing release build'));

const app = express();

app.use(compression());
app.use(express.static(path.resolve(__dirname, '../dist')));
app.get('*', function(req, res) {
  res.sendFile(path.resolve(__dirname, '../dist/index.html'));
});


app.listen(80, err => {
  if (err)
    console.log(chalk.red(err));
  else
    open('http://localhost');
});
