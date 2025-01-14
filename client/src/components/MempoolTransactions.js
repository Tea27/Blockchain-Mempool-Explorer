import React, { useState } from 'react';
import { Accordion, Pagination } from 'react-bootstrap';
import TransactionAccordionItem from './TransactionAccordionItem';
import PaginationControls from './PaginationControls';
import useFetchMempoolData from '../hooks/useFetchMempoolData';
import Loading from './Loading';

function MempoolTransactions() {
  const [activeKey, setActiveKey] = useState('0');
  const [currentPage, setCurrentPage] = useState(1);
  const transactionsPerPage = 6;
  const { transactions, loading, fetchData } = useFetchMempoolData();

  if (!transactions && !loading) {
    return <div>No Data Present</div>;
  }

  const handleAccordionToggle = (index) => {
    setActiveKey(activeKey === index.toString() ? undefined : index.toString());
  };

  const totalPages = Math.ceil(transactions.length / transactionsPerPage);
  const startIndex = (currentPage - 1) * transactionsPerPage;
  const currentTransactions = transactions.slice(
    startIndex,
    startIndex + transactionsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setActiveKey('0');
  };

  return (
    <div
      style={{
        padding: '20px',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>
        Current Transactions
      </h2>
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
          <h5 style={{ marginBottom: '10px' }}>
            Number of transactions: {transactions.length}
          </h5>
          {transactions.length > 0 ? (
            <>
              <Accordion activeKey={activeKey}>
                {currentTransactions.map((transaction, index) => (
                  <TransactionAccordionItem
                    key={index}
                    transaction={transaction}
                    index={index}
                    activeKey={activeKey}
                    handleAccordionToggle={handleAccordionToggle}
                  />
                ))}
              </Accordion>

              <PaginationControls
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </>
          ) : (
            <p
              style={{ textAlign: 'center', fontSize: '1.2rem', color: 'gray' }}
            >
              No transactions available in the mempool.
            </p>
          )}
        </>
      )}
    </div>
  );
}

export default MempoolTransactions;
