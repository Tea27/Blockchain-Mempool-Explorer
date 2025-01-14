import { useState, useEffect } from 'react';

const useFetchMempoolData = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(false);

  const fetchData = () => {
    if (isFetching) return;
    setIsFetching(true);
    setLoading(true);
    fetch('http://localhost:8080/mempool/fetchPopulatedMempoolData')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setTransactions(Object.values(data));
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      })
      .finally(() => {
        setIsFetching(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { transactions, loading, fetchData };
};

export default useFetchMempoolData;
