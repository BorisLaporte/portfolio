import React, { Component, PropTypes } from 'react'
import gsap from 'gsap'

export default class Project extends Component {
  constructor(props){
    super(props)

    this.state = {
      tl: null,
      updates: 0,
      browsing: false
    }
  }



  componentDidMount() {
    this.state.tl = new TimelineLite()
    this.onFocusAnim(0.8)
    this.bindClick()
  }

  bindClick(){
    const { project } = this.refs
    const { onFocus, link } = this.props
    const self = this
    project.addEventListener('click', function(e){
      e.preventDefault()
      if ( !self.state.browsing ){
        window.open(link, "_blank")
      }
    })
  }

  componentWillUpdate(nextProps, nextState) {
    this.state.browsing = false
    if ( !this.state.onFocus && nextState.onFocus )
    {
      this.state.browsing = true
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const delay = this.state.updates ? 0 : 0.8
    this.state.browsing = true
    this.onFocusAnim(delay, prevProps)
    this.state.updates = this.state.updates + 1
  }

  onFocusAnim(delay, prevProps = {onFocus: null}){
    const { tl } = this.state
    const { name, background } = this.refs
    const { onFocus } = this.props 
    tl.clear()
    if ( onFocus && prevProps.onFocus != onFocus ){
      const name_enter = new TweenLite.to(name, 0.5,
        {
          opacity: 1,
          ease: Power2.easeOut,
          onComplete: ()=>{
            this.state.browsing = false
          }
        })
      const background_enter = new TweenLite.to(background, 0.3,
        {
          scale: 1,
          ease: Power2.easeOut,
          delay: delay
        })
      tl.add(background_enter)
      .add(name_enter, "-=0.2")

    }  else if ( prevProps.onFocus != onFocus  ) {
      const name_leaving = new TweenLite.to(name, 0.5,
        {
          opacity: 0,
          ease: Power2.easeOut,
          delay: delay
        })
      const background_leaving = new TweenLite.to(background, 0.8,
        {
          scale: 0.7,
          ease: Power2.easeOut,
          delay: delay
        })
      tl.add([name_leaving, background_leaving], 0)
    }

  }

  cutSpaces(string){
    return string.replace(/\ /, "\n\r")
  }

  render() {
  	const { name, img, link, responsive } = this.props
    return (
    	<div className="project" ref="project">
      		<div className="name" ref="name" >{this.cutSpaces(name)}</div>
      		<div className="background" ref="background">
            <div className="shadow"></div>
      			<img src={img} alt={name}/>
      		</div>
    	</div>
    )
  }
}

Project.PropTypes = {
  name: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  responsive: PropTypes.bool.isRequired,
  onFocus: PropTypes.bool.isRequired
}