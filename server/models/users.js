const db = require('./index');

const isExistUser = async (userId, userPassword) => {
  try {
    const getUserQuery = `SELECT EXISTS (SELECT * FROM users WHERE id='${userId}' AND password='${userPassword}') AS success;`;
    const [[rows]] = await db.query(getUserQuery);
    return rows.success === 1 ? true : false;
  } catch (error) {
    return error;
  }
};

module.exports = { isExistUser };
