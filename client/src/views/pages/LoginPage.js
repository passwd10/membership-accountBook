import { signIn } from '../../apis/auth';
import { addTransactions, getTransactions } from '../../apis/transactions';

export default function LoginPage() {
  const loginPage = document.createElement('div');

  const render = () => {
    loginPage.innerHTML = `
      <label>아이디</label>
      <input
        class='login_input user_id'
        placeholder='아이디를 입력하세요'
      />
      <label>비밀번호</label>
      <input
        class='login_input user_password'
        type='password'
        placeholder='비밀번호를 입력하세요'
      />
      <button class='sign_button sign_in'>
        로그인
      </button>
      <button class='sign_button sign_up'>
        회원가입
      </button>
      <div>
        <button class='add_transaction_button'>
          거래내역 추가
        </button>
      </div>
      <div>
        <input
          class='date_input'
          placeholder='ex) 202010'
        />
        <input
          class='category_input'
          placeholder='ex) 식비'
        />
        <button class='get_transactions_button'>
          거래내역 받아오기
        </button>
      </div>
    `;

    const loginButton = loginPage.querySelector('.sign_in');
    const addTransactionButton = loginPage.querySelector('.add_transaction_button');
    const getTransactionsButton = loginPage.querySelector('.get_transactions_button');

    const loginEvent = async () => {
      const userInfo = { userId: '', userPassword: '' };

      loginPage
        .querySelectorAll('.login_input')
        .forEach(input_data => {
          if (input_data.className.includes('user_id')) {
            userInfo.userId = input_data.value;
          }

          if (input_data.className.includes('user_password')) {
            userInfo.userPassword = input_data.value;
          }
        });

      await signIn(userInfo);
    };

    const addTransactionEvent = async () => {
      await addTransactions();
    };

    const getTransactionsEvent = async () => {
      const yearMonth = document.querySelector('.date_input').value;
      const category = document.querySelector('.category_input').value;
      await getTransactions(yearMonth, category);
    };

    loginButton.addEventListener('click', loginEvent);
    addTransactionButton.addEventListener('click', addTransactionEvent);
    getTransactionsButton.addEventListener('click', getTransactionsEvent);

    return loginPage;
  };

  return render();
}
