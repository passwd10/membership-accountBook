import transactionsModel from '../../models/transactionsModel';

import { selector } from '../../utils/querySelector';

const getTemplate = (year, month) => {
  return `
    ${year}년 ${month}월 달력
  `;
};

const updateCalendarView = () => {
  const transactionHistoryPage = selector('.transactionHistoryPage');
  if (transactionHistoryPage) {
    const monthShift = selector('.month_shift', transactionHistoryPage);
    monthShift.innerHTML = getTemplate(transactionsModel.year, transactionsModel.month);
  }
};

const addEvents = (node) => {

};

export default function Calendar() {
  const calendar = document.createElement('div');
  calendar.classList.add('month_shift');

  transactionsModel.subscribe(updateCalendarView);

  const render = () => {
    calendar.innerHTML = getTemplate(transactionsModel.year, transactionsModel.month);
    addEvents(calendar);
    return calendar;
  };

  return render();
}
