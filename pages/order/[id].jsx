import axios from 'axios';
import Image from 'next/legacy/image'

const Index = ({ orderItem }) => {
    const status = orderItem?.status

    const statusClass = (index) => {
        if (index - status < 1) {
            return ''
        } else if (index - status === 1) {
            return 'animate-pulse'
        } else {
            return ''
        }
    }

    return (
        <div className='min-h-[calc(100vh_-_433px)] flex justify-center items-center flex-col p-10'>
            <div className='flex items-center flex-1 overflow-x-auto w-full max-h-28'>
                <table className='w-full text-sm text-center text-gray-500 min-w-[1000px]'>
                    <thead className='text-xs text-gray-400 uppercase bg-gray-700'>
                        <tr>
                            <th scope="col" className='py-3 px-6'>ORDER ID</th>
                            <th scope="col" className='py-3 px-6'>CUSTOMER</th>
                            <th scope="col" className='py-3 px-6'>ADDRESS</th>
                            <th scope="col" className='py-3 px-6'>TOTAL</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className='bg-secondary border-gray-700 hover:bg-primary transition-all'>
                            <td className='py-4 px-6 font-medium whitespace-nowrap hover:text-white flex items-center gap-x-1 justify-center'>
                                <span>
                                    {orderItem?._id.substring(0, 8)}...
                                </span>
                            </td>
                            <td className='py-4 px-6 font-medium whitespace-nowrap hover:text-white'>
                                <span>
                                    {orderItem?.customer}
                                </span>
                            </td>
                            <td className='py-4 px-6 font-medium whitespace-nowrap hover:text-white'>
                                <span>
                                    {orderItem?.address}
                                </span>
                            </td>
                            <td className='py-4 px-6 font-medium whitespace-nowrap hover:text-white'>
                                <span>
                                    ${orderItem?.total}
                                </span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className='flex justify-between w-full p-10 bg-primary mt-6'>
                <div className={`relative flex flex-col ${statusClass(0)}`}>
                    <Image
                        src="/images/paid.png"
                        alt="payment"
                        width={40}
                        height={40}
                    />
                    <span>Payment</span>
                </div>
                <div className={`relative flex flex-col ${statusClass(1)}`}>
                    <Image
                        src="/images/bake.png"
                        alt="payment"
                        width={40}
                        height={40}
                    />
                    <span>Preparing</span>
                </div>
                <div className={`relative flex flex-col ${statusClass(2)}`}>
                    <Image
                        src="/images/bike.png"
                        alt="payment"
                        width={40}
                        height={40}
                    />
                    <span>On the way</span>
                </div>
                <div className={`relative flex flex-col ${statusClass(3)}`}>
                    <Image
                        src="/images/delivered.png"
                        alt="payment"
                        width={40}
                        height={40}
                    />
                    <span>Delivered</span>
                </div>
            </div>
        </div>
    )
}

export const getServerSideProps = async (context) => {
    const { id } = context.params;

    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/orders/${id}`)

    return {
        props: {
            orderItem: res.data || [],
        }
    }
}

export default Index