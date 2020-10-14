import transactionsModel from '../../models/transactionsModel';

import { selector } from '../../utils/querySelector';

const getTemplate = (year, month) => `
  ${year}년 ${month}월 통계 그래프
`;

export default function Statistics() {
  const calendar = document.createElement('div');
  calendar.classList.add('calendar');

  const render = () => {
    calendar.innerHTML = getTemplate(transactionsModel.year, transactionsModel.month);
    return calendar;
  };

  return render();
}
