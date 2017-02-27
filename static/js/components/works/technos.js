import React, { Component, PropTypes } from 'react'
import {OneTechno} from "./one_techno"
import gsap from 'gsap'

export default class Technos extends Component {
  constructor(props){
    super(props)

    this.state = {
      tl: null,
      updates: 0 
    }
  }

  componentDidMount() {
    this.state.tl = new TimelineLite()
    this.onFocusAnim(1)
  }

  componentDidUpdate(prevProps, prevState) {
    const delay = this.state.updates ? 0 : 1
    this.onFocusAnim(delay)
    this.state.updates = this.state.updates + 1
  }

  onFocusAnim(delay){
    const { tl } = this.state
    const { techno } = this.refs
    const { onFocus } = this.props 
    tl.clear()
    if ( onFocus ){
      tl.to(techno, 0.8,
        {
          opacity: 1,
          ease: Power2.easeOut,
          delay: 0.3 + delay
        })
    }  else {
      tl.to(techno, 0.5,
        {
          opacity: 0,
          ease: Power2.easeOut,
          delay: delay
        })
    }

  }

  render() {
    return (
    	<div className="technos" ref="techno">
	    		{ this.props.technos.map(function(object, i){
	    			return <OneTechno src={object.image} alt={object.name} key={i} />
	    		})}
    	</div>
    )
  }
}

Technos.PropTypes = {
	technos: PropTypes.array.isRequired
}
