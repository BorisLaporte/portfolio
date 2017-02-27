import React, { Component, PropTypes } from 'react'
import gsap from 'gsap'

export default class Loader extends Component {
	constructor(props){
		super(props)
		this.state = {
			tl : null
		}
	}

  componentDidMount() {
    this.state.tl = new TimelineMax({repeat: -1, yoyo: true})
    this.entranceAnim()
    this.loopAnim()
  }

  entranceAnim(){
  	const tl = new TimelineLite()
    const { all, gif, text } = this.refs
  	const all_enter = new TweenLite.from(all, 0.5,
      {
        opacity: 0,
        ease: Power2.easeOut
      })
    tl.add([all_enter])
  }

  loopAnim(){
    const { tl } = this.state
    const { symbol } = this.refs
    tl.fromTo(symbol, 1, {
    	x: -40+"%",
      ease: Power2.easeInOut
    },
    {
			x: 40+"%",
      ease: Power2.easeInOut
    })
  }

  componentWillUnmount() {
  	this.state.tl.clear()
  }

  render() {
  	return (
	  	<div className="loader">
				<div className="content" ref="all">
					<div className="gif" ref="gif">
						<span className="left end">[</span>
						<span className="center">
							<span className="symbol" ref="symbol" >=</span>
						</span>
						<span className="right end">]</span>
					</div>
					<div className="text" ref="text" >Loading</div>
				</div>
			</div>
		)
  }
}