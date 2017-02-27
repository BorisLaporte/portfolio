import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import Line from './line'

class RandCharBack extends Component {
	constructor(props){
		super(props)
		this.state = {
			specs: {lines: 0, columns: 0},
			charWidth: 0,
			charHeight: 0
		}
	}

	shouldComponentUpdate(nextProps, nextState){
		if ( (nextProps.height != this.props.height) ||
		 (nextProps.width != this.props.width) ||
		 (nextState.specs.columns != this.state.specs.columns) ||
		 (nextState.specs.lines != this.state.specs.lines) ){
			return true
		}
		else{
			return false
		}
	}

	getSpecs(){
		let { charWidth, charHeight } = this.state
		const back = this.refs.background
		const ww = back.offsetWidth
		const wh = back.offsetHeight
		if ( (charWidth <= 0) && (charHeight <= 0) ){
			this.state.charWidth = charWidth = back.firstChild.offsetWidth
			this.state.charHeight = charHeight = back.firstChild.offsetHeight
		}
		let result = {}
		result.lines = Math.floor(( wh / charHeight ) )
		result.columns = Math.floor(( ww / charWidth ) )
		return result
	}

	componentDidMount() {
		const specs = this.getSpecs()
		this.setState({specs: specs}); 
	}

	componentDidUpdate(prevProps, prevState) {
		const specs = this.getSpecs()
		this.setState({specs: specs}); 
	}

	render() {
		const testing = ( this.state.specs.lines ? " " : "testing" )
		const lines = (specs) => {
			let result = []
			if ( specs.lines > 0 ){
				for (let i = 0; i < specs.lines; i++){
					result.push(<Line key={i} index={i} quantity={specs.columns} />)
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