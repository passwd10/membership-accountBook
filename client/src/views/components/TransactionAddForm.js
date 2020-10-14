import transactionsModel from '../../models/transactionsModel';

import { selector } from '../../../utils/querySelector';

const getTemplate = () => `
  <div>
    분류
    <button>수입</button>
    <button>지출</button>
  </div>
  <div>
    <span>날짜</span>
    <input type='date' id='input_date'/>
    <span>카테고리</span>
    <select id='select_categories'>
      <option>생활</option>
      <option>쇼핑</option>
      <option>카페/간식</option>
      <option>문화/여가</option>
      <option>월급</option>
      <option>식비</option>
      <option>기타</option>
    </select>
    <span>결제수단</span>
    <select id='select_payment_methods'>
      <option>현대카드</option>
      <option>카카오체크카드</option>
      <option>국민은행</option>
      <option>현금</option>
   </select>
  </div>
  <div>
    <span>금액</span>
    <input id='input_money' placeholder='10000'/>
    <span>내용</span>
    <input id='input_content'placeholder='점심식사'/>
  </div>
  <button class='add_transaction_button'>
    확인
  </button>
`;

const addTransactionEvent = async () => {
  const transactionHistoryPage = selector('.transactionHistoryPage');
  const yearMonth = transactionsModel.year + transactionsModel.month;
  const inputData = {
    type: 'expenditure',
    date: selector('#input_date', transactionHistoryPage).value,
    category: selector('#select_categories', transactionHistoryPage).value,
    paymentMethod: selector('#select_payment_methods', transactionHistoryPage).value,
    money: selector('#input_money', transactionHistoryPage).value,
    content: selector('#input_content', transactionHistoryPage).value,
  };

  await transactionsModel.addTransactions(inputData);
  await transactionsModel.updateTransactions('all', yearMonth);
};

const addEvents = (node) => {
  const addTransactionButton = selector('.add_transaction_button', node);

  addTransactionButton.addEventListener('click', addTransactionEvent);
};

export default function TransactionAddForm() {
  const transactionAddForm = document.createElement('div');
  transactionAddForm.classList.add('transaction_add_form');

  const render = () => {
    transactionAddForm.innerHTML = getTemplate();
    addEvents(transactionAddForm);
    return transactionAddForm;
  };

  return render();
}
