import TransactionDate from '../components/TransactionDate';
import NavigationMenu from '../components/NavigationMenu';

export default function CalendarPage() {
  const calendarPage = document.createElement('div');
  calendarPage.classList.add('calendarPage');

  calendarPage.appendChild(TransactionDate());
  calendarPage.appendChild(NavigationMenu());

  const render = () => {
    return calendarPage;
  };

  return render();
}
