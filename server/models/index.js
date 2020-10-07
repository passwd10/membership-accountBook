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

db.Users = require('./users')(sequelize, Sequelize);
db.Categories = require('./categories')(sequelize, Sequelize);


sequelize.sync();

module.exports = db;
