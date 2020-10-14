import LoginPage from './views/pages/LoginPage';
import TransactionHistoryPage from './views/pages/TransactionHistoryPage';
import CalendarPage from './views/pages/CalendarPage';
import StatisticsPage from './views/pages/StatisticsPage';

export default function Router (path) {
  const routes = {
    '/login': LoginPage(),
    '/history': TransactionHistoryPage(),
    '/calendar': CalendarPage(),
    '/statistics': StatisticsPage(),
  };

  const render = path => {
    const app = document.getElementById('app');
    const page = routes[path];

    if (!page) {
      app.innerHTML = `${path} Not Found`;
      return;
    }

    while (app.hasChildNodes()) {
      app.removeChild(app.firstChild);
    }

    app.appendChild(page);
  };

  render(path);
}
