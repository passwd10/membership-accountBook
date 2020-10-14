const Sequelize = require('sequelize');
const { Op } = Sequelize;

const { Transactions, Categories, PaymentMethods } = require('../models');

require('dotenv').config();

const addTransaction = async({ type, money, content, paymentMethod, category, userId, date }) => {
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
    });

    return true;
  } catch {
    return false;
  }
};

const getTransactions = async(yearMonth, type) => {
  const year = yearMonth.slice(0, 4);
  const month = yearMonth.slice(4);
  const startYearMonthCriteria = new Date(year, month - 1, 2, -15, 0, 0);
  const endYearMonthCriteria = new Date(year, month, 1, -15, 0, 0);
  try {
    const searchOption = {
      include: [
        {
          model: Categories,
          attributes: ['title'],
        },
        {
          model: PaymentMethods,
          attributes: ['title'],
        },
      ],
      where: {
        date: {
          [Op.gte]: startYearMonthCriteria,
          [Op.lte]: endYearMonthCriteria,
        },
      },
    };

    if (type !== 'all') {
      searchOption.where.type = type;
    }

    const transactions = await Transactions.findAll(searchOption);
    return transactions;
  } catch {
    return false;
  }
};

module.exports = { addTransaction, getTransactions };
