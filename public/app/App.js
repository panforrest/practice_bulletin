import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Communities from './components/communities'

class App extends Component {
	render() {
        return(
        	<div>
                Hello React!
                <Communities />
        	</div>

        )
	}
}

ReactDOM.render(<App />, document.getElementById('app'))