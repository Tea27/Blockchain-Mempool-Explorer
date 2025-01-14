const client = require('../config/rpcClient');
const pLimit = require('p-limit');
const limit = pLimit(15);

const fetchRawTransactions = async (txids) => {
  return await Promise.all(
    txids.map((txid) => limit(() => client.getRawTransaction(txid, true)))
  );
};

const fetchPopulatedMempoolData = async (req, res) => {
  try {
    const mempool = await client.getRawMempool(true);
    const txids = Object.keys(mempool);
    console.log(txids.length);

    const rawTransactions = await fetchRawTransactions(txids);

    const mappedTransactions = rawTransactions.map((rawTransaction) => {
      if (!rawTransaction) return null;
      const transaction = mempool[rawTransaction.txid];
      const timeEnteredMempool = transaction.time
        ? new Date(transaction.time * 1000)
        : null;

      const sumVout = rawTransaction.vout.reduce(
        (acc, vout) => acc + vout.value,
        0
      );

      console.log('Transaction:', transaction);

      const currency = process.env.RPC_PORT === process.env.LTC ? 'LTC' : 'BTC';

      return {
        txid: rawTransaction.txid,
        height: transaction?.height,
        hash: rawTransaction.hash,
        size: rawTransaction.size,
        weight: rawTransaction.weight,
        sumVout,
        fee: transaction?.fees?.base,
        time: timeEnteredMempool,
        currency,
      };
    });

    res.json(mappedTransactions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const fetchTransactionInfo = async (req, res) => {
  const id = req.params.id;

  try {
    const mempool = await client.getRawMempool(true);
    const transaction = mempool[id];

    const rawTransaction = await client.getRawTransaction(id, true);

    const vinDetails = [];
    const voutDetails = [];
    let sumVin = 0;
    let sumVout = 0;

    const vinPromises = rawTransaction.vin.map(async (vin) => {
      try {
        const vinTransaction = await client.getRawTransaction(vin.txid, true);

        const inputVout = vinTransaction.vout[vin.vout];
        if (inputVout) {
          console.log(inputVout);
          const address =
            inputVout.scriptPubKey?.address ||
            inputVout.scriptPubKey?.addresses ||
            'Unknown Address';
          const value = inputVout.value || 0;
          console.log(inputVout.scriptPubKey);

          vinDetails.push({ address, value });

          sumVin += value;
        }
      } catch (error) {
        console.error(`Error fetching input transaction ${vin.txid}:`, error);
      }
    });

    await Promise.all(vinPromises);

    rawTransaction.vout.forEach((vout) => {
      const address =
        vout.scriptPubKey?.address ||
        vout.scriptPubKey?.addresses ||
        'Unknown Address';
      const value = vout.value || 0;
      console.log(vout.scriptPubKey);

      voutDetails.push({ address, value });

      sumVout += value;
    });

    const timeEnteredMempool = transaction.time
      ? new Date(transaction.time * 1000)
      : null;

    const currency = process.env.RPC_PORT === process.env.LTC ? 'LTC' : 'BTC';

    const transactionDetails = {
      transactionId: id,
      height: transaction?.height,
      fee: transaction?.fees?.base,
      time: timeEnteredMempool,
      vsize: rawTransaction.vsize,
      version: rawTransaction.version,
      locktime: rawTransaction.locktime,
      hex: rawTransaction.hex,
      vin: vinDetails,
      vout: voutDetails,
      hash: rawTransaction.hash,
      size: rawTransaction.size,
      weight: rawTransaction.weight,
      sumVin,
      sumVout,
      currency,
    };

    console.log('Transaction Details:', transactionDetails);

    res.json(transactionDetails);
  } catch (error) {
    console.error('Error processing transaction:', error);
    res.status(500).json({ error: 'Failed to process transaction' });
  }
};
module.exports = { fetchPopulatedMempoolData, fetchTransactionInfo };
