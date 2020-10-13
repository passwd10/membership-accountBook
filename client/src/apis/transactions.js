import axios from 'axios';

const URL = 'http://localhost:3000';

const addTransactionsApi = async (transactionInfo) => {
  try {
    const data = await axios.post(`${URL}/transactions`,
      transactionInfo,
      { withCredentials: true });
    return data;
  } catch (error) {
    console.error('cannot add transactions');
    return false;
  }
};

const getTransactionsApi = async (type, yearMonth) => {
  try {
    const { data } = await axios.get(`${URL}/transactions/breakdown?yearMonth=${yearMonth}&type=${type}`,
      { withCredentials: true });
    return data;

  } catch (error) {
    console.error('cannot get transactions');
    return false;
  }
};

export { addTransactionsApi, getTransactionsApi };
