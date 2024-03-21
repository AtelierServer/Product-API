const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const db = require('./db.js');

const app = express();
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());


const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})


app.get('/', (req, res) => {
  res.end("hello from server");
})