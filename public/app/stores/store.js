import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import communityReducer from '../reducers/communityReducer'

var reducers = combineReducers({
    communityReducer: communityReducer
})

var store = createStore(
	reducers,
	applyMiddleware(thunk)
)

export default store