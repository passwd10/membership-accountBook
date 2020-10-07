const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');

const { Users } = require('../models');

require('dotenv').config();

const passportConfig = {
  usernameField: 'userId',
  passwordField: 'userPassword',
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

module.exports = () => {
  passport.use('local', new LocalStrategy(passportConfig, verifyUser));
};
