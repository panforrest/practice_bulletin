import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import communityReducer from '../reducers/communityReducer'
import profileReducer from '../reducers/profileReducer'
import accountReducer from '../reducers/accountReducer'
import postReducer from '../reducers/postReducer'

var reducers = combineReducers({
    communityReducer: communityReducer,
    profileReducer: profileReducer,
    accountReducer: accountReducer,
    postReducer: postReducer
})

var store = createStore(
	reducers,
	applyMiddleware(thunk)
)

export default store