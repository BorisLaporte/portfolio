export default class Prelaod {
	constructor(img, onSuccess, limitTime = 6000, onFailure = null, percentage = null){
    this.onSuccess = onSuccess
    this.onFailure = onFailure
    this.percentage = percentage
    this.imgToDownload = img

    this.imgDone = []
    this.timeout = this.safetyTimeout(limitTime)
    this.loadImages(img)
  }

  loadImages(imgArray){
    let images = []
    for (var i=0; i < this.imgToDownload.length; i++){
        images[i] = new Image()
        images[i].onload = this.updateStatus.bind(this, images[i])
        images[i].src = imgArray[i]
    }
  }

  safetyTimeout(time){
  	let self = this
  	return setTimeout(function() {
  		self.onFailure ? self.onFailure : self.onSuccess
    }, time)
  }

  updateStatus(img){
    this.imgDone.push(img)
    let status = ( this.imgDone.length / this.imgToDownload.length )
    if ( this.percentage ){
      this.percentage(status)
    }
    if ( status === 1 ){
      clearTimeout(this.timeout)
      this.onSuccess()
    }
  }
}
