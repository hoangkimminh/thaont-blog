import firebase from 'firebase'

export function createPost (post) {
  var date = new Date().getDate() //Current Date
  var month = new Date().getMonth() + 1 //Current Month
  var year = new Date().getFullYear() //Current Year
  var hours = new Date().getHours() //Current Hours
  var min = new Date().getMinutes() //Current Minutes
  var sec = new Date().getSeconds() //Current Seconds
  firebase
    .database()
    .ref('posts/')
    .push({
      title: post.title,
      category: post.category,
      content: post.content,
      createAt: date + '/' + month + '/' + year + ' ' + hours + ':' + min + ':' + sec
    })
    .then((data) => {
      console.log(data)
    })
    .catch((err) => console.error(err))
}

export default {createPost}
