import axios from 'axios';

const URL = 'http://localhost:3000';

const token = document.cookie.split('=')[1];

axios.defaults.headers.common['Authorization'] = token;

const addTransactions = async () => {
  try {
    const data = await axios.post(`${URL}/transactions`,
      { },
      { withCredentials: true });
    return data;
  } catch (error) {
    console.error('cannot add transactions');
    return false;
  }
};

export { addTransactions };
