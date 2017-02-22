export const ADD_COLOR = 'ADD_COLOR'


export const ListColors = [
	'#0081D5',
	'#D50047'
]

export const addColor = (hexa) => {
  return { 
  	type: ADD_COLOR, 
  	hexa 
  }
}