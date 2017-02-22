import React, { Component, PropTypes } from 'react'
import {Link} from './link'

export default class Contact extends Component {
  render() {
    return (
      <div className="contact">
      	<ul className="list">
      		<li className="bubble" ><i className="fa fa-envelope-o" aria-hidden="true"></i></li>
          { this.props.links.map(function(object, i){
              return <li key={i}><Link fa={ object.fa } url={ object.url } /></li>;
          })}
      	</ul>
      </div>
    )
  }
}