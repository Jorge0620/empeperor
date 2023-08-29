const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { Referralreward } = require('../models');

const createRefRewards = async (refBody) => {
  return await Referralreward.create(refBody);
};

const getRefRewards = async (filter) => {
  return await Referralreward.find(filter);
};

const getRefById = async (id) => {
  return Referralreward.findById(id);
}; 

const updateRefById = async (id, updateBody) => {
  const ref = await getRefById(id);
  if (!ref) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Deposit not found');
  }
  Object.assign(ref, updateBody);
  await ref.save();
  return ref;
};

module.exports = {
  createRefRewards,
  getRefRewards,
  updateRefById
};
