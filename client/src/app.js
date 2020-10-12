import LoginPage from './views/pages/LoginPage';
import TransactionHistoryPage from './views/pages/TransactionHistoryPage';

(() => {
  const app = document.getElementById('app');

  const routes = {
    '/login': LoginPage(),
    '/': TransactionHistoryPage(),
  };

  const render = path => {
    const url = routes[path];

    if (!url) {
      app.innerHTML = `${path} Not Found`;
      return;
    }

    app.appendChild(url);
  };

  const isLogin = localStorage.getItem('isLogin');

  if (!isLogin) {
    render('/login');
    return;
  }
  render('/');
})();
