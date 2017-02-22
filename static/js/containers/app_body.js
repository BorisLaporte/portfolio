import React, { Component, PropTypes } from 'react'
import Description from "../components/description/description"
import Contact from "../components/contact/contact"
import Works from "./works"

export default class AppBody extends Component {
  constructor(props){
    super(props)
    this.state = {
      links: [
        {
            fa: "fa-linkedin",
            url: "#"
        },
        {
            fa: "fa-github",
            url: "#"
        },
        {
            fa: "fa-500px",
            url: "#"
        }
      ]
    }
  }

  render() {
    return (
      <div className="portfolio">
       	<Description />
       	<Works />
       	<Contact links={this.state.links} />
      </div>
    )
  }
}
