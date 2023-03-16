import React, { useEffect, useState } from 'react'
import Title from '../ui/Title'
import MenuItem from './MenuItem'

const MenuWrapper = ({ categoryList, productList }) => {
    const [activeCategory, setActiveCategory] = useState(0)
    const [filteredProduct, setFilteredProduct] = useState([])
    const [productLimit, setProductLimit] = useState(3)

    useEffect(() => {
        setFilteredProduct(
            productList.filter(
                (product) =>
                    product.category === categoryList[activeCategory].title.toLowerCase()
            )
        );
    }, [activeCategory])

    return (
        <div className='container mx-auto mb-16'>
            <div className='flex flex-col items-center w-full'>
                <Title addClass="text-[40px]">
                    Our Menu
                </Title>
                <div className='mt-10'>
                    {
                        categoryList && categoryList.map((category, index) => (
                            <button
                                key={category._id}
                                className={`px-6 py-2 rounded-3xl ${index === activeCategory && 'bg-secondary text-white'}`}
                                onClick={() => {
                                    setActiveCategory(index)
                                    setProductLimit(3)
                                }}
                            >
                                {category.title}
                            </button>
                        ))
                    }
                </div>
            </div>
            <div className='mt-8 grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 min-h-[400px]'>
                {
                    filteredProduct && filteredProduct
                        .slice(0, 3)
                        .map((product) => (
                            <MenuItem
                                key={product._id}
                                product={product}
                            />
                        ))
                }
            </div>
            <div className='flex items-center justify-center w-full mt-8'>
                <button
                    className='btn-primary'
                    onClick={() => setProductLimit(productLimit + 3)}
                >
                    View More
                </button>
            </div>
        </div>
    )
}

export default MenuWrapper