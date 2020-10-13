const express = require('express');
const router = express.Router();

const { addTransaction, getTransactions } = require('../services/transactions');

router.get('/breakdown', async (req, res) => {
  const { yearMonth, type } = req.query;
  const transactions = await getTransactions(yearMonth, type);

  res.json(transactions);
});

router.post('/', async (req, res) => {
  const transactions = req.body;
  const completeToAdd = await addTransaction({ ...transactions, userId: req.userId });
  const completeStatus = completeToAdd ? 'succeed' : 'failure';

  res.json({ result: completeStatus });
});

router.put('/', (req, res) => {

});

router.delete('/', (req, res) => {

});


module.exports = router;
