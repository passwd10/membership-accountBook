const express = require('express');
const router = express.Router();

router.post('/', (req, res, next) => {
  try {
    res.json({ result: true });
  } catch (error) {
    console.error(error);
    next(error);
  }
},
);

module.exports = router;
