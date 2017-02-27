import React, { Component, PropTypes } from 'react';

export default class Line extends Component {
	constructor(props){
		super(props)
		this.state = {
			char: "azertyuiopqsdfghjklmwxcvbnAZERTYUIOPQSDFGHJKLMWXCVBN1234567890<>?;/:!§ù%*µ$£ø^+=})]@àç\_è|-[({#é~&",
			pickRate: 0.4,
			interval: 1000,
			content: false,
			quantity: 0,
			loop: null
		}
	}

	shouldComponentUpdate(nextProps, nextState) {
		if ( (nextProps.quantity != this.state.quantity) || (nextState.content != this.state.content) ){
			return true
		} else {
			return false
		}
	}

	componentWillMount() {
		this.genALL()
	}

	componentDidMount() {
		this.state.quantity = this.props.quantity
		this.entranceAnim()
		this.launchAnim()
	}

	componentWillUnmount() {
		clearInterval(this.state.loop)
	}


	entranceAnim(){
		const tl = new TimelineLite()
    const { index } = this.props
    const { line } = this.refs
    tl.from(line, 0.5, {
      opacity: 0,
      ease: Power2.easeOut,
      delay: (0.05 * index + 0.05)
    })
	}

	launchAnim(){
		const self = this
		const interval = this.state.interval * ( Math.random() + 0.5 )
		this.state.loop = setTimeout(function(){
			self.changeChar()
			self.launchAnim()
		}, interval)
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

	changeChar(){
		const {content, quantity} = this.state 
		let newContent = content.slice()
		const times = Math.ceil(quantity * 0.05)
		for ( let i = 0; i < times; i++ ){
			newContent[Math.floor(Math.random() * this.state.content.length)] = this.getOneChar()
		}
		this.setState({content: newContent});
	}


	render() {
		const content = ( this.state.content ? this.state.content : [""] )
		return (
			<div className="line" ref="line">
				{ content.map((char, i) => (
					<span key={i} ref="char" >{char}</span>
				)) }
			</div>
		);
	}
}

Line.PropTypes =  {
	quantity: PropTypes.number.isRequired
}