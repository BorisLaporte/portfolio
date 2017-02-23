import React, { Component, PropTypes } from 'react';

export default class Line extends Component {
	constructor(props){
		super(props)
		this.state = {
			char: "azertyuiopqsdfghjklmwxcvbnAZERTYUIOPQSDFGHJKLMWXCVBN1234567890<>?;/:!§ù%*µ$£ø^+=})]@àç\_è|-[({#é~&",
			pickRate: 0.6,
			interval: 500,
			content: false
		}
	}

	componentWillMount() {
		this.genALL()
	}

	componentDidMount() {
		this.launchAnim()
	}

	getRandomChar(){
		const rand = Math.floor(Math.random() * this.state.char.length)
		return this.state.char[rand]
	}

	getOneChar(){
		if ( Math.random() <= this.state.pickRate ){
			return this.getRandomChar()
		} else {
			return " "
		}
	}

	genALL(){
		const nbChar = this.props.quantity
		let chars = []
		for (let i = 0; i < nbChar; i++){
			chars.push(this.getOneChar())
		}
		this.setState({ content: chars})
	}

	launchAnim(){
		const self = this
		const interval = this.state.interval * ( Math.random() + 0.5 )
		const t = setTimeout(function(){
			self.changeChar()
			clearTimeout(t)
			self.launchAnim()
		}, interval)
	}

	changeChar(){
		let content = this.state.content
		content[Math.floor(Math.random() * this.state.content.length)] = this.getOneChar()
		this.setState({content: content});
	}


	render() {
		const content = ( this.state.content ? this.state.content : [""] )
		return (
			<div className="line">
				{ content.map((char, i) => (
					<span key={i}>{char}</span>
				)) }
			</div>
		);
	}
}

Line.PropTypes =  {
	quantity: PropTypes.number.isRequired
}