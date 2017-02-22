import React, { Component, PropTypes } from 'react'
import {OneTechno} from "./one_techno"

export default class Technos extends Component {
  render() {
    return (
    	<div className="technos">
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
