import React, { useEffect, useState } from 'react';
import TransactionsChart from './components/charts/TransactionsCharts';
import MempoolTransactions from './components/MempoolTransactions';
import TransactionDetails from './components/TransactionDetails';
import MainNav from './components/Nav';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App() {
  return (
    <Router>
      <div
        className="App bg-primary-subtle text-white"
        data-bs-theme="dark"
        style={{
          width: '100%',
          overflow: 'auto',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {' '}
        <MainNav expand={false} />
        <Routes>
          <Route path="/" element={<MempoolTransactions />} />
          <Route path="/chart" element={<TransactionsChart />} />
          <Route path="/transaction/:txid" element={<TransactionDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
