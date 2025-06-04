import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip,
} from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Legend, Tooltip);

const StockChart = ({ data }) => {
  if (!data || data.length === 0) return <p>No data available.</p>;

  const prices = data.map(d => d.price);
  const labels = data.map(d =>
    new Date(d.lastUpdatedAt).toLocaleTimeString()
  );

  const average = prices.reduce((a, b) => a + b, 0) / prices.length;

  return (
    <Line
      data={{
        labels,
        datasets: [
          {
            label: 'Stock Price',
            data: prices,
            borderColor: 'blue',
            tension: 0.4,
          },
          {
            label: 'Average Price',
            data: new Array(prices.length).fill(average),
            borderColor: 'red',
            borderDash: [5, 5],
          },
        ],
      }}
      options={{
        responsive: true,
        plugins: {
          tooltip: {
            mode: 'index',
            intersect: false,
          },
        },
        interaction: {
          mode: 'nearest',
          axis: 'x',
          intersect: false,
        },
      }}
    />
  );
};

export default StockChart;
