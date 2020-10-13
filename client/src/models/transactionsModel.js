import observable from './observable';

import { addTransactionsApi, getTransactionsApi } from '../apis/transactions';

export default class TransactionsModel extends observable {
  constructor() {
    super();
  }

  async updateTransactions(yearMonth, category) {
    const transactions = await getTransactionsApi(yearMonth, category);
    this.notifyAll(transactions);
  }
}
