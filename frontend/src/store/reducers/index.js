import { combineReducers } from 'redux'
import gameReducer from './gameReducer'
import userReducer from './userReducer'

export default combineReducers({
  gameData: gameReducer,
  userData: userReducer
})