import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import { fetchProjects } from '../store/projects/actions'
import { getWindowSize, PORTRAIT, LANDSCAPE } from '../store/responsive/actions'
import PreloadReact from './preload/preload_react'
import AppBody from './app_body'
import Loader from '../components/loader'
import RandCharBack from './rand-char-back/rand_char_back'

class App extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    const { dispatch } = this.props
    dispatch(getWindowSize())
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchProjects())
    this.setListenerResponsive()
  }

  setListenerResponsive(){
    const self = this
    const { dispatch } = this.props
    window.onresize = () => {
      dispatch(getWindowSize())
    }
  }


  render(){
    const { data, loader, children } = this.props
    return (
    <div className="wrapper-portfolio">
      <RandCharBack />
      <PreloadReact 
       data={data}
       loader={<Loader/>}
       children={<AppBody/>} />
    </div>
    );
  }
}

App.propTypes = {
  data: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { projectsReducer } = state
  const {
    isFetching,
    items: data
  } = projectsReducer || {
    isFetching: true,
    items: []
  }

  return {
    data,
    isFetching
  }
}

export default connect(mapStateToProps)(App)