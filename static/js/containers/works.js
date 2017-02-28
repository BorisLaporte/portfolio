import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { LANDSCAPE, PORTRAIT } from '../store/responsive/actions'
import { setNewIndex } from '../store/projects/actions'
import gsap from 'gsap'
import Hammer from 'hammerjs'

import OneWork from '../components/works/one_work'

class Works extends Component {
	constructor(props){
		super(props)
		this.state = {
			tl: null
		}
	}

	shouldComponentUpdate(nextProps, nextState){
		if ( nextProps != this.props ){
			return true
		} else {
			return false
		}
	}

	componentDidMount(){
		const self = this
		this.state.tl = new TimelineLite()
		this.initHammer()
		this.bindOthers()
		if ( this.props.index > 0 ){
			this.goToDest()
		}
		this.entranceAnim()
	}

	componentDidUpdate(prevProps, prevState) {
		if ( prevProps.index != this.props.index ){
		} else if ( prevProps.orientation != this.props.orientation ) {
			this.entranceAnim()
		}
		this.goToDest()
	}

	entranceAnim(){
		const tl = new TimelineLite()
		const { list_work } = this.refs
		tl.from(list_work, 0.5, {
			opacity: 0,
			ease: Power2.easeOut,
			delay: 0.8
		})
	}

	bindOthers(){
		this.bindKeyboard()
		this.bindScroll()
	}


	bindScroll(){
		let safetyScroll = false
		const self = this
		window.addEventListener('mousewheel', function(e){
			e.stopPropagation()
			e.preventDefault()
			if ( !safetyScroll ){
				let drct
				if (e.wheelDeltaY < -40 ){
					drct = 1
				} else if (e.wheelDeltaY > 40 ){
					drct = -1
				}
				self.state.tl.clear()
				self.goTo(e, drct)
				safetyScroll = true
				setTimeout(function() {
					safetyScroll = false
				}, 400);
			}
		});
	}

	bindKeyboard(){
		const self = this
		$(document).keydown(function(e) {
			self.state.tl.clear()
    	switch(e.which) {
        case 37: // left
        	self.goTo(e, -1)
        	break

        case 38: // up
        	self.goTo(e, -1)
        	break

        case 39: // right
        	self.goTo(e, 1)
        	break

        case 40: // down
        	self.goTo(e, 1)
        	break

        default: return; // exit this handler for other keys
    	}
    	e.preventDefault(); // prevent the default action (scroll / move caret)
		});

	}	

	initHammer(){
		const self = this;

		let direction
		switch (this.props.orientation){
			case LANDSCAPE:
				direction = Hammer.DIRECTION_VERTICAL
				break
			case PORTRAIT:
				direction = Hammer.DIRECTION_HORIZONTAL
				break
		} 
		const mc = new Hammer.Manager(this.refs.list_work, {
			recognizers: [
				[Hammer.Pan,{ direction: direction }]
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
		switch (this.props.orientation){
			case LANDSCAPE:
				this.state.tl.set(this.refs.list_work,
				{
					y: e.deltaY
				})
				break
			case PORTRAIT:
				this.state.tl.set(this.refs.list_work,
				{
					x: e.deltaX
				})
				break
		} 
	}


	hammerEnd(e){
		let distance
		switch (this.props.orientation){
			case LANDSCAPE:
				distance = $(window).height()
				break
			case PORTRAIT:
				distance = $(window).width()
				break
		}

		if ( e.distance > ( 0.5 * ( distance / 2 )) ){
			this.goTo(e)
		} else {
			this.goBack()
		}
	}

	calcDest(){
		let factor
		switch (this.props.works_stage){
			case 1:
				factor = 100
				break
			case 2:
				factor = 50
				break
			default:
				break
		}
		return ( -1 * this.props.index ) * factor
	}

	goBack(){
		const { dispatch, index } = this.props
		dispatch(setNewIndex(index))
		this.goToDest()
	}

	goToDest(){
		const dest = this.calcDest()
		switch (this.props.orientation){
			case LANDSCAPE:
				this.state.tl.to(this.refs.list_work, 0.5,
				{
					y: dest+"%",
					ease: Power2.easeOut
				})
				break
			case PORTRAIT:
				this.state.tl.to(this.refs.list_work, 0.5,
				{
					x: dest+"%",
					ease: Power2.easeOut
				})
				break
		}
	}

	goTo(e, drct = null){
		const { dispatch, index, data } = this.props
		if ( drct === null ){
			drct = this.convertDirection(e)
		}
			const new_index = index + drct
			if ( new_index >= 0 && new_index < data.length){
				dispatch(setNewIndex(new_index))
			}

		this.goToDest()
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
			case 8:
				// PANED IT TO TOP
				return 1
				break
			case 16:
				// PANED IT TO BOT
				return -1
				break
			default:
				return null
				break
		}
	}

  render(){
  	const { data, orientation } = this.props
  	const { index } = this.props
    return (
     	<div className="works">
     		<div className={"list"} ref="list_work">
       		{ data.map(function(object, i){
       			let focus = false
       			if ( index == i ){
       				focus = true
       			}
		        return <OneWork key={i} data={object} pos={i} />
		    })}
     		</div>
     	</div>
    );
  }
}

Works.PropTypes = {
	data: PropTypes.array.isRequired,
	orientation: PropTypes.string.isRequired,
	works_stage: PropTypes.number.isRequired,
	index: PropTypes.number.isRequired
}


function mapStateToProps(state) {
  const { projectsReducer, responsiveReducer } = state

  const {
    isFetching,
    items: data,
    index
  } = projectsReducer || {
    isFetching: true,
    items: [],
    index: 0
  }

  const { 
  	orientation,
  	works_stage
  } = responsiveReducer || { 
  	orientation: null,
  	works_stage: 0
 	}

  return {
    data,
    isFetching,
    index,
    orientation,
    works_stage
  }
}

export default connect(mapStateToProps)(Works)