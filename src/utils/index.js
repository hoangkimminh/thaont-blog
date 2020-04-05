const getCurrentTime = () => {
  let date = new Date().getDate() //Current Date
  let month = new Date().getMonth() + 1 //Current Month
  let year = new Date().getFullYear() //Current Year
  let hours = new Date().getHours() //Current Hours
  let min = new Date().getMinutes() //Current Minutes
  let sec = new Date().getSeconds() //Current Seconds
  return date + '/' + month + '/' + year + ' ' + hours + ':' + min + ':' + sec
}

const addMetaTag = async (name, content) => {
  console.log('add')
  let metas = document.getElementsByTagName('meta')
  for (let i = 0; i < metas.length; i++) {
    const oldContent = 'og:' + name
    if (metas[i].getAttribute('property') == oldContent) {
      metas[i].setAttribute('content', content)
    }
  }
}

const addPageInfo = async (info) => {
  console.log('add')
  document.title = info.title
  addMetaTag('type', info.type)
  addMetaTag('url', info.url)
  addMetaTag('title', info.title)
  addMetaTag('image', info.image)
  addMetaTag('description', info.description)
}

export { getCurrentTime, addPageInfo }
