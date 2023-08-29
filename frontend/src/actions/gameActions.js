import { toast } from 'react-toastify';
import axios from 'axios'
import {
        SHOW_DEPOSIT_MODAL,
        HIDE_DEPOSIT_MODAL,
        SHOW_WITHDRAW_MODAL,
        HIDE_WITHDRAW_MODAL,
        CHANGE_CURRENT_PAGE,
        SET_LOADING_DEPOSIT,
        SET_LOADING_WITHDRAW,
        SET_TOKEN_USD_BALANCE
    } from '../utils/types'
import { tokenAddress } from '../utils/contractData';
import { usdSwapPrice } from '../utils/contractData';

export const showDepositModal = () => dispatch => {
    //console.log("showTxSignModal")
    dispatch( {
        type: SHOW_DEPOSIT_MODAL
    })
}
export const hideDepositModal = () => dispatch => {
    //console.log("hideTxSignModal")
    dispatch( {
        type: HIDE_DEPOSIT_MODAL
    })
}

export const showWithdrawModal = () => dispatch => {
    //console.log("showTxSignModal")
    dispatch( {
        type: SHOW_WITHDRAW_MODAL
    })
}
export const hideWithdrawModal = () => dispatch => {
    //console.log("hideTxSignModal")
    dispatch( {
        type: HIDE_WITHDRAW_MODAL
    })
}

export const changeCurrentPage = (targetPage) => dispatch => {
    
    dispatch( {
        type: CHANGE_CURRENT_PAGE,
        payload: targetPage
    })
}

export const setLoadingDeposit = (status) => dispatch => {
    
    dispatch( {
        type: SET_LOADING_DEPOSIT,
        payload: status
    })
}

export const setLoadingWithdraw = (status) => dispatch => {
    console.log('setLoadingWithdraw', status)
    dispatch( {
        type: SET_LOADING_WITHDRAW,
        payload: status
    })
}

export const popup = (message) => {
    toast(message);
}

export const getUsdBalance = (amount) => async dispatch => {
    try{
        // const res = await fetch(`https://www.dextools.io/shared/data/swaps?chain=ether&pair=${tokenAddress}`);
        // console.log("getUsdBalance: ", res.data)
        dispatch( {
            type: SET_TOKEN_USD_BALANCE,
            payload: amount * usdSwapPrice
        })
    }
    catch(e){
        console.log(e)
    }
}
