const app = require('express')();

app.use(require('cors'));
app.use(require('express').json());
app.use(require('./routes'));
app.use(require('celebrate').errors);

module.exports = app;