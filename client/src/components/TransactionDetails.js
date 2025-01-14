import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Row, Col, Card, Badge } from 'react-bootstrap';
import Loading from './Loading';
import useFetchTransaction from '../hooks/useFetchTransaction';

const TransactionDetails = () => {
  const { txid } = useParams();
  const { transaction, loading } = useFetchTransaction(txid);

  const currencyToSatoshi = (currencyValue, currency) => {
    if (!currencyValue) return 'N/A';
    const satoshis = currencyValue * 100000000;
    return satoshis.toLocaleString() + (currency === 'LTC' ? ' lit' : ' sats');
  };

  const calculateFeeRate = (fee, vsize) => {
    return fee && vsize ? ((fee * 100000000) / vsize).toFixed(2) : 'N/A';
  };

  if (loading) return <Loading />;
  if (!loading && !transaction) return <div>No Data Present</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h2 className="text-center mb-4">🚀 Transaction Details</h2>

      {transaction ? (
        <div>
          <Card className="mb-4 shadow-sm">
            <Card.Header className="bg-primary text-white">
              <h5>
                Transaction Overview <i className="bi bi-info-circle ms-2"></i>
              </h5>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={6}>
                  <p>
                    <strong>TxID:</strong>{' '}
                    <Badge bg="secondary">{transaction.transactionId}</Badge>
                  </p>
                  <p>
                    <strong>Currency:</strong>{' '}
                    <Badge bg="info">{transaction.currency}</Badge>{' '}
                    {/* Display currency */}
                  </p>
                  <p>
                    <strong>Fee:</strong> {transaction.fee || 'N/A'}{' '}
                    {transaction.currency}{' '}
                    <span className="text-muted">
                      (
                      {currencyToSatoshi(transaction.fee, transaction.currency)}
                      )
                    </span>
                  </p>
                  <p>
                    <strong>Vsize:</strong> {transaction.vsize} WU{' '}
                    <i className="bi bi-box text-info"></i>
                  </p>
                  <p>
                    <strong>Weight:</strong> {transaction.weight} WU{' '}
                    <i className="bi bi-bar-chart-steps text-primary"></i>
                  </p>
                </Col>
                <Col md={6}>
                  <p>
                    <strong>Locktime:</strong> {transaction.locktime || '0'}{' '}
                    <i className="bi bi-clock-history text-primary"></i>
                  </p>
                  <p>
                    <strong>Version:</strong> {transaction.version}
                  </p>
                  <p>
                    <strong>Entry Time:</strong>{' '}
                    {transaction.time
                      ? new Date(transaction.time).toLocaleString()
                      : 'N/A'}{' '}
                    <i className="bi bi-calendar-event text-success"></i>
                  </p>
                  <p>
                    <strong>Hash:</strong> {transaction.hash}
                  </p>
                  <p>
                    <strong>Fee Rate:</strong>{' '}
                    {calculateFeeRate(transaction.fee, transaction.vsize)}{' '}
                    {transaction.currency === 'LTC' ? ' lit' : ' sats'}/vB
                  </p>
                </Col>
              </Row>
            </Card.Body>
          </Card>

          <Card className="mb-4 shadow-sm">
            <Card.Header className="bg-success text-white">
              <h5>
                Transaction Inputs (vin){' '}
                <i className="bi bi-box-arrow-in-down"></i>
              </h5>
            </Card.Header>
            <Card.Body>
              {transaction.vin && transaction.vin.length > 0 ? (
                <div>
                  <h5>Total number of inputs: {transaction.vin.length}</h5>
                  {transaction.vin.map((vin, index) => (
                    <Card key={index} className="mb-3 border">
                      <Card.Body>
                        <p>
                          <strong>Address:</strong>{' '}
                          {vin.address || <Badge bg="secondary">N/A</Badge>}
                        </p>
                        <p>
                          <strong>Value:</strong> {vin.value || 'N/A'}{' '}
                          {transaction.currency}{' '}
                          <span className="text-muted">
                            (
                            {currencyToSatoshi(vin.value, transaction.currency)}
                            )
                          </span>
                        </p>
                      </Card.Body>
                    </Card>
                  ))}
                  {transaction.sumVin && (
                    <div className="mt-3">
                      <h6>
                        <strong>Total Input:</strong> {transaction.sumVin}{' '}
                        {transaction.currency}{' '}
                        <span className="text-muted">
                          (
                          {currencyToSatoshi(
                            transaction.sumVin,
                            transaction.currency
                          )}
                          )
                        </span>
                      </h6>
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-center text-muted">No inputs available</p>
              )}
            </Card.Body>
          </Card>

          <Card className="mb-4 shadow-sm">
            <Card.Header className="bg-danger text-white">
              <h5>
                Transaction Outputs (vout){' '}
                <i className="bi bi-box-arrow-right"></i>
              </h5>
            </Card.Header>
            <Card.Body>
              {transaction.vout && transaction.vout.length > 0 ? (
                <div>
                  <h5>Total number of outputs: {transaction.vout.length}</h5>

                  {transaction.vout.map((vout, index) => (
                    <Card key={index} className="mb-3 border">
                      <Card.Body>
                        <p>
                          <strong>Value:</strong> {vout.value}{' '}
                          {transaction.currency}{' '}
                          <span className="text-muted">
                            (
                            {currencyToSatoshi(
                              vout.value,
                              transaction.currency
                            )}
                            )
                          </span>
                        </p>
                        <p>
                          <strong>Address:</strong>{' '}
                          {vout.address || <Badge bg="secondary">N/A</Badge>}
                        </p>
                      </Card.Body>
                    </Card>
                  ))}
                  {transaction.sumVout && (
                    <div className="mt-3">
                      <h6>
                        <strong>Total Output:</strong> {transaction.sumVout}{' '}
                        {transaction.currency}{' '}
                        <span className="text-muted">
                          (
                          {currencyToSatoshi(
                            transaction.sumVout,
                            transaction.currency
                          )}
                          )
                        </span>
                      </h6>
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-center text-muted">No outputs available</p>
              )}
            </Card.Body>
          </Card>
        </div>
      ) : (
        <div className="text-center">No transaction found with that txid</div>
      )}
    </div>
  );
};

export default TransactionDetails;
