import transactionsModel from '../../models/transactionsModel';

import { selector } from '../../utils/querySelector';

import '../../styles/TransactionLists.css';

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
    template += allTransactions[date].reduce((acc, transaction) => acc += getListTemplate(transaction), '');
  }
  return `<ul>${template}</ul>`;
};

const getListTemplate = (transaction) => {
  let listTemplate = '';
  listTemplate += `<li class='transaction_list ${transaction.id}'>`;
  listTemplate += transaction.type === 'expenditure' ?
    `<span class='transaction_list_detail category_expenditure'>${transaction.category.title}</span>` :
    `<span class='transaction_list_detail category_income'>${transaction.category.title}</span>`;
  listTemplate += `<span class='transaction_list_detail content'>${transaction.content}</span>
      <span class='transaction_list_detail payment_method'>${transaction.payment_method.title}</span>`;
  listTemplate += transaction.type === 'expenditure' ?
    `<span class='transaction_list_detail money_expenditure'>-${transaction.money}원</span></li>` :
    `<span class='transaction_list_detail money_income'>+${transaction.money}원</span></li>`;
  return listTemplate;
};

const updateTransactionListsView = (transactions) => {
  const transactionLists = selector('.transaction_lists');
  if (transactionLists) {
    const allTransactions = sortTransactions(transactions, {});
    transactionLists.innerHTML = getTransactionListsTemplate(allTransactions);
  }
};

export default function TransactionLists() {
  const transactionLists = document.createElement('div');
  transactionLists.classList.add('transaction_lists');

  const yearMonth = transactionsModel.year + transactionsModel.month;

  transactionsModel.subscribe(updateTransactionListsView);

  const render = () => {
    transactionsModel.updateTransactions('all', yearMonth);
    return transactionLists;
  };

  return render();
}
