import React, { Component } from 'react'
import Communities from '../components/Communities'
import Register from '../components/layout/Register'
import Account from '../components/layout/Account'
import Nav from './Nav'

class Main extends Component {

	componentDidMount(){
		console.log('MAIN: '+this.props.page)
	}

	render(){
		var content = null
		var page = this.props.page
		if (page == 'home')
		    content = <Communities />

		if (page == 'register')
		    content = <Register />

		if (page == 'account')
			content = <Account />

		return (
			<div>
			    <Nav />
                { content }
			</div>
		)
	}
}

export default Main

















