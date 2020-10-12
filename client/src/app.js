import Router from './router';

(() => {
  const isLogin = localStorage.getItem('isLogin');

  return isLogin ? Router('/') : Router('/login');
})();
