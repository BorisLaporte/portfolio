import { createStore } from 'redux'

var Store = function(){
	this.init()
}

Store.prototype.init = function(){
	this.init_landscape()
	this.init_colors()
}

Store.prototype.init_landscape = function(){
	this.landscape = createStore(this.detect_orientation)
	this.landscape.subscribe(() =>
	  console.log(this.landscape.getState())
	)
}

Store.prototype.init_colors = function(){
	this.colors = createStore(this.random_color)
	this.colors.subscribe(() =>
	  console.log(this.colors.getState())
	)
}

Store.prototype.random_color = function(state = '#000000', action){
	let colors = ['#00A9FF'];
	switch (action.type) {
	case 'NEW':
		let rand = Math.floor(Math.random() * colors.length);
		state = colors[rand];
		return state;
	case 'GET':
		return state
	default:
		return state
	}
	
}

Store.prototype.detect_orientation = function(state = true, action){
switch (action.type) {
  case 'PORTRAIT':
    return false
  case 'LANDSCAPE':
    return true
  default:
    return state
  }
}

var store = new Store()
export default store