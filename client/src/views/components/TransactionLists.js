import transactionsModel from '../../models/transactionsModel';
import transactionFormModel from '../../models/transactionFormModel';

import { selector, selectorAll } from '../../utils/querySelector';

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
    template += `<ul class='transaction_list_date ${date}'>${date}`;
    template += allTransactions[date].reduce((acc, transaction) => acc += getListTemplate(transaction), '');
    template += '</ul>';
  }
  return `<ul>${template}</ul>`;
};

const getListTemplate = (transaction) => {
  let listTemplate = '';
  listTemplate += `<li class='transaction_list ${transaction.id}'>`;
  listTemplate += transaction.type === 'expenditure' ?
    `<span class='transaction_list_detail category_expenditure'
      data-type='expenditure'
      data-category='${transaction.category.title}'>
      ${transaction.category.title}
    </span>` :
    `<span class='transaction_list_detail category_income'
      data-type='income'
      data-category='${transaction.category.title}'>
      ${transaction.category.title}
    </span>`;
  listTemplate += `
    <span class='transaction_list_detail content'
      data-content='${transaction.content}'>
      ${transaction.content}
    </span>
    <span class='transaction_list_detail payment_method'
      data-payment='${transaction.payment_method.title}'>
      ${transaction.payment_method.title}
    </span>`;
  listTemplate += transaction.type === 'expenditure' ?
    `<span class='transaction_list_detail money_expenditure'
      data-money='${transaction.money}'
      data-type='expenditure'>
      -${transaction.money}원
    </span></li>` :
    `<span class='transaction_list_detail money_income'
      data-money='${transaction.money}'
      data-type='income'>
      +${transaction.money}원
    </span></li>`;
  return listTemplate;
};

const updateTransactionListsView = (transactions) => {
  const transactionLists = selector('.transaction_lists');
  if (transactionLists) {
    const allTransactions = sortTransactions(transactions, {});
    transactionLists.innerHTML = getTransactionListsTemplate(allTransactions);
  }
};

const getAllInfo = (id, date, listInfos) => {
  const allInfo = { id: id, date: date };

  listInfos.forEach(info => {
    if (info.dataset.category) {
      allInfo.category = info.dataset.category;
    }
    if (info.dataset.type) {
      allInfo.type = info.dataset.type;
    }
    if (info.dataset.payment) {
      allInfo.payment = info.dataset.payment;
    }
    if (info.dataset.money) {
      allInfo.money = info.dataset.money;
    }
    if (info.dataset.content) {
      allInfo.content = info.dataset.content;
    }
  });

  return allInfo;
};

const transactionListsEvent = (event) => {
  const clickedList = event.target.closest('li');
  const clickedDate = event.target.closest('.transaction_list_date');

  if (clickedList && clickedDate) {
    const clickedListId = clickedList.className.split(' ')[1];
    const date = clickedDate.className.split(' ')[1];
    const listInfos = selectorAll('.transaction_list_detail', clickedList);
    const allInfo = getAllInfo(clickedListId, date, listInfos);

    transactionFormModel.updateForm(allInfo);
  }
};

const addEvents = (node) => {
  node.addEventListener('click', transactionListsEvent);
};

export default function TransactionLists() {
  const yearMonth = transactionsModel.year + transactionsModel.month;
  const transactionLists = document.createElement('div');
  transactionLists.classList.add('transaction_lists');
  transactionsModel.subscribe(updateTransactionListsView);

  const render = () => {
    transactionsModel.updateTransactions('all', yearMonth);
    addEvents(transactionLists);
    return transactionLists;
  };

  return render();
}
