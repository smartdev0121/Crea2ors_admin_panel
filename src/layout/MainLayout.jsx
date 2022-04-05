import React from 'react'
import { useSelector } from 'react-redux'

import Header from './Header'
import MSpin from 'src/components/MSpin'
import Footer from './Footer'

const MainLayout = ({ children }) => {
  const loading = useSelector((state) => state.loading.value)

  return (
    <>
      <MSpin spinning={loading} />
      {/* <div className='blur-circle-1' /> */}
      {/* <div className='blur-circle-2' /> */}
      <Header />
      {children}
      <Footer />
    </>
  )
}

export default MainLayout
