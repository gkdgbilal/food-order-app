import Title from '@/components/ui/Title'
import Image from 'next/image'
import React from 'react'

const Index = () => {
    return (
        <div className='min-h-[calc(100vh_-_433px)]'>
            <div className='flex justify-between items-center md:flex-row flex-col'>
                <div className='md:min-h-[calc(100vh_-_433px)] flex items-center flex-1 p-10 overflow-x-auto w-full'>
                    <table className='w-full text-sm text-center text-gray-500 min-w-[1000px]'>
                        <thead className='text-xs text-gray-400 uppercase bg-gray-700'>
                            <tr>
                                <th scope="col" className='py-3 px-6'>PRODUCT</th>
                                <th scope="col" className='py-3 px-6'>EXTRAS</th>
                                <th scope="col" className='py-3 px-6'>PRICE</th>
                                <th scope="col" className='py-3 px-6'>QUANTITY</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className='bg-secondary border-gray-700 hover:bg-primary transition-all'>
                                <td className='py-4 px-6 font-medium whitespace-nowrap hover:text-white flex items-center gap-x-1 justify-center'>
                                    <Image
                                        src="/images/f1.png"
                                        alt="Picture of the author"
                                        width={50}
                                        height={50}
                                    />
                                    <span>Good Pizza</span>
                                </td>
                                <td className='py-4 px-6 font-medium whitespace-nowrap hover:text-white'>
                                    <span>
                                        mayonnaise, ketchup, mustard, pickles, onions
                                    </span>
                                </td>
                                <td className='py-4 px-6 font-medium whitespace-nowrap hover:text-white'>
                                    <span>
                                        $20
                                    </span>
                                </td>
                                <td className='py-4 px-6 font-medium whitespace-nowrap hover:text-white'>
                                    <span>
                                        1
                                    </span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className='bg-secondary min-h-[calc(100vh_-_433px)] flex flex-col justify-center text-white p-12 md:w-auto w-full md:text-start !text-center'>
                    <Title addClass="text-[40px]">CART TOTAL</Title>
                    <div className='mt-6'>
                        <b>Subtotal: </b>$20 <br />
                        <b className='inline-block my-1'>Discount: </b>$0.00 <br />
                        <b>Total: </b>$20
                    </div>
                    <div>
                        <button className="btn-primary mt-4 md:w-auto w-52">CHECKOUT NOW</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Index