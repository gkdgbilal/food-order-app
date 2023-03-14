import Title from '@/components/ui/Title'
import Image from 'next/legacy/image'
import React from 'react'
import { useSelector, useDispatch } from "react-redux"
import { reset } from "@/redux/cartSlice";
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

const Index = ({ userList }) => {
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const router = useRouter();

    const { data: session } = useSession();

    const user = userList.find((user) => user.email === session?.user?.email);

    const newOrder = {
        customer: user?.fullName,
        address: user?.address ? user?.address : 'No address',
        total: cart.total,
        method: 0,
        status: 0,
    }

    const createOrder = async () => {
        try {
            if (session) {
                if (confirm('Are you sure to order?')) {
                    const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/orders`, newOrder);

                    if (res.status === 201) {
                        router.push(`/order/${res.data.data._id}`);
                        dispatch(reset());
                        toast.success('Order created successfully!', {
                            autoClose: 1000,
                        });
                    }
                }
            } else {
                toast.error('Please login first.', {
                    autoClose: 1000,
                })
            }
        } catch (error) {
            toast.error('Please login first.', {
                autoClose: 1000,
            })
            console.log(error);
        }
    }

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
                            {
                                cart.products.map((product, index) => (
                                    <tr
                                        key={product._id}
                                        className='bg-secondary border-gray-700 hover:bg-primary transition-all'>
                                        <td className='py-4 px-6 font-medium whitespace-nowrap hover:text-white flex items-center gap-x-1 justify-center'>
                                            <Image
                                                src={product.image}
                                                alt="Picture of the author"
                                                width={50}
                                                height={50}
                                            />
                                            <span>{product.name}</span>
                                        </td>
                                        <td className='py-4 px-6 font-medium whitespace-nowrap hover:text-white'>
                                            {
                                                product.extras.map((extra) => (
                                                    <span
                                                        key={extra._id}
                                                    >
                                                        {extra.text},
                                                    </span>
                                                ))
                                            }
                                        </td>
                                        <td className='py-4 px-6 font-medium whitespace-nowrap hover:text-white'>
                                            <span>
                                                ${product.price}
                                            </span>
                                        </td>
                                        <td className='py-4 px-6 font-medium whitespace-nowrap hover:text-white'>
                                            <span>
                                                {product.quantity}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
                <div className='bg-secondary min-h-[calc(100vh_-_433px)] flex flex-col justify-center text-white p-12 md:w-auto w-full md:text-start !text-center'>
                    <Title addClass="text-[40px]">CART TOTAL</Title>
                    <div className='mt-6'>
                        <b>Subtotal: </b>${cart.total} <br />
                        <b className='inline-block my-1'>Discount: </b>$0.00 <br />
                        <b>Total: </b>${cart.total}
                    </div>
                    <div>
                        <button
                            className="btn-primary mt-4 md:w-auto w-52"
                            onClick={createOrder}
                        >
                            CHECKOUT NOW
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export const getServerSideProps = async (context) => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users`)
    return {
        props: {
            userList: res.data.data ? res.data.data : null,
        },
    }
}

export default Index