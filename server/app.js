const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const passport = require('passport');
const passportConfig = require('./passport');

const authRouter = require('./routes/auth');
const signInRouter = require('./routes/signIn');
const transactionsInRouter = require('./routes/transactions');

const app = express();

app.use(logger('dev'));
app.use(cors({
  origin: true,
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(passport.initialize());
passportConfig();

const auth = passport.authenticate('jwt', { session: false });

app.use('/signIn', signInRouter);
app.use('/auth', auth, authRouter);
app.use('/transactions', auth, transactionsInRouter);

app.use((req, res) => {
  res.status(404).send('error');
});

module.exports = app;
