import React from 'react';
import useFetchMempoolData from '../../hooks/useFetchMempoolData';
import Loading from '../Loading';
import LineChart from './LineChart';
import ScatterChart from './ScatterChart';

function TransactionsChart() {
  const { transactions, loading, fetchData } = useFetchMempoolData();
  const chartStyle = {
    width: '100%',
    height: '100%',
    marginBottom: '20px',
  };
  return (
    <div
      style={{
        width: '100%',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '20px',
        boxSizing: 'border-box',
      }}
    >
      <div style={{ margin: '20px' }}>
        <button
          className="btn btn-primary"
          onClick={fetchData}
          disabled={loading}
        >
          {loading ? 'Reloading...' : 'Reload Data'}
        </button>
      </div>
      {loading ? (
        <Loading />
      ) : (
        <>
          <h2 style={{ textAlign: 'center', fontSize: '1.5rem' }}>
            Transaction Charts
          </h2>
          <p>Number of transactions: {transactions.length}</p>
          <LineChart transactions={transactions} />
          <ScatterChart transactions={transactions} />
        </>
      )}
    </div>
  );
}

export default TransactionsChart;
