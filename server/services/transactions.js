const { Transactions, Categories, PaymentMethods } = require('../models');

require('dotenv').config();

const addTransaction = async({ type, date, money, content, paymentMethod, category, userId }) => {
  try {
    const randomId = Math.floor(Math.random() * 100000);
    const paymentMethodId = [await PaymentMethods.findOne({ where: { title: paymentMethod } })][0].id;
    const categoryId = [await Categories.findOne({ where: { title: category } })][0].id;
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
  } catch (error) {
    return false;
  }
};

module.exports = { addTransaction };
