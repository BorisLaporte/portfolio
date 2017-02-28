export const RESIZING = 'RESIZING'

function resizing(width, height, orientation, works_stage) {
  return {
    type: RESIZING,
    width,
    height,
    orientation,
    works_stage
  }
}


export function getWindowSize(){
	return function (dispatch) {
    const width = window.innerWidth
    const height = window.innerHeight
    let orientation
    let compareForWorksStage
    if (height <= width){ 
      compareForWorksStage = height
      orientation = LANDSCAPE
    } else { 
      compareForWorksStage = width
      orientation = PORTRAIT
    }

    let works_stage = 0
    if ( compareForWorksStage > 0 && compareForWorksStage <= 600 ){
      works_stage = 1
    } else {
      works_stage = 2
    }

    dispatch(resizing(width, height, orientation, works_stage))
  }
}

export const LANDSCAPE = 'LANDSCAPE'
export const PORTRAIT = 'PORTRAIT'