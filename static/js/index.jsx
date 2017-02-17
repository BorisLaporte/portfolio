var React = require('react')
var ReactDOM = require('react-dom')
require("../sass/main.scss")

var Hello = React.createClass ({
    render: function() {
        return (
            <h1>
            Hello, React! You dick.
            </h1>
        )
    }
})

ReactDOM.render(<Hello />, document.getElementById('container'))
