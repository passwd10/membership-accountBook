import observable from './observable';

import { addTransactionsApi, getTransactionsApi } from '../apis/transactions';

class TransactionsModel extends observable {
  constructor() {
    super();
    this.year = this.getYear();
    this.month = this.getMonth();
  }

  getYear () {
    return new Date().getFullYear();
  }

  getMonth() {
    return String(new Date().getMonth() + 1).padStart(2, '0');
  }

  async addTransactions(transactionInfo) {
    if (transactionInfo.type === '') {
      console.log('수입/지출을 선택해주세요');
      return false;
    }
    if (transactionInfo.date === '') {
      console.log('날짜를 잘못입력했습니다');
      return false;
    }
    if (transactionInfo.money <= 0) {
      console.log('금액을 잘못입력했습니다');
      return false;
    }
    if (transactionInfo.content === '') {
      console.log('내용을 입력해주세요');
      return false;
    }
    await addTransactionsApi(transactionInfo);
  }

  async updateTransactions(type, yearMonth) {
    const transactions = await getTransactionsApi(type, yearMonth);
    this.notifyAll(transactions);
  }
}

const transactionsModel = new TransactionsModel();

export default transactionsModel;
