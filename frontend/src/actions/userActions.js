import axios from 'axios'

import {
    SET_TOKEN_BALANCE,
    SET_TOKEN_USD_BALANCE,
    SET_WITHDRAWABLE_BALANCE,
    SET_USERDATA,
    SET_USED_REFCODE,
    INIT_USER_DATA,
    SET_WALLET_ADDRESS
} from '../utils/types'
import { json } from 'react-router-dom'


export const setWalletAddress = (address) => dispatch => {
    //console.log("showTxSignModal")
    dispatch({
        type: SET_WALLET_ADDRESS,
        payload: address
    })
}
export const setTokenBalance = (amount) => dispatch => {
    //console.log("showTxSignModal")
    dispatch({
        type: SET_TOKEN_BALANCE,
        payload: amount
    })
}
export const setTokenUsdBalance = (amount) => dispatch => {
    //console.log("showTxSignModal")
    dispatch({
        type: SET_TOKEN_USD_BALANCE,
        payload: amount
    })
}

export const setUsedRefCode = (code) => dispatch => {
    dispatch({
        type: SET_USED_REFCODE,
        payload: code
    })
}
export const initUserData = () => dispatch => {
    dispatch({
        type: INIT_USER_DATA
    })
}

export const register = async (address, refCode) => {
    try{
        const res = await axios.post(`register`, {
            address: address,
            refCode: refCode
        });
        console.log("register: ", res.data)
        if(res.data === "failed") {
            
        }
    }
    catch(e){
        console.log("registerWithRefCode: ", e)
        return false        
    }
}

export const checkServerConnection = async () => {
    try{
        console.log("connected: ")
        const res = await axios.post(`check_connection`);
        console.log("connected: ", res.data)
        if(res.data === "connected") {
            return true
        }
        return false
    }
    catch(e){
        return false        
    }
}

export const getUserData = (address, refCode = '', withRegsiter = false) => async dispatch => {
    console.log("get_withdrawable result: ")
    try{
        const res = await axios.post(`get_userdata`, {
            address: address
        });
        console.log("get_withdrawable result: ", res.data)
        if(res.data === "user doesn't exist") {
            dispatch({
                type: SET_USERDATA,
                payload: {
                    user: {
                        withdrawable: 0,
                        accumulatedReferral: 0,
                        rank: 0,
                        refCode: ''
                    },
                    refRewardHistory: []
                }
            })
            if(withRegsiter) {
                await register(address, refCode)
            }
        }
        else {
            dispatch({
                type: SET_USERDATA,
                payload: res.data
            })
        }
    }
    catch(e){
        console.log("getUserData: ", e)
        return false        
    }
}

export const setUserData = (data) => dispatch => {
    dispatch({
        type: SET_USERDATA,
        payload: data
    })
}

export const setWithdrawableBalance = (amount) => dispatch => {
    dispatch({
        type: SET_WITHDRAWABLE_BALANCE,
        payload: amount
    })  
}
