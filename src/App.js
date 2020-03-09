import React from 'react'
import './App.css'
import 'react-notifications-component/dist/theme.css'
import ReactNotification from 'react-notifications-component'

import firebase from 'firebase'

import Routes from './components/routes/Routes'

class App extends React.Component {
  constructor(props) {
    super(props)
    let firebaseConfig = {
      apiKey: 'AIzaSyAvpuXlBVwkDORs6cWH1VfxUW41fqsNsO8',
      authDomain: 'thaont-blog.firebaseapp.com',
      databaseURL: 'https://thaont-blog.firebaseio.com',
      projectId: 'thaont-blog',
      storageBucket: 'thaont-blog.appspot.com',
      messagingSenderId: '242866136903',
      appId: '1:242866136903:web:ae9e05c06938ec78ebce62',
      measurementId: 'G-8H0L4N1FPY'
    }
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig)
    }
  }

  render() {
    return (
      <div className='App' style={{ backgroundColor: '#f2f2f2' }}>
        <Routes></Routes>
        <ReactNotification></ReactNotification>
      </div>
    )
  }
}

export default App
