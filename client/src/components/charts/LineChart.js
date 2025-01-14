import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  LogarithmicScale,
} from 'chart.js';
import { Chart } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  LogarithmicScale
);

function LineChart({ transactions }) {
  const sortedTransactions = transactions.sort(
    (a, b) => new Date(a.time) - new Date(b.time)
  );

  const currency = sortedTransactions[0]?.currency;

  const valueLabel =
    currency === 'BTC' ? 'Transaction Value (BTC)' : 'Transaction Value (LTC)';
  const feeLabel = currency === 'BTC' ? 'Fee Value (BTC)' : 'Fee Value (LTC)';

  const data = {
    labels: sortedTransactions.map((transaction) =>
      new Date(transaction.time).toLocaleString()
    ),
    datasets: [
      {
        label: valueLabel,
        data: sortedTransactions.map((transaction) => transaction.sumVout),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        fill: true,
      },
      {
        label: feeLabel,
        data: sortedTransactions.map((transaction) => transaction.fee || 0),
        backgroundColor: 'rgba(255, 215, 0, 0.2)',
        borderColor: 'rgba(255, 215, 0, 1)',
        borderWidth: 1,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) => `${context.dataset.label}: ${context.raw}`,
        },
      },
    },
    scales: {
      x: {
        ticks: { color: 'white' },
        grid: { color: 'rgba(255, 255, 255, 0.2)' },
      },
      y: {
        type: 'logarithmic',
        ticks: { color: 'white' },
        grid: { color: 'rgba(255, 255, 255, 0.2)' },
      },
    },
  };

  return (
    <div style={{ paddingBottom: '5rem' }}>
      <Chart type="line" data={data} options={options} />
    </div>
  );
}

export default LineChart;
