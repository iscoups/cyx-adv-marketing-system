const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const path = require('path');
require('dotenv').config();

const apiRouter = require('./routes');
const db = require('./models');

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/', (req, res) => {
  res.json({
    code: 0,
    message: 'CYX API is running'
  });
});

app.use('/api', apiRouter);

app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    code: err.status || 500,
    message: err.message || 'Internal Server Error'
  });
});

db.sequelize
  .authenticate()
  .then(() => {
    console.log('Database connection established');
  })
  .catch((error) => {
    console.warn('Database connection failed:', error.message);
  });

module.exports = app;
