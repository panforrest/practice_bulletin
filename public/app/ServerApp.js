import React, { Component } from 'react'
import store from './stores/store'
import { Provider } from 'react-redux'
import Main from './components/Main' 


class App extends Component{

	render(){
		return(
                <Provider store={store}>
			        <Main />
			    </Provider>
		)
	}
} 

export default App