import TransactionDate from '../components/TransactionDate';
import NavigationMenu from '../components/NavigationMenu';
import StatisticsGraph from '../components/StatisticsGraph';

export default function StatisticsPage() {
  const statisticsPage = document.createElement('div');
  statisticsPage.classList.add('statisticsPage');

  statisticsPage.appendChild(TransactionDate());
  statisticsPage.appendChild(NavigationMenu());
  statisticsPage.appendChild(StatisticsGraph());

  const render = () => {
    return statisticsPage;
  };

  return render();
}
