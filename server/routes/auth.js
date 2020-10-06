const express = require('express');
const router = express.Router();

const { isExistUser } = require('../services/users');

router.post('/', async (req, res) => {
  const { userId, userPassword } = req.body;
  const isExist = await isExistUser(userId, userPassword);
  res.send(isExist);
});

module.exports = router;
