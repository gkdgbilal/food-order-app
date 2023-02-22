import About from '@/components/About'
import Campaigns from '@/components/Campaigns'
import Carousel from '@/components/Carousel'
import Customers from '@/components/customers/Customers'
import Footer from '@/components/layout/Footer'
import MenuWrapper from '@/components/product/MenuWrapper'
import Reservation from '@/components/Reservation'
import React from 'react'

const Index = () => {
  return (
    <React.Fragment>
      <Carousel />
      <Campaigns />
      <MenuWrapper />
      <About />
      <Reservation />
      <Customers />
    </React.Fragment>
  )
}

export default Index