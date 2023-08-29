import {
    SHOW_DEPOSIT_MODAL,
    HIDE_DEPOSIT_MODAL,
    SHOW_WITHDRAW_MODAL,
    HIDE_WITHDRAW_MODAL,
    CHANGE_CURRENT_PAGE,
    SET_LOADING_DEPOSIT,
    SET_LOADING_WITHDRAW,
    SET_TOKEN_USD_BALANCE
} from '../../utils/types';

const initialState = {
    currentPage: "home",
    displayDepositModal: false,
    displayWithdrawModal: false,
    loadingDeposit: false,
    loadingWithdraw: false,
    tokenUsdBalance: 0
}
const gameReducer = (state = initialState, action) => {
    switch(action.type){
        case SHOW_DEPOSIT_MODAL:
        return {
            ...state,
            displayDepositModal: true
        }
        case HIDE_DEPOSIT_MODAL:
        return {
            ...state,
            displayDepositModal: false
        }

        case SHOW_WITHDRAW_MODAL:
        return {
            ...state,
            displayWithdrawModal: true
        }
        case HIDE_WITHDRAW_MODAL:
        return {
            ...state,
            displayWithdrawModal: false
        }

        case CHANGE_CURRENT_PAGE:
        return {
            ...state,
            currentPage: action.payload
        }

        case SET_LOADING_DEPOSIT:
        return {
            ...state,
            loadingDeposit: action.payload
        }
        case SET_LOADING_WITHDRAW:
        return {
            ...state,
            loadingWithdraw: action.payload
        }
        case SET_TOKEN_USD_BALANCE:
        return {
            ...state,
            tokenUsdBalance: action.payload
        }
        default: return state
    }
}

export default gameReducer;