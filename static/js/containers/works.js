import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import gsap from 'gsap'
import Hammer from 'hammerjs'

import OneWork from '../components/works/one_work'

class Works extends Component {
	constructor(props){
		super(props)
		this.state = {
			index: 0,
			tl: null
		}
	}

	shouldComponentUpdate(nextProps, nextState){
		if ( nextProps.data != this.props.data || nextState.index != this.state.index ){
			return true
		} else {
			return false
		}
	}

	componentDidMount(){
		this.state.tl = new TimelineLite()
		this.initHammer()
	}

	initHammer(){
		const self = this;

		const mc = new Hammer.Manager(this.refs.list_work, {
			recognizers: [
				[Hammer.Pan,{ direction: Hammer.DIRECTION_HORIZONTAL }]
			]})

		mc.on('panend pancancel panmove', function(e){
			self.state.tl.clear()
			switch(e.type){
				case "panend":
				case "pancancel":
					self.hammerEnd(e)
					break
				case "panmove":
					self.hammerMove(e)
					break
				default:
					break
			}
		})
	}

	hammerMove(e){
		this.state.tl.set(this.refs.list_work,
		{
			x: e.deltaX
		})

	}

	hammerEnd(e){
		if ( e.distance > ( 0.7 * ( $(window).width() / 2 )) ){
			this.goTo(e)
		} else {
			this.goBack()
		}
	}

	calcDest(){
		return ( -1 * this.state.index ) * 100
	}

	goBack(){
		const dest = this.calcDest()
		this.state.tl.to(this.refs.list_work, 0.5,
		{
			x: dest+"%",
			ease: Power2.easeOut
		})
	}

	goTo(e){
		const drct = this.convertDirection(e)
		if ( drct !== null ){
			const new_index = this.state.index + drct
			if ( new_index >= 0 && new_index < this.props.data.length){
				this.setState({index: this.state.index + drct})
				const dest = this.calcDest()
				this.state.tl.to(this.refs.list_work, 0.5,
				{
					x: dest+"%",
					ease: Power2.easeOut
				})
			} else {
				this.goBack()
			}
		} else {
			this.goBack()
		}
	}

	convertDirection(e){
		switch(e.offsetDirection){
			case 2:
				// PANED IT TO LEFT
				return 1
				break
			case 4:
				// PANED IT TO RIGHT
				return -1
				break
			default:
				return null
				break
		}
	}

  render(){
  	const { data } = this.props
    return (
     	<div className="works">
     		<div className="list" ref="list_work">
       		{ data.map(function(object, i){
		        return <OneWork key={i} data={object} />
		    })}
     		</div>
     	</div>
    );
  }
}

Works.PropTypes = {
	data: PropTypes.array.isRequired,
}


function mapStateToProps(state) {
  const { projectsReducer } = state
  const {
    isFetching,
    items: data
  } = projectsReducer || {
    isFetching: true,
    items: []
  }

  return {
    data,
    isFetching
  }
}

export default connect(mapStateToProps)(Works)