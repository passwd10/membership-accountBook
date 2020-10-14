import Router from './router';

(() => {
  const isLogin = localStorage.getItem('isLogin');
  return isLogin === 'true' ? Router('/') : Router('/login');
})();
