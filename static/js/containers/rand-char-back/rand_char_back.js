import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'

class RandCharBack extends Component {
	constructor(props){
		super(props)
		this.state = {
			specs: {lines: 0, columns: 0},
			charWidth: 0,
			charHeight: 0,
			char: "azertyuiopqsdfghjklmwxcvbnAZERTYUIOPQSDFGHJKLMWXCVBN1234567890<>?;/:!§ù%*µ$£ø^+=})]@àç\_è|-[({#é~&",
			pickRate: 0.4,
			interval: 10,
			content: null,
			loop: null,
			ctx: null
		}
	}

	componentDidMount() {
		this.genALL()
		this.launchAnim()
	}

	componentDidUpdate(prevProps, prevState) {
		const {loop} = this.state
		clearTimeout(loop)

		this.genALL()
		this.launchAnim()
	}

	componentWillUnmount() {
		const {loop} = this.state
		clearTimeout(loop)
	}

	clearAllTimeouts(){
		const {loop} = this.state
		for ( let i = 0; i < loop.length; i++ ){
			clearTimeout(loop[i])
		}
	}

	getSpecs(){
		const back = this.refs.background
		const { width, height } = this.props
		if ( (this.state.charWidth <= 0) && (this.state.charHeight <= 0) ){
			this.state.charWidth = back.firstChild.offsetWidth
			this.state.charHeight = back.firstChild.offsetHeight
		}
		let result = {}
		result.lines = Math.ceil(( height / this.state.charHeight ) ) + 2
		result.columns = Math.ceil(( width / this.state.charWidth ) ) + 2
		return result
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

	setCanvasDetails(){
		const ctx = this.state.ctx = canvas.getContext('2d')
		ctx.font = "22px UbuntuMono-Bold"
		ctx.fillStyle = "#0081D5";
		return ctx
	}

	fillLineCanvas(ctx, text, line){
		const {charWidth, charHeight} = this.state
		ctx.fillText(text, -charWidth, ( charHeight * line ) - charHeight )
	}

	fillAllCanvas(ctx, text){
		const {specs} = this.state
		for (let i = 0; i < specs.lines; i++){
			this.fillLineCanvas(ctx, text[i], i )
		}
	}

	genALL(){
		const specs = this.state.specs = this.getSpecs()
		const ctx =	this.setCanvasDetails()
		let chars = []
		for (let i = 0; i < specs.lines; i++){
			chars[i] = ""
			for ( let z = 0; z < specs.columns; z++ ){
				chars[i] += this.getOneChar()
			}
			this.fillLineCanvas(ctx, chars[i], i )
		}
		this.state.content = chars
	}

	replaceChar(str, index, char){
    return str.substr(0, index) + char + str.substr(index+char.length)
	}

	changeChars(line){
		const {specs, content} = this.state
		const ctx = this.setCanvasDetails()
		const times = Math.ceil(line * 0.05)
		let newContent = content.slice()
		for ( let i = 0; i < times; i++ ){
			const index = Math.floor(Math.random() * content[line].length)
			newContent[line] = this.replaceChar(newContent[line], index, this.getOneChar())
		}
		this.fillAllCanvas(ctx, newContent)
		this.state.content = newContent
	}

	launchAnim(){
		const self = this
		const {specs, ctx} = this.state
		const {width, height} = this.props
		const times = Math.ceil(specs.columns * 0.05)
		const interval = this.state.interval
		this.state.loop = setTimeout(function(){
			ctx.clearRect(0, 0, width, height)
			for (let i = 0; i < times; i++){
				const lineRand = Math.floor( Math.random() * specs.lines )
				self.changeChars(lineRand)
			}
			self.launchAnim()
		}, interval)
	}

	render() {
		const testing = ( this.state.content ? " " : <span>a</span> )
		const {width, height} = this.props
		const widthUp = width * 1.1
		const heightUp = height * 1.1
		return (
			<div className={"rand-char-back"} ref="background">
				{ testing }
				<canvas id="canvas" ref="canvas" width={widthUp} height={heightUp} ></canvas>
			</div>
		);
	}
}

RandCharBack.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
}

function mapStateToProps(state) {
  const { responsiveReducer } = state
  const {
    width,
    height
  } = responsiveReducer || {
    width: 0,
    height: 0
  }

  return {
    width,
    height
  }
}

export default connect(mapStateToProps)(RandCharBack)