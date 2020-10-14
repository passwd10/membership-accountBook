import transactionsModel from '../../models/transactionsModel';

import { selector } from '../../utils/querySelector';

const updateTransactionListsView = (transactions) => {
  const transactionHistoryPage = selector('.transactionHistoryPage');
  const transactionLists = selector('.transaction_lists', transactionHistoryPage);
  const template = transactions.reduce((acc, transaction) => {
    return acc += `<li>${transaction.type} ${transaction.date} ${transaction.content}</li>`;
  }, '');

  transactionLists.innerHTML = template;
};

export default function TransactionLists() {
  const transactionLists = document.createElement('ul');
  transactionLists.classList.add('transaction_lists');

  const yearMonth = transactionsModel.year + transactionsModel.month;

  transactionsModel.subscribe(updateTransactionListsView);

  const render = () => {
    transactionsModel.updateTransactions('all', yearMonth);
    return transactionLists;
  };

  return render();
}
