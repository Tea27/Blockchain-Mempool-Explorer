import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Chart } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const ScatterChart = ({ transactions }) => {
  const currency = transactions[0]?.currency || 'BTC';

  const feeLabel = currency === 'BTC' ? 'Fee (BTC)' : 'Fee (LTC)';
  const valueLabel =
    currency === 'BTC' ? 'Transaction Value (BTC)' : 'Transaction Value (LTC)';
  const sizeLabel = 'Size (WU)';

  const chartData = {
    datasets: [
      {
        label: feeLabel,
        data: transactions.map((transaction) => ({
          x: transaction.fee,
          y: transaction.sumVout,
        })),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        pointRadius: 5,
      },
      {
        label: sizeLabel,
        data: transactions.map((transaction) => ({
          x: transaction.size,
          y: transaction.sumVout,
        })),
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        pointRadius: 5,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: `Fee (${currency}) / Size (WU)`,
        },
        type: 'logarithmic',
        position: 'bottom',
      },
      y: {
        title: {
          display: true,
          text: `Value (${currency})`,
        },
        type: 'logarithmic',
        position: 'left',
      },
    },
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const { x, y } = context.raw;
            const datasetLabel = context.dataset.label;

            if (datasetLabel === sizeLabel) {
              return `Size = ${x} WU, Value = ${y} ${currency}`;
            }
            return `Fee = ${x} ${currency}, Value = ${y} ${currency}`;
          },
        },
      },
    },
  };

  return (
    <div style={{ marginBottom: '20px' }}>
      <Chart type="scatter" data={chartData} options={chartOptions} />
    </div>
  );
};

export default ScatterChart;
