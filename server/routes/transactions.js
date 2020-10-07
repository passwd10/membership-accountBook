const express = require('express');
const router = express.Router();

const { addTransaction } = require('../services/transactions');

router.post('/', async (req, res) => {
  const transactions = req.body;
  const completeToAdd = await addTransaction(transactions);
  const completeStatus = completeToAdd ? 'succeed' : 'failure';

  res.json({ result: completeStatus });
});

router.put('/', (req, res) => {

});

router.delete('/', (req, res) => {

});


module.exports = router;
