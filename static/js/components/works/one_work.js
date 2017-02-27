import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { setNewIndex } from '../../store/projects/actions'
import Project from './project'
import Technos from './technos'
import gsap from 'gsap'

class OneWork extends Component {
  constructor(props){
    super(props)
    this.state = {
      onFocus: false
    }
  }

  shouldComponentUpdate(nextProps, nextState){
    if ( nextProps != this.props || nextState.onFocus != this.state.onFocus){
      return true
    } else {
      return false
    }
  }

  componentDidMount() {
    this.checkFocus(null)
    this.bindClick()
  }

  componentDidUpdate(prevProps, prevState) {
    this.checkFocus(prevState)
  }

  bindClick(){
    const { work } = this.refs
    const { pos, dispatch, data } = this.props
    const self = this
    work.firstChild.addEventListener('mousedown', function(e){
      e.preventDefault()
      if ( !self.state.onFocus ){
        dispatch(setNewIndex(pos))
      } else {
        // window.open(data.link, "_blank")
      }
    })
  }

  checkFocus(prevState){
    const { work } = this.refs
    const { pos, index } = this.props
    if ( pos == index ){
      this.setState({onFocus: true});
    } else {
      this.setState({onFocus: false});
    }
  }

  render() {
    return (
    	<div className="one-work" ref="work">
        <Project  
          img={this.props.data.background} 
          name={this.props.data.name} 
          resp={this.props.data.responsive}
          link={this.props.data.link}
          onFocus = {this.state.onFocus}
         />
        <Technos technos={this.props.data.technos} 
          onFocus = {this.state.onFocus}
        />
    	</div>
    )
  }
}

OneWork.PropTypes = {
  data: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  pos: PropTypes.number.isRequired
}


function mapStateToProps(state) {
  const { projectsReducer } = state

  const {
    index
  } = projectsReducer || {
    index: 0
  }

  return {
    index
  }

}

export default connect(mapStateToProps)(OneWork)
