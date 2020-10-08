const express = require('express');
const router = express.Router();
const passport = require('passport');

const { Strategy: JWTStrategy } = require('passport-jwt');

const { Users } = require('../models');

require('dotenv').config();

router.use(async(req, res, next) => {

  const extractCookie = (req) => {
    return req.cookies.token;
  };

  const JWTConfig = {
    jwtFromRequest: extractCookie,
    secretOrKey: process.env.JWT_SECRET,
  };

  const verifyJWT = async (jwtPayload, done) => {
    try {
      const user = await Users.findOne({ where: { id: jwtPayload.id } });
      req.userId = jwtPayload.id;
      if (user) {
        done(null, user);
        return;
      }

      done(null, false, { reason: '올바르지 않은 인증정보 입니다.' });
    } catch (error) {
      console.error(error);
      done(error);
    }
  };

  await passport.use('jwt', await new JWTStrategy(JWTConfig, verifyJWT));

  next();
});

module.exports = router;
