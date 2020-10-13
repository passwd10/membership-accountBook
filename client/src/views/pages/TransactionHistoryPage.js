import { addTransactions, getTransactions } from '../../apis/transactions';

export default function TransactionHistoryPage() {
  const transactionHistoryPage = document.createElement('div');

  const template = `
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
    <div>
      내역
      <ul class='transactions_list'>
      </ul>
    </div>
  `;

  const addTransactionEvent = async () => {
    await addTransactions();
  };

  const getTransactionsEvent = async () => {
    const yearMonth = document.querySelector('.date_input').value;
    const category = document.querySelector('.category_input').value;
    const transactions = await getTransactions(yearMonth, category);

    const transactionsList = transactionHistoryPage.querySelector('.transactions_list');
    transactions.forEach(transaction => {
      transactionsList.insertAdjacentHTML('afterend', `<li>${transaction.type} ${transaction.date} ${transaction.content}</li>`);
    });
  };

  const addEvent = (node) => {
    const addTransactionButton = node.querySelector('.add_transaction_button');
    const getTransactionsButton = node.querySelector('.get_transactions_button');

    addTransactionButton.addEventListener('click', addTransactionEvent);
    getTransactionsButton.addEventListener('click', getTransactionsEvent);
  };

  const render = () => {
    transactionHistoryPage.innerHTML = template;
    addEvent(transactionHistoryPage);
    return transactionHistoryPage;
  };

  return render();
}
