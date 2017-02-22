import React, { PropTypes } from 'react'

export const Link = ({fa, url}) => (
	<a href={url}><i className={"fa "+fa} aria-hidden="true"></i></a>
)

Link.propTypes = {
	fa: PropTypes.string.isRequired,
	url: PropTypes.string.isRequired
}