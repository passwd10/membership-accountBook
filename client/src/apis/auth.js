import axios from 'axios';

const URL = 'http://localhost:3000';

const signIn = async ({ userId, userPassword }) => {
  try {
    const data = await axios.post(`${URL}/signIn`, { userId, userPassword }, { withCredentials: true });
    return data;
  } catch (error) {
    console.error('login fail');
    return false;
  }
};

export { signIn };
