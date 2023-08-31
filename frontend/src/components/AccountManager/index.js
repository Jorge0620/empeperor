import { useState, useEffect, useRef } from "react";
import Web3 from 'web3';
import {connect} from 'react-redux'
import './index.scss';

import { metaMaskHooks } from '../../connectors/Metamask'
import { setTokenBalance, setTokenUsdBalance, getUserData, setUserData, setUsedRefCode, registerWithRefCode, initUserData } from '../../actions/userActions'
import { getUsdBalance } from '../../actions/gameActions'

import { getBalance, getUSDBalance } from '../../utils/interact.js';

const AccountManager = (props) => {
    const { setTokenBalance, tokenBalance, walletAddress, getUserData, setUsedRefCode, getUsdBalance, usedRefCode, initUserData } = props;
    const { useChainId, useAccounts, useIsActivating, useIsActive, useProvider, useENSNames } = metaMaskHooks
    const accounts = useAccounts()
    useEffect(() => {
        const queryParameters = new URLSearchParams(window.location.search)
        const refCode = queryParameters.get("ref")
        setUsedRefCode(refCode)
        console.log('refcode:', refCode)
        const loadWeb3 = async () => {
            if(window.ethereum) {
                window.web3 = new Web3(window.ethereum)
                //await window.ethereum.enable()
            } else if(window.web3) {
                window.web3 = new Web3(window.web3.currentProvider)
            } else {
                window.alert('Non-Ethereum browser detected. Your should consider trying MetaMask!')
            }
        }
        loadWeb3()
    })
    useEffect(() => {
        const initAccount = async () => {
            
            let _balance = 0;
            if(walletAddress && walletAddress !== '') {
                
                const user = await getUserData(walletAddress, usedRefCode, true)
                _balance = await getBalance(walletAddress)
            }
            else {
                initUserData()
            }
            setTokenBalance(_balance)
        }
        initAccount()
    }, [walletAddress])

    useEffect(() => {
        getUsdBalance(tokenBalance)
    }, [tokenBalance])
    return (
        <>
            <div className="account-manager">
              
            </div>
        </>    
    );
}

const mapStateToProps  = (state) => (
  {
    usedRefCode: state.userData.usedRefCode,
    tokenBalance: state.userData.tokenBalance,
    walletAddress: state.userData.walletAddress
  }
)

export default connect(mapStateToProps, { setTokenBalance, getUsdBalance, setTokenUsdBalance, getUserData, setUsedRefCode, initUserData })(AccountManager)