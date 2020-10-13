import transactionsModel from '../../models/transactionsModel';

import TransactionDate from '../components/TrasactionDate';

export default function TransactionHistoryPage() {
  const transactionHistoryPage = document.createElement('div');
  transactionHistoryPage.classList.add('transactionHistoryPage');
  console.log(TransactionDate());
  transactionHistoryPage.appendChild(TransactionDate());

  const yearMonth = transactionsModel.year + transactionsModel.month;
  const template = `
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
    const inputData = {
      type: 'expenditure',
      date: transactionHistoryPage.querySelector('#input_date').value,
      category: transactionHistoryPage.querySelector('#select_categories').value,
      paymentMethod: transactionHistoryPage.querySelector('#select_payment_methods').value,
      money: transactionHistoryPage.querySelector('#input_money').value,
      content: transactionHistoryPage.querySelector('#input_content').value,
    };
    const yearMonth = transactionsModel.year + transactionsModel.month;
    await transactionsModel.addTransactions(inputData);
    await transactionsModel.updateTransactions('all', yearMonth);
  };

  const addEvents = (node) => {
    const addTransactionButton = node.querySelector('.add_transaction_button');

    addTransactionButton.addEventListener('click', addTransactionEvent);
  };

  const updateTransactionHistoryPageView = (transactions) => {
    const transactionHistoryPage = document.querySelector('.transactionHistoryPage');
    const transactionsList = transactionHistoryPage.querySelector('.transactions_list');
    const monthShift = transactionHistoryPage.querySelector('.month_shift');

    while (transactionsList.hasChildNodes()) {
      transactionsList.removeChild(transactionsList.firstChild);
    }

    monthShift.innerHTML = `
      <button class='month_shift_button prev'><</button>
      ${transactionsModel.year}년 ${transactionsModel.month}월
      <button class='month_shift_button next'>></button>
    `;

    transactions.forEach(transaction => {
      transactionsList.insertAdjacentHTML('afterbegin', `<li>${transaction.type} ${transaction.date} ${transaction.content}</li>`);
    });
  };

  transactionsModel.subscribe(updateTransactionHistoryPageView);

  const render = () => {
    transactionHistoryPage.insertAdjacentHTML('beforeend', template);
    addEvents(transactionHistoryPage);
    transactionsModel.updateTransactions('all', yearMonth);

    return transactionHistoryPage;
  };

  return render();
}
