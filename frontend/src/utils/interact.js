import BigNumber from 'big-number';
import { tokenAddress, uniswapV3RouterAddress, usdtAddress, mainnetInfuraKey, usdtGoerliAddress, depositWalletAddress } from './contractData';
//import { testTokenAddress, uniswapTestRouterAddress, usdtAddress, testnetInfuraKey, usdtGoerliAddress, testDepositWalletAddress } from './contractData';
import Web3 from 'web3';

const ethers = require("ethers");
const contractABI = require("./tokenABI.json");
const uniswapV3RouterABI = require("./uniswapV3RouterABI.json");
// const contractABI = require("./testTokenABI.json");
// const uniswapV3RouterABI = require("./uniswapTestRouterABI.json");

export const getGasFee = async () => {
  try {
    console.log("ethers: ", ethers)
    const web3 = new Web3(new Web3.providers.HttpProvider(mainnetInfuraKey));
    let price = await web3.eth.getGasPrice()
    console.log(price)
    const gasPriceEth = Web3.utils.fromWei(price, 'ether')
    const gasFee = gasPriceEth * 210000;
    return gasFee;
  }
  catch(e) {
    return 0
  }
}

export const getBalance = async (address) => {
  try {
    const web3 = new Web3(new Web3.providers.HttpProvider(mainnetInfuraKey));
    // const provider = new ethers.providers.Web3Provider(window.ethereum);
    // const signer = provider.getSigner();

    let balance;
    const contract = new web3.eth.Contract(contractABI, tokenAddress);
    console.log("ballance: ", contract)
    balance = await contract.methods.balanceOf(address).call();
    console.log("ballance: ", balance)
    return ethers.formatEther(balance);
  }
  catch(e) {
    return 0;
  }
}

export const getUSDBalance = async (amount) => {
  
  const web3 = new Web3(new Web3.providers.HttpProvider(mainnetInfuraKey));
  let usdBalance = 10;

  const contract = new web3.eth.Contract(uniswapV3RouterABI, uniswapV3RouterAddress);
  console.log("amount: ", contract)
  // let value = await contract.methods.getAmountsOut(new BigNumber((Math.pow(10, 18 ) * 0.1) + '').number, [tokenAddress, usdtGoerliAddress]).call();
  // console.log("amount: ", (Math.pow(10, 18 ) * 1))
  // usdBalance = value[1] / Math.pow(10, 9)
  return usdBalance;
}

export const deposit = async (fromAddress, amount) => {
  try {

    const web3 = new Web3(new Web3.providers.HttpProvider(mainnetInfuraKey));
      let tx;
      const clientWeb3 = window.web3;
      let confirmed = false
      const contract = new clientWeb3.eth.Contract(contractABI, tokenAddress);
      tx = await contract.methods.transfer(depositWalletAddress, ethers.parseEther(amount.toString()))
      .send({from : fromAddress})
      .once('confirmation', async () => {
        console.log("tx: ", tx)    
        confirmed = true;
      })
      
      
      return confirmed
      //const res = await window.web3.eth.getTransactionReceipt(tx);
      // console.log("res: ", res);
      // console.log("tx: ", tx);
      // let gasLimit = parseInt(tx.gasLimit._hex, 16);
      // let gasPrice = parseInt(tx.gasPrice._hex, 16);
      
      
      // setTransactionFee(gasLimit * gasPrice *  Math.pow(10, -18));
      // if (res.transactionHash) {
      //     setIsSuccess(true);
      //     setTxHash(res.transactionHash);
      //     setIsLoading(false);
      //     setShowResult(true);
      //     let newBalance = await getBalance(account, selectedCoin.tokenAddress);
      //     setBalance(newBalance);
      //     deposit(res.transactionHash);
      // }
  } catch (error) {
    console.log("error: ", error)
    return false
      // setPopUp("deposit failed")
      // console.log(error);
      // setIsLoading(false);
      // setIsSuccess(false);
  }
}
