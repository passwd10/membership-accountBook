import observable from './observable';
class TransactionFormModel extends observable {
  constructor() {
    super();
    this.date = '';
    this.category = '생활';
    this.paymentMethod = '현대카드';
    this.money = '';
    this.content = '';
  }

  updateForm(formInfo) {
    this.notifyAll(formInfo);
  }

}

const transactionFormModel = new TransactionFormModel();

export default transactionFormModel;
