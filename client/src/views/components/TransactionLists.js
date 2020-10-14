import transactionsModel from '../../models/transactionsModel';

const updateTransactionListsView = (transactions) => {
  const transactionHistoryPage = document.querySelector('.transactionHistoryPage');
  const transactionsList = transactionHistoryPage.querySelector('.transactions_list');
  const template = transactions.reduce((acc, transaction) => {
    return acc += `<li>${transaction.type} ${transaction.date} ${transaction.content}</li>`;
  }, '');

  transactionsList.innerHTML = template;
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
