import Router from './router';

import './styles/index.css';

(() => {
  const isLogin = localStorage.getItem('isLogin');
  return isLogin === 'true' ? Router('/history') : Router('/login');
})();
