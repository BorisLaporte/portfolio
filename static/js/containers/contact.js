import React, { Component, PropTypes } from 'react'
import Link from '../components/contact/link'

export default class Contact extends Component {

  componentDidMount() {
    this.entranceAnim()
  }

  entranceAnim(){
    const tl = new TimelineLite()
    const { mail } = this.refs
    tl.from(mail, 1, {
      opacity: 0,
      ease: Power2.easeOut,
      delay: 1.8
    }).from(mail, 1, {
      scale: 0.5,
      ease: Elastic.easeOut.config(2, 0.75)
    }, "-=1")

  }

  render() {
    return (
      <div className="contact">
      	<ul className="list">
      		<li className="bubble" ref="mail" ><a href="mailto:boris.laporte@gmail.com"><i className="fa fa-envelope-o" aria-hidden="true"></i></a></li>
          { this.props.links.map(function(object, i){
              return <li key={i}><Link fa={ object.fa } url={ object.url } index={i} /></li>;
          })}
      	</ul>
      </div>
    )
  }
}