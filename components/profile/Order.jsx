import axios from 'axios'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import Title from '../ui/Title'

const Order = () => {
    const [orders, setOrders] = useState([])
    const [currentUser, setCurrentUser] = useState([])
    const status = ["Preparing", "On the way", "Delivered"]
    const { data: session } = useSession()
    const getOrders = async () => {
        try {
            const res = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}/orders`
            );
            setOrders(
                res.data.data.filter((order) => order.customer === currentUser?.fullName)
            );
        } catch (err) {
            console.log(err);
        }
    };

    const getCurrentUser = async () => {
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users`)
            setCurrentUser(
                res.data.data.filter(user => user.email === session?.user?.email)[0]
            )
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getOrders()
    }, [currentUser])

    useEffect(() => {
        getCurrentUser()
    }, [session])

    return (
        <div className="lg:p-8 flex-1 lg:mt-0 mt-5">
            <Title addClass="text-[40px]">Password</Title>
            <div className='overflow-x-auto w-full mt-5'>
                <table className='w-full text-sm text-center text-gray-500 xl:min-w-[1000px]  min-w-full'>
                    <thead className='text-xs text-gray-400 uppercase bg-gray-700'>
                        <tr>
                            <th scope="col" className="py-3 px-6">
                                ID
                            </th>
                            <th scope="col" className="py-3 px-6">
                                ADRESS
                            </th>
                            <th scope="col" className="py-3 px-6">
                                DATE
                            </th>
                            <th scope="col" className="py-3 px-6">
                                TOTAL
                            </th>
                            <th scope="col" className="py-3 px-6">
                                STATUS
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders.map(order => (
                                <tr
                                    className='bg-secondary border-gray-700 hover:bg-primary transition-all'
                                    key={order._id}
                                >
                                    <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white flex items-center gap-x-1 justify-center">
                                        <span>{order._id.substring(0, 8)}...</span>
                                    </td>
                                    <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                                        {order.address}
                                    </td>
                                    <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                                        {new Date(order.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                                        $ {order.total}
                                    </td>
                                    <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                                        {status[order.status]}
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Order