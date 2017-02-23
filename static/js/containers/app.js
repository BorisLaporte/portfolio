import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import { fetchProjects } from '../store/projects/actions'
import Preload from './preload/preload_react'
import AppBody from './app_body'
import {Loader} from '../components/loader'
import RandCharBack from './rand-char-back/rand_char_back'

class App extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchProjects())
  }


  render(){
    const { data, loader, children } = this.props
    return (
    <div className="wrapper-portfolio">
      <RandCharBack />
      <Preload 
       data={data}
       loader={<Loader/>}
       children={ <AppBody/> } />
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