const getCurrentTime = () => {
  let date = new Date().getDate() //Current Date
  let month = new Date().getMonth() + 1 //Current Month
  let year = new Date().getFullYear() //Current Year
  let hours = new Date().getHours() //Current Hours
  let min = new Date().getMinutes() //Current Minutes
  let sec = new Date().getSeconds() //Current Seconds
  return date + '/' + month + '/' + year + ' ' + hours + ':' + min + ':' + sec
}

export { getCurrentTime }
