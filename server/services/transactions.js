const passport = require('passport');

const { Transactions, Users, Categories, PaymentMethods } = require('../models');

const { ExtractJwt, Strategy: JWTStrategy } = require('passport-jwt');

require('dotenv').config();

let userId;

const JWTConfig = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: process.env.JWT_SECRET,
};

const verifyJWT = async (jwtPayload, done) => {
  try {
    const user = await Users.findOne({ where: { id: jwtPayload.id } });
    userId = user.id;

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

const addTransaction = async({ type, date, money, content, paymentMethod, category }) => {
  passport.use('jwt', new JWTStrategy(JWTConfig, verifyJWT));

  const randomId = Math.floor(Math.random() * 100000);
  const paymentMethodId = [await PaymentMethods.findOne({ where: { title: paymentMethod } })][0].id;
  const categoryId = [await Categories.findOne({ where: { title: category } })][0].id;
  if (userId) {
    await Transactions.create({
      id: randomId,
      type: type,
      date: date,
      money: money,
      content: content,
      users_id: userId,
      payment_methods_id: paymentMethodId,
      categories_id: categoryId,
    }).then(users => {
      return JSON.stringify(users);
    });
    return true;
  }
  return false;
};

module.exports = { addTransaction };
