const httpStatus = require('http-status');
const { Deposit } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createDeposit = async (depositBody) => {
  return Deposit.create(depositBody);
};

const getDeposits = async (filter) => {
  const deposits = await Deposit.find(filter);
  return deposits;
};

const getDepositByAddress = async (address) => {
  return Deposit.findOne({ address });
};

const getDepositById = async (id) => {
  return Deposit.findById(id);
};

const updateDepositById = async (id, updateBody) => {
  const deposit = await getDepositById(id);
  if (!deposit) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Deposit not found');
  }
  Object.assign(deposit, updateBody);
  await deposit.save();
  return deposit;
};

module.exports = {
  createDeposit,
  getDeposits,
  updateDepositById
};
