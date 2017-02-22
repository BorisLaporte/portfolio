import React, { Component, PropTypes } from 'react'
import Project from './project'
import Technos from './technos'

export default class OneWork extends Component {

  shouldComponentUpdate(nextProps, nextState){
    if ( nextProps.data != this.props.data ){
      return true
    } else {
      return false
    }
  }


  render() {
    return (
    	<div className="one-work">
        <Project 
          img={this.props.data.background} 
          name={this.props.data.name} 
          resp={this.props.data.responsive}
          link={this.props.data.link}
         />
        <Technos technos={this.props.data.technos} />
    	</div>
    )
  }
}

OneWork.PropTypes = {
  data: PropTypes.object.isRequired
}