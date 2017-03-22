import React from 'react'

import { sortImgPath } from "./resolve"
import Preload from "./preload"


export default class PreloadReact extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      ready: false
    }
    this.letsGo = this.letsGo.bind(this)
  }

  shouldComponentUpdate(nextProps, nextState){
    if (( nextProps.data != null && nextProps.data != this.props.data) || nextState.ready ){
        return true
    } else {
        return false
    }
  }

  componentDidUpdate(){
    if ( this.props.data.length > 0 && !this.state.ready){
      let img = sortImgPath(this.props.data, this.props.prefixUrl)
      new Preload(img, this.letsGo)
    }
  }

  letsGo(){
    this.setState({ready: true})
  }

  render(){
    return (this.state.ready && this.props.children ? this.props.children : this.props.loader);
  }
}