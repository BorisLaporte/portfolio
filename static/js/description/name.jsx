var React = require('react')
var ReactDOM = require('react-dom')
import Store from '../stores.js'

export default class Name extends React.Component {
    render(){
      return (
       	<h1 className="name" style={{color: Store.colors.getState()}}>BORIS LAPORTE</h1>
      );
    }
}
