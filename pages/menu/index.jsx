import MenuWrapper from '@/components/product/MenuWrapper'
import axios from 'axios'
import React from 'react'

const Index = ({ categoryList, productList }) => {
  return (
    <div className='pt-10'>
      <MenuWrapper
        categoryList={categoryList}
        productList={productList}
      />
    </div>
  )
}

export const getServerSideProps = async (context) => {
  const category = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/categories`)
  const product = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products`)

  return {
    props: {
      categoryList: category.data.data ? category.data.data : null,
      productList: product.data.data ? product.data.data : null,
    },
  }
}

export default Index