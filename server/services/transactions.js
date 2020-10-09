const Sequelize = require('sequelize');
const { Op } = Sequelize;

const { Transactions, Categories, PaymentMethods } = require('../models');

require('dotenv').config();

const addTransaction = async({ type, money, content, paymentMethod, category, userId }) => {
  try {
    const randomId = Math.floor(Math.random() * 100000);
    const paymentMethodId = [await PaymentMethods.findOne({ where: { title: paymentMethod } })][0].id;
    const categoryId = [await Categories.findOne({ where: { title: category } })][0].id;
    const date = new Date();

    await Transactions.create({
      id: randomId,
      type: type,
      date: date,
      money: money,
      content: content,
      users_id: userId,
      payment_methods_id: paymentMethodId,
      categories_id: categoryId,
    });

    return true;
  } catch {
    return false;
  }
};

const getTransactions = async(yearMonth, category) => {
  const categoryId = [await Categories.findOne({ where: { title: category } })][0].id;
  const year = yearMonth.slice(0, 4);
  const month = yearMonth.slice(4);
  const startYearMonthCriteria = new Date(year, month - 1, 2, 0, 0, 0);
  const endYearMonthCriteria = new Date(year, month, 1, 0, 0, 0);

  console.log(startYearMonthCriteria, endYearMonthCriteria);
  try {
    const transactions = await Transactions.findAll({
      where: {
        date: {
          [Op.gte]: startYearMonthCriteria,
          [Op.lte]: endYearMonthCriteria,
        },
        categories_id: categoryId,
      },
    });
    return transactions;
  } catch {
    return false;
  }
};

module.exports = { addTransaction, getTransactions };
