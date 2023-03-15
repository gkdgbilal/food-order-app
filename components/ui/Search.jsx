import Image from 'next/legacy/image';
import { useEffect, useState } from 'react'
import OutsideClickHandler from 'react-outside-click-handler';
import Title from "../ui/Title";
import { GiCancel } from 'react-icons/gi'
import axios from 'axios';
import Input from '../form/Input';
import { useRouter } from 'next/router';
import PacmanLoader from "react-spinners/PacmanLoader";

const Search = ({ setIsSearchModal }) => {
    const [products, setProducts] = useState([])
    const [filteredProducts, setFilteredProducts] = useState([])
    const router = useRouter()

    const getProducts = async () => {
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products`)
            setProducts(res.data.data)
            setFilteredProducts(res.data.data.slice(0, 5))
        } catch (error) {
            console.log(error)
        }
    }

    const handleSearch = (e) => {
        const searchFilter = products.filter(product => product.title.toLowerCase().includes(e.target.value.toLowerCase()))
            .slice(0, 5)
        setFilteredProducts(searchFilter)
    }

    useEffect(() => {
        setTimeout(() => {
            getProducts()
        }, 2000)
    }, [])

    return (
        <div className='fixed z-50 top-0 left-0 w-screen h-screen after:content-[""] after:w-screen after:h-screen after:bg-white after:absolute after:top-0 after:left-0 after:opacity-60  grid place-content-center'>
            <OutsideClickHandler
                onOutsideClick={() => setIsSearchModal(false)}
            >
                <div className='w-full h-full grid place-content-center'>
                    <div className="relative z-50 md:w-[600px] w-[370px] bg-white border-2 p-10 rounded-3xl">
                        <Title addClass="text-[40px] text-center">Search</Title>
                        <Input
                            placeholder="Search..."
                            onChange={handleSearch}
                        />
                        {
                            products.length > 0 ?
                                (
                                    <ul className='mt-4'>
                                        {filteredProducts.length > 0 ? (
                                            filteredProducts.map(product => (
                                                <li
                                                    className='flex items-center justify-between p-1 hover:bg-primary transition-all cursor-pointer px-2'
                                                    key={product._id}
                                                    onClick={() => {
                                                        router.push(`/product/${product._id}`)
                                                        setIsSearchModal(false)
                                                    }}
                                                >
                                                    <div className='relative flex'>
                                                        <Image
                                                            src={product.image}
                                                            alt={product.title}
                                                            width={48}
                                                            height={48}
                                                            objectFit='contain'
                                                        />
                                                    </div>
                                                    <span className='font-bold'>{product.title}</span>
                                                    <span className='font-bold'>${product.prices[0]}</span>
                                                </li>
                                            ))
                                        ) : (
                                            <p className='text-center'>
                                                No result found!
                                            </p>
                                        )
                                        }
                                    </ul>
                                )
                                :
                                (
                                    <div className='flex justify-center items-center mt-3'>
                                        <PacmanLoader color="#fca311" size={30} />
                                    </div>
                                )
                        }
                        <button
                            className='absolute top-4 right-4'
                            onClick={() => setIsSearchModal(false)}
                        >
                            <GiCancel size={25} className='transition-all' />
                        </button>
                    </div>
                </div>
            </OutsideClickHandler>
        </div>
    )
}

export default Search