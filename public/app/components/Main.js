import React, { Component } from 'react'
import Communities from '../components/Communities'

class Main extends Component {

	componentDidMount(){
		console.log('Main: '+this.props.page)
	}

	render(){
		return (
			<div>
                This is Main component!
                <Communities />
			</div>
		)
	}
}

export default Main