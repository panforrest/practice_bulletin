import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import communityReducer from '../reducers/communityReducer'
import profileReducer from '../reducers/profileReducer'
import accountReducer from '../reducers/accountReducer'

var reducers = combineReducers({
    communityReducer: communityReducer,
    profileReducer: profileReducer,
    accountReducer: accountReducer
})

var store = createStore(
	reducers,
	applyMiddleware(thunk)
)

export default store