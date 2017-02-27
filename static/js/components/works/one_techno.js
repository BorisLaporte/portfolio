import React, { PropTypes } from 'react'


export const OneTechno = ({ src, alt }) => (
	<div className="one-techno">
		<img src={src} alt={alt} title={alt}/>
	</div>
)

OneTechno.PropTypes = {
	src: PropTypes.string.isRequired,
	alt: PropTypes.string.isRequired,
}

