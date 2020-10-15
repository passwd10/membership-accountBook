import transactionsModel from '../../models/transactionsModel';
import transactionFormModel from '../../models/transactionFormModel';

import { selector } from '../../utils/querySelector';

import '../../styles/TransactionAddForm.css';

const getTemplate = () => `
<section>
  <div class='delete_form'>
    <button class='delete_form_button'>
      내용 지우기
    </button>
  </div>
  <div class='form_type'>
    분류
    <button class='type_button income'>
      수입
    </button>
    <button class='type_button expenditure'>
      지출
    </button>
  </div>
  <div class='form_first_inputs'>
    <span class='form_date'>
      <span>날짜</span>
      <input type='date' id='input_date'/>
    </span>
    <span class='form_category'>
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
    </span>
    <span class='form_payment_method'>
      <span>결제수단</span>
      <select id='select_payment_methods'>
        <option>현대카드</option>
        <option>카카오체크카드</option>
        <option>국민은행</option>
        <option>현금</option>
      </select>
    </span>
  </div>
  <div class='form_second_inputs'>
    <span class='form_money'>
      <span>금액</span>
      <input id='input_money' placeholder='10000'/>
    </span>
    <span class='form_content'>
      <span>내용</span>
      <input id='input_content'placeholder='점심식사'/>
    </span>
  </div>
  <button class='transaction_add_button'>
    확인
  </button>
</section>
`;

let formType = '';

const deleteFormData = () => {
  const transactionHistoryPage = selector('.transactionHistoryPage');
  const date = selector('#input_date', transactionHistoryPage);
  const category = selector('#select_categories', transactionHistoryPage);
  const paymentMethod = selector('#select_payment_methods', transactionHistoryPage);
  const money = selector('#input_money', transactionHistoryPage);
  const content = selector('#input_content', transactionHistoryPage);
  const incomeButton = transactionHistoryPage.getElementsByClassName('type_button income')[0];
  const expendButton = transactionHistoryPage.getElementsByClassName('type_button expenditure')[0];

  date.value = '';
  category.value = '생활';
  paymentMethod.value = '현대카드';
  money.value = '';
  content.value = '';
  incomeButton.classList.remove('clicked');
  expendButton.classList.remove('clicked');
};

const transactionAddEvent = async () => {
  const transactionHistoryPage = selector('.transactionHistoryPage');
  const yearMonth = transactionsModel.year + transactionsModel.month;
  const date = selector('#input_date', transactionHistoryPage);
  const category = selector('#select_categories', transactionHistoryPage);
  const paymentMethod = selector('#select_payment_methods', transactionHistoryPage);
  const money = selector('#input_money', transactionHistoryPage);
  const content = selector('#input_content', transactionHistoryPage);

  const inputData = {
    type: formType,
    date: date.value,
    category: category.value,
    paymentMethod: paymentMethod.value,
    money: money.value,
    content: content.value,
  };

  const result = await transactionsModel.addTransactions(inputData);
  if (result) {
    await transactionsModel.updateTransactions('all', yearMonth);
    deleteFormData();
  }
};

const formTypeEvent = (event) => {
  const targetClassName = event.target.className.split(' ')[1];
  const incomeButton = document.getElementsByClassName('type_button income')[0];
  const expendButton = document.getElementsByClassName('type_button expenditure')[0];

  if (targetClassName === 'income') {
    expendButton.classList.remove('clicked');
    incomeButton.classList.add('clicked');
    formType = 'income';
  }
  if (targetClassName === 'expenditure') {
    incomeButton.classList.remove('clicked');
    expendButton.classList.add('clicked');
    formType = 'expenditure';
  }
};

const formButtonToDeleteEvent = () => {
  deleteFormData();
};

const addEvents = (node) => {
  const transactionAddButton = selector('.transaction_add_button', node);
  const formType = selector('.form_type', node);
  const formButtonToDelete = selector('.delete_form_button', node);

  formType.addEventListener('click', formTypeEvent);
  transactionAddButton.addEventListener('click', transactionAddEvent);
  formButtonToDelete.addEventListener('click', formButtonToDeleteEvent);
};

const updateFormView = ({ id, date, category, type, content, money, payment }) => {
  const transactionForm = selector('.transaction_add_form');
  if (type === 'income') {
    transactionForm.getElementsByClassName('type_button expenditure')[0].classList.remove('clicked');
    transactionForm.getElementsByClassName('type_button income')[0].classList.add('clicked');
  }
  if (type === 'expenditure') {
    transactionForm.getElementsByClassName('type_button income')[0].classList.remove('clicked');
    transactionForm.getElementsByClassName('type_button expenditure')[0].classList.add('clicked');
  }
  selector('#input_date', transactionForm).value = date;
  selector('#input_money', transactionForm).value = money;
  selector('#input_content', transactionForm).value = content;
  selector('#select_categories', transactionForm).value = category;
  selector('#select_payment_methods', transactionForm).value = payment;
};

export default function TransactionAddForm() {
  const transactionAddForm = document.createElement('div');
  transactionAddForm.classList.add('transaction_add_form');

  const render = () => {
    transactionFormModel.subscribe(updateFormView);
    transactionAddForm.innerHTML = getTemplate();
    addEvents(transactionAddForm);
    return transactionAddForm;
  };

  return render();
}
