const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const { isExistUser } = require('../services/users');

require('dotenv').config();

const passportConfig = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

const verifyUser = async (userId, userPassword, done) => {
  try {
    const existUser = await isExistUser(userId, userPassword);

    if (existUser) {
      return done(null, true);
    }

    done(null, false);
  } catch (error) {
    console.error(error);
    done(error);
  }
};

passport.use(new JwtStrategy(passportConfig, verifyUser));
passport.initialize();
