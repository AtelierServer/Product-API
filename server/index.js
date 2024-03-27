require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const db = require('./db.js');
const productController = require('./controllers/index.js');
const path = require("path");

const app = express();
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '/public')));

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`listening on port ${port}`)
});

app.get('/products', productController.getAll);
app.get('/products/:id', productController.getOne);
app.get('/products/:id/related', productController.getRelated);
app.get('/products/:id/styles', productController.getStyles);
