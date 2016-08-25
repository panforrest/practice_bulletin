import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Communities from './components/communities'
import Profiles from './components/profiles'
import { Provider } from 'react-redux'
import store from './stores/store'

class App extends Component {
	render() {
        return(
        	<div>
                Hello React!
                <Communities />
                <Profiles />
        	</div>

        )
	}
}

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('app'))