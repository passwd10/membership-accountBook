const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const passport = require('passport');
const passportConfig = require('./passport');

const authRouter = require('./routes/auth');

const app = express();

app.use(logger('dev'));
app.use(cors({
  origin: true,
  credentials: true,
}));
app.use(passport.initialize());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

passportConfig();

app.use('/signIn', authRouter);

app.use((req, res) => {
  res.status(404).send('error');
});

module.exports = app;
