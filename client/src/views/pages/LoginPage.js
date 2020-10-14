import Router from '../../router';

import { signIn } from '../../apis/auth';

const getTemplate = () => `
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
`;

const loginEvent = async () => {
  const loginPage = document.querySelector('.login_page');
  const loginInputs = loginPage.querySelectorAll('.login_input');
  const userInfo = { userId: '', userPassword: '' };

  loginInputs.forEach(input_data => {
    if (input_data.className.includes('user_id')) {
      userInfo.userId = input_data.value;
    }

    if (input_data.className.includes('user_password')) {
      userInfo.userPassword = input_data.value;
    }
  });

  const loginResult = await signIn(userInfo);
  localStorage.setItem('isLogin', loginResult);

  if (loginResult) {
    Router('/');
  }
};

const addEvents = (node) => {
  const loginButton = node.querySelector('.sign_in');

  loginButton.addEventListener('click', loginEvent);
};

export default function LoginPage() {
  const loginPage = document.createElement('div');
  loginPage.classList.add('login_page');

  const render = () => {
    loginPage.innerHTML = getTemplate();
    addEvents(loginPage);
    return loginPage;
  };

  return render();
}
