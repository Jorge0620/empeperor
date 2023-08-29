const crypto = require("crypto");
const { userService } = require('../services');
const { depositService } = require('../services');
const { refRewardService } = require('../services');

const rankRewardCashbacks = [0, 1, 1.5, 2, 3, 4, 5, 7, 9, 12]
const referedRewardPercent = 10
const normalRewardPercent = 5

const getUserData = async (req, res) => {
  
  const user = await userService.getUserByAddress(req.body.address)
  if(user !== null) {
    await updateWithdrawable(req.body.address)
    
    const refRewards = await refRewardService.getRefRewards({referrerId: user._id})
    console.log("refRewards: ", refRewards)
    res.send(JSON.stringify({
      user: user,
      refRewardHistory: refRewards
    }))
  }
  else {
    res.send("user doesn't exist")
  }
};

const register = async (req, res) => {
  try {
    let referrerId = null
    if(req.body.refCode !== '') {
      const referrerUser = await userService.getUser({refCode: req.body.refCode})
      if(referrerUser) {
        console.log("referrerUser: ", referrerUser)
        referrerId = referrerUser._id
      }
    }
    const user = await userService.createUser({
      address: req.body.address,
      referrer: referrerId
    })
    res.send("success")
  }
  catch(e) {
    console.log("register with ref code: ", e)
    res.send("failed")
  }
}

const checkConnection = (req, res) => {
  return res.send('connected')
}

const updateWithdrawable = async (address) => {
  const deposits = await depositService.getDeposits({
    address: address,
    withdrawable: false
  })
  const user = await userService.getUserByAddress(address)
  let curDate = new Date()
  let additionalAmount = 0
  Promise.all(deposits.map(async _deposit => {
    let createdDate = new Date(_deposit["createdAt"])
    let difSecs = (curDate.getTime() - createdDate.getTime())/(1000);
    let diffDays = difSecs/24;
    if(difSecs > 10) {
      if(_deposit['firstDeposit']) {
        if(user.referrer) {
          additionalAmount += _deposit["amount"] * (100 + referedRewardPercent) / 100
        }
        else {
          additionalAmount += _deposit["amount"] * (100 + normalRewardPercent) / 100
        }
      }
      else {
        additionalAmount += _deposit["amount"]
      }
      
      await depositService.updateDepositById(_deposit["_id"], {withdrawable: true})
    }
  }))

  const referrals = await refRewardService.getRefRewards({
    referrerId: user.referrer,
    paid: false
  })
  Promise.all(referrals.map(async _ref => {
    let createdDate = new Date(_ref["createdAt"])
    let difSecs = (curDate.getTime() - createdDate.getTime())/(1000);
    let diffDays = difSecs/24;
    if(difSecs > 10) {
      additionalAmount += _ref["amount"] * _ref['cashback'] / 100
      await refRewardService.updateRefById(_ref["_id"], {paid: true})
    }
  }))
  if(additionalAmount > 0) {
    await userService.updateUserByAddress(address, {withdrawable: user.withdrawable + additionalAmount})
  }
}

module.exports = {
  getUserData,
  register,
  checkConnection
};
  