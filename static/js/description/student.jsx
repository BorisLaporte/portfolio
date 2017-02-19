var React = require('react')
var ReactDOM = require('react-dom')
import BoldColoredSpan from './misc/bold_colored_span.jsx'

export default class Student extends React.Component {
    render(){
      return (
   		<div className="student" >
   			Student <BoldColoredSpan content="@Hetic"/>
   		</div>
      );
    }
}
