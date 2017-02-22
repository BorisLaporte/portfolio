import React, { Component, PropTypes } from 'react'
import Stress from "./stress"

export default class Description extends Component {
  render() {

    return (
    	<div className="description">
    		<h1 className="name" ><Stress value="BORIS LAPORTE" /></h1>
    		<div className="student">Student <Stress value="@Hetic"/></div>
    		<div className="content">
    			<span className="frag" >I'm a <Stress value="web developer" /> based in <Stress value="Paris" option="crossed"/>. </span>
    			<span className="frag">{'{'} I <Stress value="travel"/> all the time {'}'}</span>
    		</div>
    	</div>
    )
  }
}