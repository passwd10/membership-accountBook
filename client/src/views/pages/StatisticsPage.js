import TransactionDate from '../components/TransactionDate';
import NavigationMenu from '../components/NavigationMenu';

export default function StatisticsPage() {
  const statisticsPage = document.createElement('div');
  statisticsPage.classList.add('statisticsPage');

  statisticsPage.appendChild(TransactionDate());
  statisticsPage.appendChild(NavigationMenu());

  const render = () => {
    return statisticsPage;
  };

  return render();
}
