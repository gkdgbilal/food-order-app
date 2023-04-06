import Image from 'next/legacy/image'
import { useState } from 'react'
import Password from '@/components/profile/Password'
import Products from '@/components/admin/Products'
import Order from '@/components/admin/Order'
import Category from '@/components/admin/Category'
import Footer from '@/components/admin/Footer'
import axios from 'axios'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import AddProduct from '@/components/admin/AddProduct'

const Profile = ({ socket }) => {
    const [tabs, setTabs] = useState(0)
    const [isProductModal, setIsProductModal] = useState(false)
    const { push } = useRouter()

    const logoutAdminAccount = async () => {
        try {
            if (confirm('Are you sure you want to logout?')) {
                const res = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/admin`);
                if (res.status === 200) {
                    push('/admin')
                    toast.success('Logout successfully')
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='flex px-10 min-h-[calc(100vh_-_433px)] lg:flex-row flex-col lg:mb-0 mb-10'>
            <div className='lg:w-80 w-100 flex-shrink-0'>
                <div className='relative flex flex-col items-center px-10 py-5 border border-b-0'>
                    <Image
                        src="/images/admin.png"
                        alt="profile"
                        width={100}
                        height={100}
                        className='rounded-full'
                    />
                    <b className='text-2xl mt-1'>Admin</b>
                </div>
                <ul className='w-full text-center font-semibold'>
                    <li
                        className={`border  w-full p-3 cursor-pointer hover:bg-primary hover:text-white transition-all ${tabs === 0 && 'bg-primary text-white'}`}
                        onClick={() => setTabs(0)}
                    >
                        <i className="fa-solid fa-utensils"></i>
                        <button className='ml-1'>Products</button>
                    </li>
                    <li
                        className={`border border-t-0  w-full p-3 cursor-pointer hover:bg-primary hover:text-white transition-all ${tabs === 1 && 'bg-primary text-white'}`}
                        onClick={() => setTabs(1)}
                    >
                        <i className="fa-solid fa-motorcycle"></i>
                        <button className='ml-1'>Orders</button>
                    </li>
                    <li
                        className={`border border-t-0  w-full p-3 cursor-pointer hover:bg-primary hover:text-white transition-all ${tabs === 2 && 'bg-primary text-white'}`}
                        onClick={() => setTabs(2)}
                    >
                        <i className="fa-solid fa-braille"></i>
                        <button className='ml-1'>Categories</button>
                    </li>
                    <li
                        className={`border border-t-0  w-full p-3 cursor-pointer hover:bg-primary hover:text-white transition-all ${tabs === 3 && 'bg-primary text-white'}`}
                        onClick={() => setTabs(3)}
                    >
                        <i className="fa-regular fa-window-maximize"></i>
                        <button className='ml-1'>Footer</button>
                    </li>
                    <li
                        className={`border border-t-0 w-full p-3 cursor-pointer hover:bg-primary hover:text-white transition-all ${tabs === 4 && 'bg-primary text-white'}`}
                        onClick={logoutAdminAccount}
                    >
                        <i className="fa-solid fa-right-from-bracket"></i>
                        <button className='ml-1'>Exit</button>
                    </li>
                </ul>
            </div>
            {
                tabs === 0 && (
                    <Products />
                )
            }
            {
                tabs === 1 && (
                    <Order 
                        socket={socket}
                    />
                )
            }
            {
                tabs === 2 && (
                    <Category />
                )
            }
            {
                tabs === 3 && (
                    <Footer />
                )
            }
            {
                isProductModal && <AddProduct
                    setIsProductModal={setIsProductModal}
                />
            }
            <button
                className='fixed bottom-10 right-10 bg-primary text-white rounded-full w-12 h-12 flex items-center justify-center hover:scale-110 transition-all'
                onClick={() => setIsProductModal(true)}
            >
                +
            </button>
        </div>
    )
}

export const getServerSideProps = async (ctx) => {
    const { token } = ctx.req?.cookies || ""
    if (token !== process.env.ADMIN_TOKEN) {
        return {
            redirect: {
                destination: '/admin',
                permanent: false,
            }
        }
    }
    return {
        props: {}
    }
}

export default Profile