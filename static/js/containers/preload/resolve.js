const crawlable = [
  "object",
  "array"
]

const acceptedImgs = [
  "png",
  "jpg",
  "jpeg",
  "gif"
]

const isPathImg = (string) => {
  if ( typeof string == "string" ){
    if ( acceptedImgs.lastIndexOf(string.substring(string.lastIndexOf(".") + 1).toLowerCase()) != -1 ){
      return true
    }
  } else {
    return false
  }
}

export const sortImgPath = (data, urlPrefix = "", imgs = []) => {
  if ( crawlable.lastIndexOf(typeof data) != -1 ){
    $.each(data, (keys, _el) => {
      if ( crawlable.lastIndexOf(typeof _el) != -1 ){
        imgs = sortImgPath(_el, urlPrefix, imgs)
      } else if ( isPathImg(_el) ) {
        imgs.push(urlPrefix + _el)
      }
    })
    return imgs
  } else {
    return false
  }
}

