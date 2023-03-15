import axios from 'axios'
import { useEffect, useState } from 'react'
import Title from '../ui/Title'

const Footer = () => {
    const [footerData, setFooterData] = useState([])


    const getFooter = async () => {
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/footer`)
            setFooterData(res.data.data[0])
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getFooter()
    }, [])

    return (
        <div className='bg-secondary text-white'>
            <div className='container mx-auto pt-16 pb-6'>
                <div className='flex md:justify-between justify-center text-center flex-wrap md:gap-y-0 gap-y-6'>
                    <div className='md:flex-1'>
                        <Title addClass="text-[30px]">
                            Contact Us
                        </Title>
                        <div className='flex flex-col gap-y-2 mt-3'>
                            <div>
                                <a
                                    href={footerData?.location}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <i className="fa-solid fa-location-dot"></i>
                                    <span className='inline-block ml-2'>Location</span>
                                </a>
                            </div>
                            <div>
                                <a href={`tel:${footerData?.phoneNumber}`}>
                                    <i className="fa-solid fa-phone"></i>
                                    <span className='inline-block ml-2'>Call +90{footerData?.phoneNumber}</span>
                                </a>
                            </div>
                            <div>
                                <a href={`mailto:${footerData?.email}`}>
                                    <i className="fa fa-envelope"></i>
                                    <span className='inline-block ml-2'>{footerData?.email}</span>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className='md:flex-1'>
                        <Title addClass="text-[38px]">
                            Feane
                        </Title>
                        <p className='mt-3'>
                            {footerData?.description}
                        </p>
                        <div className='flex items-center justify-center mt-5 gap-x-2'>
                            {
                                footerData?.socialMedia && footerData?.socialMedia.map((item) => (
                                    <a
                                        href={item.link}
                                        className='w-8 h-8 grid place-content-center bg-white text-secondary rounded-full hover:text-primary hover:scale-110 transition-all duration-300'
                                        key={item._id}
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        <i className={item.icon}></i>
                                    </a>
                                ))
                            }
                        </div>
                    </div>
                    <div className='md:flex-1'>
                        <Title addClass="text-[30px]">
                            Opening Hours
                        </Title>
                        <div className='flex flex-col gap-y-2 mt-3'>
                            <div>
                                <span className='inline-block ml-2'>{footerData?.openingHours?.day}</span>
                            </div>
                            <div>
                                <span className='inline-block ml-2'>{footerData?.openingHours?.hour}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <p className="text-center mt-10">
                    © 2022 All Rights Reserved By Free Html Templates
                </p>
            </div>
        </div>
    )
}

export default Footer