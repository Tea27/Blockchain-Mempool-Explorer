import { useState, useEffect } from 'react';

const useFetchTransaction = (transactionId) => {
  const [transaction, setTransaction] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = () => {
    setLoading(true);
    fetch(`http://localhost:8080/mempool/fetchTransactionInfo/${transactionId}`)
      .then((response) => response.json())
      .then((data) => {
        setTransaction(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (transactionId) {
      fetchData();
    }
  }, [transactionId]);

  return { transaction, loading, fetchData };
};

export default useFetchTransaction;
