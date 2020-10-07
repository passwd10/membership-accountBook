module.exports = (sequelize, DataTypes) => {
  return sequelize.define('payment_methods', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    title: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
  }, {
    timestamps: false,
  });
};
