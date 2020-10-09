import axios from 'axios';

const URL = 'http://localhost:3000';

const dummyData = {
  type: 'expenditure',
  date: new Date(),
  money: '10000',
  content: '점심식사!!',
  paymentMethod: '현금',
  category: '식비',
};

const addTransactions = async () => {
  try {
    const data = await axios.post(`${URL}/transactions`,
      dummyData,
      { withCredentials: true });
    return data;
  } catch (error) {
    console.error('cannot add transactions');
    return false;
  }
};

const getTransactions = async (month, category) => {
  try {
    const data = await axios.get(`${URL}/transactions/breakdown?month=${month}&category=${category}`,
      { withCredentials: true });
    return data;

  } catch (error) {
    console.error('cannot get transactions');
    return false;
  }
};

export { addTransactions, getTransactions };
