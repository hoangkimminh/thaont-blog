const getCurrentTime = () => {
  let date = new Date().getDate() //Current Date
  let month = new Date().getMonth() + 1 //Current Month
  let year = new Date().getFullYear() //Current Year
  let hours = new Date().getHours() //Current Hours
  let min = new Date().getMinutes() //Current Minutes
  let sec = new Date().getSeconds() //Current Seconds
  return date + '/' + month + '/' + year + ' ' + hours + ':' + min + ':' + sec
}

const addMetaTag = (name, content) => {
  let link = document.createElement('meta')
  link.setAttribute('property', 'og:' + name)
  link.content = content
  document.getElementsByTagName('head')[0].appendChild(link)
}

const addPageInfo = (info) => {
  document.title = info.title
  addMetaTag('type', info.type)
  addMetaTag('url', info.url)
  addMetaTag('title', info.title)
  addMetaTag('image', info.image)
  addMetaTag('description', info.description)
}

export { getCurrentTime, addPageInfo }
