import LoginPage from './views/pages/LoginPage';
import TransactionHistoryPage from './views/pages/TransactionHistoryPage';

export default function Router (path) {
  const routes = {
    '/login': LoginPage(),
    '/': TransactionHistoryPage(),
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
