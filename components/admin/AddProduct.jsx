import axios from 'axios'
import React, { useState } from 'react'
import { GiCancel } from 'react-icons/gi'
import OutsideClickHandler from 'react-outside-click-handler'
import Title from '../ui/Title'

const AddProduct = ({ setIsProductModal }) => {
    const [file, setFile] = useState()
    const [imageSrc, setImageSrc] = useState()

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
            const uploadResponse = await axios.post("https://api.cloudinary.com/v1_1/https://api.cloudinary.com/v1_1/demo/image/upload/image/upload", data)
        } catch (error) {
            console.log(error)
        }
    }

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
                                    onChange={(e) => onChangeHandler(e)}
                                    className='hidden'
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
                            />
                        </div>
                        <div className='flex flex-col text-sm mt-4'>
                            <span className='font-semibold mb-[2px]'>Description</span>
                            <textarea
                                type="text"
                                placeholder='Write a description..'
                                className='border border-gray-300 p-2 rounded-md focus:outline-none focus:border-primary'
                            />
                        </div>
                        <div className='flex flex-col text-sm mt-4'>
                            <span className='font-semibold mb-[2px]'>Select Category</span>
                            <select
                                type="text"
                                placeholder='Write a description..'
                                className='border border-gray-300 p-2 rounded-md focus:outline-none focus:border-primary'
                            >
                                <option value="1">Category 1</option>
                                <option value="2">Category 2</option>
                                <option value="3">Category 3</option>
                            </select>
                        </div>
                        <div className='flex flex-col text-sm mt-4'>
                            <span className='font-semibold mb-[2px]'>Prices</span>
                            <div className='flex justify-between gap-4 md:flex-nowrap flex-wrap'>
                                <input
                                    type="number"
                                    placeholder='small'
                                    className='border-b-2 border-gray-300 p-1 focus:outline-none focus:border-primary w-1/2'
                                />
                                <input
                                    type="number"
                                    placeholder='medium'
                                    className='border-b-2 border-gray-300 p-1 focus:outline-none focus:border-primary w-1/2'
                                />
                                <input
                                    type="number"
                                    placeholder='large'
                                    className='border-b-2 border-gray-300 p-1 focus:outline-none focus:border-primary w-1/2'
                                />
                            </div>
                        </div>
                        <div className='flex flex-col text-sm mt-4'>
                            <span className='font-semibold mb-[2px]'>Extras</span>
                            <div className='flex gap-4 md:flex-nowrap flex-wrap '>
                                <input
                                    type="text"
                                    placeholder='item'
                                    className='border-b-2 border-gray-300 p-1 focus:outline-none focus:border-primary w-1/2'
                                />
                                <input
                                    type="number"
                                    placeholder='price'
                                    className='border-b-2 border-gray-300 p-1 focus:outline-none focus:border-primary w-1/2'
                                />
                                <button className='btn-primary'>Add</button>
                            </div>
                            <div className='mt-2'>
                                <span className='inline-block border border-orange-500 p-1 rounded-xl text-xs text-orange-500'>ketchup</span>
                            </div>
                        </div>
                        <div className='flex justify-end'>
                            <button
                                className='btn-primary !bg-success'
                                onClick={handleCreate}
                            >Create</button>
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