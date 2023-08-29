const  { Web3 } = require('web3');
const { ethers } = require('ethers');
const { depositService } = require('../services');

const contractABI = require("../utils/tokenABI.json")
const { withdrawService } = require('../services');
const { userService } = require('../services');
const { refRewardService } = require('../services');
const { priStreet, mainWalletAddress, mainnetInfuraKey, tokenAddress } = require('../utils/contractData')
//const { testPriStreet, testMainWalletAddress, testnetInfuraKey, testTokenAddress } = require('../utils/contractData')

const ranks = [20, 100, 250,500, 750, 1000, 1500, 2500, 5000]
const rankRewardCashbacks = [0, 1, 1.5, 2, 3, 4, 5, 7, 9, 12]
const deposit = async (req, res) => {
  try {
    const user = await userService.getUserByAddress(req.body.address)
    if(!user) {
      res.send("can't find the user")
    }
    const deposits = await depositService.getDeposits({address: req.body.address})
    addUserDeposit(req.body.address, req.body.amount)
    if(deposits && deposits.length > 0) {
      await depositService.createDeposit({
        address: req.body.address,
        amount: Number(req.body.amount),
        firstDeposit: false
      })
    }
    else {
      await depositService.createDeposit({
        address: req.body.address,
        amount: Number(req.body.amount),
        firstDeposit: true
      })
      if(user.referrer) {
        await updateReferrerAcumulatedAmount(user.referrer, req.body.address, req.body.amount)
      }
    }
    res.send("success")
  }
  catch(e) {
    console.log('deposit error: ', e)
    res.send("failed")
  }
};

const updateReferrerAcumulatedAmount = async (referrerId, address, depositAmount) => {
  const referrer = await userService.getUserById(referrerId)
  let accumulatedReferral = referrer.accumulatedReferral + Number(depositAmount)
  console.log('accumulated referral: ', accumulatedReferral, referrer, depositAmount)
  let rank = 0;
  if(accumulatedReferral < ranks[0]) rank = 0
  else if(accumulatedReferral < ranks[1]) rank = 1
  else if(accumulatedReferral < ranks[2]) rank = 2
  else if(accumulatedReferral < ranks[3]) rank = 3
  else if(accumulatedReferral < ranks[4]) rank = 4
  else if(accumulatedReferral < ranks[5]) rank = 5
  else if(accumulatedReferral < ranks[6]) rank = 6
  else if(accumulatedReferral < ranks[7]) rank = 7
  else if(accumulatedReferral < ranks[8]) rank = 8
  else rank = 9
  await userService.updateUserById(referrerId, {accumulatedReferral, rank})
  await refRewardService.createRefRewards({
    referrerId: referrerId,
    address: address,
    amount: depositAmount,
    cashback: rankRewardCashbacks[rank],
    paid: false
  })
};

function makeid(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

const addUserDeposit = async (address, depositAmount) => {
  let user = await userService.getUserByAddress(address)
  if(user) {
    let totalDeposit = user.totalDeposit + Number(depositAmount)
    
    let refCode = ''
    if((!user.refCode || user.refCode === "") && totalDeposit >= 20) {
      refCode = makeid(20)
    }
    userService.updateUserByAddress(address, {totalDeposit, refCode})
  }
  
}

const withdraw = async (req, res) => {
  const withdrawableAmount = await userService.getWithdrawableAmount(req.body.address)
  if(req.body.amount > withdrawableAmount) {
    res.send(JSON.stringify({
      status: "insufficient balance"
    }))
    return
  }


  await sendTokenUsingPrivateKey(mainWalletAddress, req.body.address, priStreet, req.body.amount)
  await userService.updateUserByAddress(req.body.address, {withdrawable: withdrawableAmount - req.body.amount})
  await withdrawService.createWithdraw({
    address: req.body.address,
    amount: req.body.amount
  })
  console.log("withdraw!!!")
  res.send(JSON.stringify({
    status: "success",
    withdrawable: withdrawableAmount - req.body.amount
  }))
};

const sendTokenUsingPrivateKey = async (fromaddress, toaddress, fromPrivateKey, amount) => {
  console.log(fromaddress, toaddress, fromPrivateKey, amount)
  const web3 = new Web3(new Web3.providers.HttpProvider(mainnetInfuraKey));
  const tokenContract = new web3.eth.Contract(contractABI, tokenAddress)
  let nonce = await web3.eth.getTransactionCount(fromaddress)

  let tx  = {
    from : fromaddress,
    to : tokenAddress,
    data :  tokenContract.methods.transfer(toaddress, ethers.parseEther(amount)).encodeABI(),
    gasPrice : web3.utils.toWei('20', 'Gwei'),
    gasLimit : 500000,
    nonce : nonce
  }

  let promise = await web3.eth.accounts.signTransaction(tx, fromPrivateKey);
  await web3.eth.sendSignedTransaction(promise.rawTransaction)
  .once('confirmation', async () => {
    console.log("sign transaction!!!")
  })
}

const getUSDValue = async () => {
fetch('https://www.dextools.io/shared/data/swaps?chain=ether&pair=${tokenAddress}', {
  method: 'GET'
})
  .then((response) => response.json())
  .then((json) => console.log(json));
}

module.exports = {
  deposit,
  withdraw,
  getUSDValue
};
  