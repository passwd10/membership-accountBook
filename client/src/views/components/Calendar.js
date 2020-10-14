import transactionsModel from '../../models/transactionsModel';

import { selector } from '../../utils/querySelector';

const getTemplate = (year, month) => `
  ${year}년 ${month}월 달력
`;

export default function Calendar() {
  const calendar = document.createElement('div');
  calendar.classList.add('calendar');

  const render = () => {
    calendar.innerHTML = getTemplate(transactionsModel.year, transactionsModel.month);
    return calendar;
  };

  return render();
}
