import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { GiCancel } from 'react-icons/gi'
import OutsideClickHandler from 'react-outside-click-handler'
import { toast } from 'react-toastify'
import Title from '../ui/Title'

const AddProduct = ({ setIsProductModal }) => {
    const [file, setFile] = useState()
    const [imageSrc, setImageSrc] = useState()

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState('pizza')
    const [prices, setPrices] = useState([])
    const [extras, setExtras] = useState("")
    const [extraOptions, setExtraOptions] = useState([])
    const [categories, setCategories] = useState([])

    const getCategories = async () => {
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/categories`)

            if (res.status === 200) {
                setCategories(res.data.data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getCategories()
    }, [])

    const onChangeHandler = (e) => {
        const reader = new FileReader()

        reader.onload = (onLoadEvent) => {
            setImageSrc(onLoadEvent.target.result)
            setFile(e.target.files[0])
        }

        reader.readAsDataURL(e.target.files[0])
    }

    const handleCreate = async () => {
        const data = new FormData()
        data.append('file', file)
        data.append('upload_preset', 'food-ordering')

        try {
            const uploadRes = await axios.post(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/image/upload`, data)

            const { url } = uploadRes.data

            const newProduct = {
                image: url,
                title,
                description,
                category: category.toLowerCase(),
                prices,
                extraOptions,
            }

            const res = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/products`,
                newProduct
            )

            if (res.status === 201) {
                setIsProductModal(false)
                toast.success('Product Created Successfully!')
            }

        } catch (error) {
            console.log(error)
        }
    }

    const handleAddExtras = (e) => {
        if (extras) {
            if (extras.text && extras.price) {
                setExtraOptions((prev) => [...prev, extras])
                setExtras("")
            }
        }
    }

    const changePrice = (e, index) => {
        const currentPrices = prices;
        currentPrices[index] = e.target.value;
        setPrices(currentPrices);
    };

    return (
        <div className='fixed z-50 top-0 left-0 w-screen h-screen after:content-[""] after:w-screen after:h-screen after:bg-white after:absolute after:top-0 after:left-0 after:opacity-60  grid place-content-center'>
            <OutsideClickHandler
                onOutsideClick={() => setIsProductModal(false)}
            >
                <div className='w-full h-full grid place-content-center'>
                    <div className="relative z-50 md:w-[600px] w-[370px] bg-white border-2 p-10 rounded-3xl">
                        <Title addClass="text-[40px] text-center">Add a New Product</Title>
                        <div className='flex flex-col text-sm mt-6'>
                            <label className='flex gap-2 items-center'>
                                <input
                                    type="file"
                                    onChange={onChangeHandler}
                                    className='hidden'
                                    accept='image/*'
                                />
                                <button className="btn-primary !rounded-none !bg-blue-600 pointer-events-none">Choose an Image</button>
                                {
                                    imageSrc && (
                                        <img
                                            src={imageSrc}
                                            alt=""
                                            className='w-12 h-12 object-cover mt-2'
                                        />
                                    )
                                }
                            </label>
                        </div>
                        <div className='flex flex-col text-sm mt-4'>
                            <span className='font-semibold mb-[2px]'>Title</span>
                            <input
                                type="text"
                                placeholder='Write a title..'
                                className='border border-gray-300 p-2 rounded-md focus:outline-none focus:border-primary'
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                        <div className='flex flex-col text-sm mt-4'>
                            <span className='font-semibold mb-[2px]'>Description</span>
                            <textarea
                                type="text"
                                placeholder='Write a description..'
                                className='border border-gray-300 p-2 rounded-md focus:outline-none focus:border-primary'
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                        <div className='flex flex-col text-sm mt-4'>
                            <span className='font-semibold mb-[2px]'>Select Category</span>
                            <select
                                type="text"
                                placeholder='Write a description..'
                                className='border border-gray-300 p-2 rounded-md focus:outline-none focus:border-primary'
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                {
                                    categories.length > 0 && categories.map((category) => (
                                        <option
                                            value={category.title.toLowerCase()}
                                            key={category._id}
                                        >
                                            {category.title}
                                        </option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className='flex flex-col text-sm mt-4'>
                            <span className='font-semibold mb-[2px]'>Prices</span>
                            {category === "pizza" ? (
                                <div className="flex justify-between gap-6 w-full md:flex-nowrap flex-wrap">
                                    <input
                                        type="number"
                                        className="border-b-2 p-1 pl-0 text-sm px-1 outline-none w-36"
                                        placeholder="small"
                                        onChange={(e) => changePrice(e, 0)}
                                    />
                                    <input
                                        type="number"
                                        className="border-b-2 p-1 pl-0 text-sm px-1 outline-none w-36"
                                        placeholder="medium"
                                        onChange={(e) => changePrice(e, 1)}
                                    />
                                    <input
                                        type="number"
                                        className="border-b-2 p-1 pl-0 text-sm px-1 outline-none w-36"
                                        placeholder="large"
                                        onChange={(e) => changePrice(e, 2)}
                                    />
                                </div>
                            ) : (
                                <div className="flex justify-between gap-6 w-full md:flex-nowrap flex-wrap">
                                    <input
                                        type="number"
                                        className="border-b-2 p-1 pl-0 text-sm px-1 outline-none w-36"
                                        placeholder="small"
                                        onChange={(e) => changePrice(e, 0)}
                                    />
                                </div>
                            )}
                        </div>
                        <div className='flex flex-col text-sm mt-4'>
                            <span className='font-semibold mb-[2px]'>Extras</span>
                            <div className='flex gap-4 md:flex-nowrap flex-wrap '>
                                <input
                                    type="text"
                                    placeholder='item'
                                    className='border-b-2 border-gray-300 p-1 focus:outline-none focus:border-primary w-1/2'
                                    name='text'
                                    onChange={(e) => setExtras({ ...extras, [e.target.name]: e.target.value })}
                                />
                                <input
                                    type="number"
                                    placeholder='price'
                                    className='border-b-2 border-gray-300 p-1 focus:outline-none focus:border-primary w-1/2'
                                    name='price'
                                    onChange={(e) => setExtras({ ...extras, [e.target.name]: e.target.value })}
                                />
                                <button
                                    className='btn-primary'
                                    onClick={handleAddExtras}
                                >Add</button>
                            </div>
                            <div className='mt-2 flex gap-2'>
                                {
                                    extraOptions.map((item, index) => (
                                        <span
                                            className='inline-block border border-orange-500 p-1 rounded-xl text-xs text-orange-500 cursor-pointer'
                                            key={index}
                                            onClick={() => setExtraOptions(extraOptions.filter((_, i) => i !== index))}
                                        >
                                            {item.text}
                                        </span>
                                    ))
                                }
                            </div>
                        </div>
                        <div className='flex justify-end'>
                            <button
                                className='btn-primary !bg-success'
                                onClick={handleCreate}
                            >
                                Create
                            </button>
                        </div>
                        <button
                            className='absolute top-4 right-4'
                            onClick={() => setIsProductModal(false)}
                        >
                            <GiCancel size={25} className='transition-all' />
                        </button>
                    </div>
                </div>
            </OutsideClickHandler>
        </div>
    )
}

export default AddProduct