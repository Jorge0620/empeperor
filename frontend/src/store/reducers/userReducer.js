import {
    SET_TOKEN_BALANCE,
    
    INIT_USER_DATA,
    SET_USERDATA,
    SET_USED_REFCODE,
    SET_WALLET_ADDRESS
} from '../../utils/types';

const initialState = {
    tokenBalance: 0,
    tokenUsdBalance: 0,
    withdrawableBalance: 0,
    accumulatedReferral: 0,
    refCode: "",
    usedRefCode: "",
    rank: 0,
    refRewards: [],
    walletAddress: ""
}
const userReducer = (state = initialState, action) => {
    switch(action.type){
        case SET_TOKEN_BALANCE:
        return {
            ...state,
            tokenBalance: action.payload
        }
        
        case SET_USERDATA:
        return {
            ...state,
            withdrawableBalance: action.payload.user.withdrawable,
            accumulatedReferral: action.payload.user.accumulatedReferral,
            rank: action.payload.user.rank,
            refCode: action.payload.user.refCode,
            refRewards: action.payload.refRewardHistory
        }
        case INIT_USER_DATA:
        return {
            ...state,
            withdrawableBalance: 0,
            accumulatedReferral: 0,
            rank: 0,
            refCode: '',
            refRewards: []
        }
        case SET_USED_REFCODE:
        return {
            ...state,
            usedRefCode: action.payload
        }
        case SET_WALLET_ADDRESS:
        return {
            ...state,
            walletAddress: action.payload
        }
        
        default: return state
    }
}

export default userReducer;