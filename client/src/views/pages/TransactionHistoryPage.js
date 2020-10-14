import TransactionDate from '../components/TransactionDate';
import TransactionAddForm from '../components/TransactionAddForm';
import TransactionLists from '../components/TransactionLists';

export default function TransactionHistoryPage() {
  const transactionHistoryPage = document.createElement('div');
  transactionHistoryPage.classList.add('transactionHistoryPage');

  transactionHistoryPage.appendChild(TransactionDate());
  transactionHistoryPage.appendChild(TransactionAddForm());
  transactionHistoryPage.appendChild(TransactionLists());

  const render = () => {
    return transactionHistoryPage;
  };

  return render();
}
