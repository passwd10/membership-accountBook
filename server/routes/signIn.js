const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

require('dotenv').config();

router.post('/', async(req, res, next) => {
  try {
    passport.authenticate('local', (passportError, user, info) => {
      if (passportError || !user) {
        res.status(400).json({ message: info.reason });
        return;
      }

      req.login(user, { session: false }, (loginError) => {
        if (loginError) {
          res.send(loginError);
          return;
        }

        const token = jwt.sign({
          id: user.id,
          name: user.name,
          auth: user.auth,
        }, process.env.JWT_SECRET);

        res.cookie('token', token, { httpOnly: true });
        res.json({ token });
      });
    })(req, res);
  } catch (error) {
    console.error(error);
    next(error);
  }
});


module.exports = router;
