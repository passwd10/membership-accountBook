import observable from './observable';

import { addTransactionsApi, getTransactionsApi } from '../apis/transactions';

export default class TransactionsModel extends observable {
  constructor() {
    super();
  }

  async addTransactions(transactionInfo) {
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

  async updateTransactions(category, anotherYearMonth) {
    let yearMonth = anotherYearMonth;

    if (!anotherYearMonth) {
      const date = new Date();
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      yearMonth = `${year}${month}`;
    }
    const transactions = await getTransactionsApi(yearMonth, category);
    this.notifyAll(transactions);
  }
}
