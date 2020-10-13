import { signIn } from '../../apis/auth';
import Router from '../../router';

export default function LoginPage() {
  const loginPage = document.createElement('div');

  const template = `
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

    const result = await signIn(userInfo);
    localStorage.setItem('isLogin', result);
    if (result) {
      Router('/');
    }
  };

  const addEvent = (node) => {
    const loginButton = node.querySelector('.sign_in');

    loginButton.addEventListener('click', loginEvent);
  };

  const render = () => {
    loginPage.innerHTML = template;
    addEvent(loginPage);
    return loginPage;
  };

  return render();
}
