import observable from './observable';

export default class TransactionsModel extends observable {
  constructor() {
    super();
    this.transactions = [];
  }
}
