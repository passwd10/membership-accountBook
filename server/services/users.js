const { Users } = require('../models');

const isExistUser = async(userId, userPassword) => {
  const user = await Users.findOne({
    where: { id: userId, password: userPassword },
  }).then(users => {
    return JSON.stringify(users);
  });
  return user === 'null' ? false : true;
};

module.exports = { isExistUser };
