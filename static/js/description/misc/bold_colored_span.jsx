var React = require('react')
var ReactDOM = require('react-dom')
import Store from '../../stores.js'

export default class BoldColoredSpan extends React.Component {
	setColor(){
		let color = Store.colors.getState()
		return { color: color }
	}

    render(){
      return (
       	<span className={"bold " + this.props.class} style={this.setColor()} >{this.props.content}</span>
      );
    }
}
