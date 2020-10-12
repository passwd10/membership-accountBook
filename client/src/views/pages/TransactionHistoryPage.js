export default function TransactionHistoryPage() {
  const transactionHistoryPage = document.createElement('div');

  const render = () => {
    transactionHistoryPage.innerHTML = `
      <div>
        거래내역
      </div>
    `;
    return transactionHistoryPage;
  };

  return render();
}
