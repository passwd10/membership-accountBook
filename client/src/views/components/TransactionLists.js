import transactionsModel from '../../models/transactionsModel';

import { selector } from '../../utils/querySelector';

const extractDay = (date) => date.split('-')[2].slice(0, 2);
const extractFullDate = (date) => date.split('T')[0];
const sortByDate = (transactions) => transactions.sort((a, b) => Number(extractDay(a.date)) - Number(extractDay(b.date)));

const sortTransactions = (transactions, allTransactions) => {
  sortByDate(transactions).forEach(transaction => {
    const date = extractFullDate(transaction.date);
    allTransactions.hasOwnProperty(date) ?
      allTransactions[date].push(transaction) :
      allTransactions[date] = [transaction];
  });
  return allTransactions;
};

const getTransactionListsTemplate = (allTransactions) => {
  let template = '';
  for (const date in allTransactions) {
    template += `<li class='transaction_list_date'>${date}</li>`;
    template += allTransactions[date].reduce((acc, transaction) => acc += listTemplate(transaction), '');
  }
  return template;
};

const listTemplate = (transaction) => {
  return `
    <li class='transaction_list ${transaction.id}'>
      ${extractFullDate(transaction.date)}
      ${transaction.category.title}
      ${transaction.content}
      ${transaction.payment_method.title}
      -${transaction.money}원
    </li>
    `;
};

const updateTransactionListsView = (transactions) => {
  const transactionLists = selector('.transaction_lists');
  if (transactionLists) {
    const allTransactions = sortTransactions(transactions, {});
    transactionLists.innerHTML = getTransactionListsTemplate(allTransactions);
  }
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
