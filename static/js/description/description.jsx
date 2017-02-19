var React = require('react')
var ReactDOM = require('react-dom')

import Name from "./name.jsx"
import Student from "./student.jsx"
import Content from "./content.jsx"

export default class Description extends React.Component {
	shouldComponentUpdate(){
		return false;
	}

    render(){
      return (
       	<div className="description" >
       		<Name />
       		<Student />
       		<Content />
       	</div>
      );
    }
}
