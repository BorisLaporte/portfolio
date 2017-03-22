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
			tl: null,
			isScrolling: false,
			scroll: null
		}
		this.onScroll = this.onScroll.bind(this)
	}

	shouldComponentUpdate(nextProps, nextState){
		if ( nextProps != this.props ){
			return true
		} else {
			return false
		}
	}

	componentWillMount() {
    this.setState({tl: new TimelineLite()})
  }

	componentDidMount(){
		const self = this
		this.initHammer()
		this.bindOthers()
		if ( this.props.index > 0 ){
			this.goToDest()
		}
		this.entranceAnim()
	}

	componentDidUpdate(prevProps, prevState) {
		const {index, orientation} = this.props
		if ( prevProps.index != index ){
		} else if ( prevProps.orientation != orientation ) {
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
		window.addEventListener('wheel', this.onScroll)
	}

	componentWillUnmount() {
		window.removeEventListener('wheel', this.onScroll)
	}


	onScroll(e){
		const {deltaY} = e
    const {isScrolling} = this.state
    if ( !isScrolling ){
      if ( deltaY >= 30 ){
      	this.scrollToNext(e, 1)
      } else if ( deltaY <= -30 ){
      	this.scrollToNext(e, -1)
      }

    }
	}

	scrollToNext(e, drct){
		const {scroll} = this.state
		const self = this
		const {tl} = this.state
		this.goTo(e, drct)
		this.setState({isScrolling: true})
		clearTimeout(scroll)
		const newScroll = setTimeout(function() {
      self.setState({isScrolling: false})
    }, 500 )
    this.setState({scroll: newScroll})
	}



	bindKeyboard(){
		const self = this
		$(document).keydown(function(e) {
			// self.state.tl.clear()
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
			// self.state.tl.clear()
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
		const {tl} = this.state
		const {orientation} = this.props
		const {list_work} = this.refs
		tl.clear()
		switch (orientation){
			case LANDSCAPE:
				tl.set(list_work,
				{
					y: e.deltaY
				})
				break
			case PORTRAIT:
				tl.set(list_work,
				{
					x: e.deltaX
				})
				break
		} 
	}


	hammerEnd(e){
		const {orientation} = this.props
		let distance
		switch (orientation){
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
			this.goToDest()
		}
	}

	calcDest(){
		let factor
		const {works_stage, index} = this.props
		switch (works_stage){
			case 1:
				factor = 100
				break
			case 2:
				factor = 50
				break
			default:
				break
		}
		return ( -1 * index ) * factor
	}

	goToDest(){
		const {tl} = this.state
		const {list_work} = this.refs
		const {orientation} = this.props
		const dest = this.calcDest()
		tl.clear()
		let tween
		switch (orientation){
			case LANDSCAPE:
				tween = new TweenLite.to(list_work, 0.7,
				{
					y: dest+"%",
					ease: Power2.easeOut
				})
				break
			case PORTRAIT:
				tween = new TweenLite.to(list_work, 0.7,
				{
					x: dest+"%",
					ease: Power2.easeOut
				})
				break
		}
		tl.add([tween])
	}

	goTo(e, drct = null){
		const { dispatch, index, data } = this.props
		if ( drct === null ){
			drct = this.convertDirection(e)
		}
			const new_index = index + drct
			if ( new_index >= 0 && new_index < data.length){
				dispatch(setNewIndex(new_index))
			} else {
				this.goToDest()
			}

		// this.goToDest()
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