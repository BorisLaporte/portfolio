var React = require('react')
var ReactDOM = require('react-dom')
import BoldColoredSpan from './misc/bold_colored_span.jsx'

export default class Content extends React.Component {
    render(){
      return (
      	<div className="content">
      		<p>I'm a <BoldColoredSpan content="web developer"/> based in</p>
      		<p><BoldColoredSpan content="Paris" class="crossed"/>. {'{'} I <BoldColoredSpan content="travel"/> all the time {'}'}</p>
      	</div>
      );
    }
}
