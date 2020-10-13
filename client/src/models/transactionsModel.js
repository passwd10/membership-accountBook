import observable from './observable';

import { addTransactionsApi, getTransactionsApi } from '../apis/transactions';

export default class TransactionsModel extends observable {
  constructor() {
    super();
  }

  async addTransactions() {
    await addTransactionsApi();
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
