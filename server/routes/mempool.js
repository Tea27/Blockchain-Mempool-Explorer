var express = require('express');

const {
  fetchPopulatedMempoolData,
  fetchTransactionInfo,
} = require('../controllers/mempoolController');
const router = express.Router();

router.get('/fetchPopulatedMempoolData', fetchPopulatedMempoolData);
router.get('/fetchTransactionInfo/:id', fetchTransactionInfo);

module.exports = router;
