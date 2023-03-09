import MenuWrapper from '@/components/product/MenuWrapper'
import axios from 'axios'
import React from 'react'

const Index = ({ categoryList }) => {
  return (
    <div className='pt-10'>
      <MenuWrapper
        categoryList={categoryList}
      />
    </div>
  )
}

export const getServerSideProps = async (context) => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/categories`)
  return {
    props: {
      categoryList: res.data.data ? res.data.data : null,
    },
  }
}

export default Index