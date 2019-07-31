const express = require('express');

const app = express();

app.use(require('./routes'));

app.listen(3000);