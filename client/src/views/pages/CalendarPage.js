import TransactionDate from '../components/TransactionDate';
import NavigationMenu from '../components/NavigationMenu';
import Calendar from '../components/Calendar';

export default function CalendarPage() {
  const calendarPage = document.createElement('div');
  calendarPage.classList.add('calendarPage');

  calendarPage.appendChild(TransactionDate());
  calendarPage.appendChild(NavigationMenu());
  calendarPage.appendChild(Calendar());

  const render = () => {
    return calendarPage;
  };

  return render();
}
