import transactionsModel from '../../models/transactionsModel';

import TransactionDate from '../components/TransactionDate';
import TransactionLists from '../components/TransactionLists';

const getTemplate = () => `
  <div>
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
  </div>
  <div>
    내역
    <ul class='transactions_list'>
    </ul>
  </div>
`;

const addTransactionEvent = async () => {
  const transactionHistoryPage = document.querySelector('.transactionHistoryPage');
  const yearMonth = transactionsModel.year + transactionsModel.month;
  const inputData = {
    type: 'expenditure',
    date: transactionHistoryPage.querySelector('#input_date').value,
    category: transactionHistoryPage.querySelector('#select_categories').value,
    paymentMethod: transactionHistoryPage.querySelector('#select_payment_methods').value,
    money: transactionHistoryPage.querySelector('#input_money').value,
    content: transactionHistoryPage.querySelector('#input_content').value,
  };

  await transactionsModel.addTransactions(inputData);
  await transactionsModel.updateTransactions('all', yearMonth);
};

const addEvents = (node) => {
  const addTransactionButton = node.querySelector('.add_transaction_button');

  addTransactionButton.addEventListener('click', addTransactionEvent);
};

export default function TransactionHistoryPage() {
  const transactionHistoryPage = document.createElement('div');
  transactionHistoryPage.classList.add('transactionHistoryPage');

  transactionHistoryPage.appendChild(TransactionDate());
  transactionHistoryPage.appendChild(TransactionLists());

  const render = () => {
    transactionHistoryPage.insertAdjacentHTML('beforeend', getTemplate());
    addEvents(transactionHistoryPage);

    return transactionHistoryPage;
  };

  return render();
}
