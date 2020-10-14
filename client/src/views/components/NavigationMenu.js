import { selector } from '../../utils/querySelector';

import Router from '../../router';

import '../../styles/NavigationMenu.css';

const getTemplate = () => `
  <ul class='navigation_menu_ul'>
    <li class='history_li'>내역</li>
    <li class='calendar_li'>달력</li>
    <li class='statistics_li'>통계</li>
  </ul>
`;

const addEvents = (node) => {
  const navigationUl = selector('.navigation_menu_ul', node);
  navigationUl.addEventListener('click', navigationEvents);
};

const navigationEvents = (event) => {
  const className = event.target.className;
  if (className === 'history_li') {
    Router('/history');
  }

  if (className === 'calendar_li') {
    Router('/calendar');
  }

  if (className === 'statistics_li') {
    Router('/statistics');
  }
};

export default function NavigationMenu () {
  const navigationMenu = document.createElement('nav');

  const render = () => {
    navigationMenu.innerHTML = getTemplate();
    addEvents(navigationMenu);
    return navigationMenu;
  };

  return render();
}
