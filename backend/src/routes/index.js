const express = require('express');
const transactionController = require('../controllers/transaction.controller');
const userController = require('../controllers/user.controller');

const router = express.Router();

router.post('/deposit', transactionController.deposit)
router.post('/withdraw', transactionController.withdraw)
router.post('/get_userdata', userController.getUserData)
router.post('/register', userController.register)
router.post('/check_connection', userController.checkConnection)

module.exports = router;
