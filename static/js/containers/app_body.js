import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Description from "../components/description/description"
import { PORTRAIT, LANDSCAPE } from '../store/responsive/actions'
import Contact from "./contact"
import Works from "./works"

class AppBody extends Component {
  constructor(props){
    super(props)
    this.state = {
      links: [
        {
            fa: "fa-linkedin",
            url: "https://www.linkedin.com/in/boris-laporte-65ab18a8"
        },
        {
            fa: "fa-github",
            url: "https://github.com/BorisLaporte"
        },
        {
            fa: "fa-500px",
            url: "https://500px.com/borislaporte"
        }
      ]
    }
  }

  componentDidMount() {
    this.entranceAnim()
  }

  
  entranceAnim(){
    const tl = new TimelineLite()
    const { main } = this.refs
    tl.from(main, 1,
      {
        opacity: 0,
        ease: Power2.easeOut,
        delay: 0.5
      })
  }

  render() {
    const { orientation } = this.props
    switch(orientation){
      case LANDSCAPE:
        return (
            <div className="portfolio" ref="main">
              <div className="column first" >
                <Description />
                <Contact links={this.state.links} />
              </div>
              <div className="column second" >
                <Works />
              </div>
            </div>
          )
        break
      case PORTRAIT:
        return (
            <div className="portfolio" ref="main">
              <div className="column unique" >
                <Description />
                <Works />
                <Contact links={this.state.links} />
              </div>
            </div>
          )
        break
      default:
        break
    }
  }
}

AppBody.propTypes = {
  orientation: PropTypes.string.isRequired,
}

function mapStateToProps(state) {
  const { responsiveReducer } = state
  const {
    orientation
  } = responsiveReducer || {
    orientation: LANDSCAPE
  }

  return {
    orientation
  }
}

export default connect(mapStateToProps)(AppBody)