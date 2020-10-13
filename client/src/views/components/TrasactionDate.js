import transactionsModel from '../../models/transactionsModel';

export default function TransactionDate() {
  const transactionDate = document.createElement('div');
  transactionDate.classList.add('month_shift');

  const template = `
    <button class='month_shift_button prev'><</button>
    ${transactionsModel.year}년 ${transactionsModel.month}월
    <button class='month_shift_button next'>></button>
  `;

  const setDateInfo = (action) => {
    if (action === 'prev') {
      transactionsModel.month = Number(transactionsModel.month) - 1;
      if (transactionsModel.month < 1) {
        transactionsModel.year -= 1;
        transactionsModel.month = 12;
      }
    }
    if (action === 'next') {
      transactionsModel.month = Number(transactionsModel.month) + 1;
      if (transactionsModel.month > 12) {
        transactionsModel.year += 1;
        transactionsModel.month = 1;
      }
    }
    transactionsModel.month = String(transactionsModel.month).padStart(2, '0');
    transactionsModel.year = String(transactionsModel.year);
  };

  const monthShiftButtonEvent = (event) => {
    if (event.target.classList[1] === 'next') {
      setDateInfo('next');
    }

    if (event.target.classList[1] === 'prev') {
      setDateInfo('prev');
    }
    const yearMonth = transactionsModel.year + transactionsModel.month;
    transactionsModel.updateTransactions('all', yearMonth);
  };

  const addEvents = () => {
    transactionDate.addEventListener('click', monthShiftButtonEvent);
  };

  const render = () => {
    transactionDate.innerHTML = template;
    addEvents();
    return transactionDate;
  };

  return render();
}
