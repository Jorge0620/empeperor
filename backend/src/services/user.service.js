const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { User } = require('../models');
const { update } = require('../models/deposit.model');

const getWithdrawableAmount = async (address) => {
  const user = await User.findOne({ address });
  console.log(user)
  if(user !== null) {
    return user.withdrawable
  }
  return 0
};

const createUser = async (userBody) => {
  return User.create(userBody);
};

const updateUserByAddress = async (address, updateBody) => {
  console.log("user update values: ", address, updateBody)
  const user = await getUserByAddress(address);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  Object.assign(user, updateBody);
  await user.save();
  return user;
};

const updateUserById = async (userId, updateBody) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  Object.assign(user, updateBody);
  await user.save();
  return user;
};

const getUserByAddress = async (address) => {
  return await User.findOne({ address });
};

const getUserById = async (id) => {
  return await User.findById(id);
};

const getUser = async (filter) => {
  return User.findOne(filter);
};

module.exports = {
  createUser,
  getWithdrawableAmount,
  updateUserByAddress,
  getUserByAddress,
  getUser,
  updateUserById,
  getUserById
};
