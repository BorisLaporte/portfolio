import React, { Component, PropTypes } from 'react'

export default class Link extends Component {

  componentDidMount() {
    this.entranceAnim()
  }

  entranceAnim(){
    const tl = new TimelineLite()
    const { index } = this.props
    const { link } = this.refs
    tl.from(link, 1, {
      opacity: 0,
      x: -10,
      ease: Power2.easeOut,
      delay: (0.1 * index + 1.8)
    })

  }

  render() {
  	const { url, fa } = this.props
    return (
      <a href={url} target="_blank" ><i ref="link" className={"fa "+fa} aria-hidden="true"></i></a>
    )
  }
}

Link.propTypes = {
	fa: PropTypes.string.isRequired,
	url: PropTypes.string.isRequired,
	index: PropTypes.number.isRequired
}