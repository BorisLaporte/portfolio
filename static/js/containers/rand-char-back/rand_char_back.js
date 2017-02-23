import React, { Component } from 'react';
import Line from './line'

export default class RandCharBack extends Component {
	constructor(props){
		super(props)
		this.state = {
			specs: null
		}
	}

	getSpecs(){
		const back = this.refs.background
		const ww = back.offsetWidth
		const wh = back.offsetHeight
		const cw = back.firstChild.offsetWidth
		const ch = back.firstChild.offsetHeight
		let result = []
		result["lines"] = Math.floor(( wh / ch ) )
		result["columns"] = Math.floor(( ww / cw ) -1 )
		return result
	}

	componentDidMount() {
		const specs = this.getSpecs()
		this.setState({specs: specs}); 

	}

	render() {
		const testing = ( this.state.specs ? " " : "testing" )
		const lines = (specs) => {
			let result = []
			if ( specs != null ){
				for (let i = 0; i < specs["lines"]; i++){
					result.push(<Line key={i} quantity={specs["columns"]} />)
				}
				return result
			} else {
				return <span>a</span>
			}
		}
		return (
			<div className={"rand-char-back "+testing} ref="background">
				{ lines(this.state.specs) }
			</div>
		);
	}
}