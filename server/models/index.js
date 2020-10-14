const Sequelize = require('sequelize');

require('dotenv').config();

const db = {};
const config = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
  dialect: process.env.DB_DIALECT,
};

const sequelize = new Sequelize(
  config.database, config.user, config.password, config,
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

const Users = require('./users')(sequelize, Sequelize);
const Categories = require('./categories')(sequelize, Sequelize);
const PaymentMethods = require('./paymentMethods')(sequelize, Sequelize);
const Transactions = require('./transactions')(sequelize, Sequelize);

Transactions.belongsTo(Users, { foreignKey: 'users_id' });
Transactions.belongsTo(Categories, { foreignKey: 'categories_id' });
Transactions.belongsTo(PaymentMethods, { foreignKey: 'payment_methods_id' });

db.Users = Users;
db.Categories = Categories;
db.PaymentMethods = PaymentMethods;
db.Transactions = Transactions;


sequelize.sync();
console.log('All models were synchronized successfully.');

module.exports = db;
