import React, { useState } from 'react';
import { Accordion, Overlay, Tooltip, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function TransactionAccordionItem({
  transaction,
  index,
  activeKey,
  handleAccordionToggle,
}) {
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipTarget, setTooltipTarget] = useState(null);

  const handleCopyTxid = (txid, target) => {
    navigator.clipboard
      .writeText(txid)
      .then(() => {
        setTooltipTarget(target);
        setShowTooltip(true);
        setTimeout(() => setShowTooltip(false), 1000);
      })
      .catch((error) =>
        console.error('Error copying text to clipboard:', error)
      );
  };

  const formatCurrency = (value, currency) => {
    if (!value) return 'N/A';
    return `${value} ${currency}`;
  };

  const getCurrencyIcon = (currency) => {
    if (currency === 'BTC') {
      return (
        <i className="bi bi-currency-bitcoin bg-warning rounded text-black"></i>
      );
    } else if (currency === 'LTC') {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          className="bg-primary rounded text-white"
        >
          <path
            fill="currentColor"
            d="m5.038 16.012l-1.788.7l.862-3.462l1.8-.725L8.512 2h6.413l-1.9 7.75l1.763-.713l-.85 3.426l-1.776.725l-1.062 4.526h9.65L19.662 22h-16.1z"
          ></path>
        </svg>
      );
    }
    return null;
  };

  return (
    <Accordion.Item eventKey={index.toString()}>
      <Accordion.Header onClick={() => handleAccordionToggle(index)}>
        TxID: {transaction.txid?.slice(0, 10)}...{transaction.txid?.slice(-5)}
      </Accordion.Header>
      <Accordion.Body>
        <div style={{ fontSize: '1rem', lineHeight: '1.8' }}>
          <p style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <span>Copy TxID:</span>
            <i
              className="bi bi-clipboard pe-1 text-primary-emphasis"
              style={{ cursor: 'pointer', marginLeft: '10px' }}
              onClick={(e) => handleCopyTxid(transaction.txid, e.target)}
            ></i>
            <Overlay target={tooltipTarget} show={showTooltip} placement="top">
              {(props) => (
                <Tooltip id={`tooltip-${transaction.txid}`} {...props}>
                  Copied!
                </Tooltip>
              )}
            </Overlay>
          </p>
          <Table striped bordered hover responsive variant="dark">
            <thead>
              <tr>
                <th>
                  <span className="pe-2">Weight</span>
                  <i className="bi bi-bar-chart-steps rounded text-primary-emphasis"></i>
                </th>
                <th>
                  <span className="pe-2">Value</span>
                  {getCurrencyIcon(transaction.currency)}
                </th>
                <th>
                  <span className="pe-2">Fee</span>
                  {getCurrencyIcon(transaction.currency)}
                </th>
                <th>
                  <span className="pe-2">Time of entering mempool</span>
                  <i className="bi bi-clock-history bitcoin rounded text-primary-emphasis" />
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{transaction.weight || 'N/A'} WU</td>
                <td>
                  {formatCurrency(transaction.sumVout, transaction.currency) ||
                    'N/A'}
                </td>
                <td>
                  {formatCurrency(transaction.fee, transaction.currency) ||
                    'N/A'}
                </td>
                <td>
                  {transaction.time
                    ? new Date(transaction.time).toLocaleString()
                    : 'N/A'}
                </td>
              </tr>
            </tbody>
          </Table>
          <p style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <span className="pe-2">More info...</span>
            <Link to={`/transaction/${transaction.txid}`}>
              <i className="bi bi-arrow-up-right-square"></i>
            </Link>
          </p>
        </div>
      </Accordion.Body>
    </Accordion.Item>
  );
}

export default TransactionAccordionItem;
