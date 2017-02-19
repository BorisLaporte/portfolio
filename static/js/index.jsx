var React = require('react')
var ReactDOM = require('react-dom')
var HammerJs = require('hammerjs')
// var $ = require('jquery')
require("../sass/main.scss")

import Description from "./description/description.jsx"
import Works from "./works/works.jsx"
import Store from "./stores.js"

class Portfolio extends React.Component {
	constructor() {
	    super()
  	}

  	componentWillMount(){
  		if ( $(window).width() < $(window).height() ){
  			Store.landscape.dispatch({ type: 'PORTRAIT' })
  		} else {
  			Store.landscape.dispatch({ type: 'LANDSCAPE' })
  		}

      Store.colors.dispatch({ type: 'NEW' })
  	}

  	render(){
      return (
   		<div className="portfolio">
        	<Description />
        </div>
      );
    }
}

ReactDOM.render(<Portfolio />, document.getElementById('container'))
