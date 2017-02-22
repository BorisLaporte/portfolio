import React, { Component, PropTypes } from 'react'

class Stress extends Component {
  render() {
    const value = this.props.value
    const color = this.props.color
    const option = this.props.option || ""

    return (

    	<span className={"stressed "+option}>{ value }</span>
    )
  }
}

Stress.propTypes = {
	value: PropTypes.string.isRequired,
	option: PropTypes.string
}

export default Stress