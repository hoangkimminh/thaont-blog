import React, { useEffect } from 'react'
import { NotificationContainer, NotificationManager } from 'react-notifications'

import Layout from '../components/layouts/Layout'
import ListPost from '../components/admin/ListPost'

const Admin = () => {
  useEffect(() => {
    document.title = 'Admin'
  })

  const createNotification = (type) => {
    return () => {
      switch (type) {
        case 'info':
          NotificationManager.info('Info message')
          break
        case 'success':
          NotificationManager.success('Success message', 'Title here')
          break
        case 'warning':
          NotificationManager.warning('Warning message', 'Close after 3000ms', 3000)
          break
        case 'error':
          NotificationManager.error('Error message', 'Click me!', 5000, () => {
            alert('callback')
          })
          break
      }
    }
  }
  return (
    <Layout>
      <ListPost createNotification={createNotification}></ListPost>
      <NotificationContainer />
    </Layout>
  )
}

export default Admin
