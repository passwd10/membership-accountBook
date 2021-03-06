const passport = require('passport');

const { Strategy: LocalStrategy } = require('passport-local');
const { Strategy: JWTStrategy } = require('passport-jwt');

const { Users } = require('../models');

require('dotenv').config();

const passportConfig = {
  usernameField: 'userId',
  passwordField: 'userPassword',
};

const extractCookie = (req) => {
  return req.cookies.token;
};

const JWTConfig = {
  jwtFromRequest: extractCookie,
  secretOrKey: process.env.JWT_SECRET,
};

const verifyUser = async (userId, userPassword, done) => {
  try {
    const user = await Users.findOne({ where: { id: userId } });
    if (!user) {
      return done(null, false, { reason: '존재하지 않는 사용자 입니다' });
    }

    const isCorrectPassword = userPassword === user.password;

    if (isCorrectPassword) {
      return done(null, user);
    }

    return done(null, false, { reason: '올바르지 않은 비밀번호 입니다.' });
  } catch (error) {
    console.error(error);
    done(error);
  }
};

const verifyJWT = async (jwtPayload, done) => {
  try {
    const user = await Users.findOne({ where: { id: jwtPayload.id } });
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

module.exports = () => {
  passport.use('local', new LocalStrategy(passportConfig, verifyUser));
  passport.use('jwt', new JWTStrategy(JWTConfig, verifyJWT));
};
