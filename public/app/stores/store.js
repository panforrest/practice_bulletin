import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import communityReducer from '../reducers/communityReducer'
import profileReducer from '../reducers/profileReducer'

var reducers = combineReducers({
    communityReducer: communityReducer,
    profileReducer: profileReducer
})

var store = createStore(
	reducers,
	applyMiddleware(thunk)
)

export default store