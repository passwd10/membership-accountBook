module.exports = (sequelize, DataTypes) => {
  return sequelize.define('transactions', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    type: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    money: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    users_id: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    payment_methods_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    categories_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    timestamps: false,
  });
};
