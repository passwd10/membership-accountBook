import { addTransactions, getTransactions } from '../../apis/transactions';

export default function TransactionHistoryPage() {
  const transactionHistoryPage = document.createElement('div');

  const addTransactionEvent = async () => {
    await addTransactions();
  };

  const getTransactionsEvent = async () => {
    const yearMonth = document.querySelector('.date_input').value;
    const category = document.querySelector('.category_input').value;
    await getTransactions(yearMonth, category);
  };

  const render = () => {
    transactionHistoryPage.innerHTML = `
      <div>
        <button class='add_transaction_button'>
          거래내역 추가
        </button>
      </div>
      <div>
        <input
          class='date_input'
          placeholder='ex) 202010'
        />
        <input
          class='category_input'
          placeholder='ex) 식비'
        />
        <button class='get_transactions_button'>
          거래내역 받아오기
        </button>
      </div>
    `;

    const addTransactionButton = transactionHistoryPage.querySelector('.add_transaction_button');
    const getTransactionsButton = transactionHistoryPage.querySelector('.get_transactions_button');

    addTransactionButton.addEventListener('click', addTransactionEvent);
    getTransactionsButton.addEventListener('click', getTransactionsEvent);

    return transactionHistoryPage;
  };

  return render();
}
