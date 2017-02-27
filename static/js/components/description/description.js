import React, { Component, PropTypes } from 'react'
import Stress from "./stress"
import gsap from "gsap"

export default class Description extends Component {

  componentDidMount() {
    this.entranceAnim()
  }

  entranceAnim(){
    const tl = new TimelineLite()
    const { name, student, content } = this.refs
    const tweenName = TweenLite.from(name, 1.5, {
      y: -30,
      opacity: 0,
      ease: Power2.easeOut,
      delay: 1.2
    })
    const tweenStudent = TweenLite.from(student, 1.5, {
      y: 20,
      opacity: 0,
      ease: Power2.easeOut,
      delay: 1.2
    })
    const tweenContent = TweenLite.from(content, 1.2, {
      y: 20,
      opacity: 0,
      ease: Power2.easeOut,
      delay: 1.4
    })
    tl.add([tweenName, tweenContent, tweenStudent])
  }

  render() {

    return (
    	<div className="description">
    		<h1 className="name" ref="name" ><Stress value="BORIS LAPORTE" /></h1>
    		<div className="student" ref="student">Student <Stress value="@Hetic"/></div>
    		<div className="content" ref="content">
    			<span className="frag" >I'm a <Stress value="web developer" /> based in <Stress value="Paris"/>. </span>
    			<span className="frag">{'{'} I <Stress value="travel"/> all the time {'}'}</span>
    		</div>
    	</div>
    )
  }
}