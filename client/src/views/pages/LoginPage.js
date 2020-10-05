export default function LoginPage() {
  const loginPage = document.createElement('div');

  const render = () => {
    loginPage.innerHTML = `
      <label>아이디</label>
      <input class='login_input user_id'></input>
      <label>비밀번호</label>
      <input class='login_input user_password'></input>
      <button class='sign_button sign_in'>로그인</button>
      <button class='sign_button sign_up'>회원가입</button>
    `;
    return loginPage;
  };

  return render();
}
