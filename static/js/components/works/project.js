import React, { Component, PropTypes } from 'react'

export default class Project extends Component {
  cutSpaces(string){
    return string.replace(/\ /, "\n\r")
  }

  render() {
  	const { name, img, link, responsive } = this.props
    return (
    	<div className="project">
    		<div className="name">{this.cutSpaces(name)}</div>
    		<div className="background">
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
  responsive: PropTypes.bool.isRequired
}