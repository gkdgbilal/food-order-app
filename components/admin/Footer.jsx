import React, { useState } from 'react'
import Input from '../form/Input'
import Title from '../ui/Title'
import { useFormik } from "formik"
import { footerSchema } from '@/schema/footer'

const Footer = () => {
    const [linkAddress, setLinkAddress] = useState("")
    const [iconName, setIconName] = useState("")
    const [icons, setIcons] = useState(["fa-brands fa-facebook-f", "fa-brands fa-twitter", "fa-brands fa-linkedin"])

    const onSubmit = async (values, actions) => {
        await new Promise((resolve) => setTimeout(resolve, 4000))
        actions.resetForm()
    }

    const { values, errors, touched, handleSubmit, handleChange, handleBlur } = useFormik({
        initialValues: {
            location: "",
            email: "",
            phoneNumber: "",
            description: "",
            day: "",
            time: "",
        },
        onSubmit,
        validationSchema: footerSchema
    })

    const input = [
        {
            id: 1,
            name: "location",
            type: "text",
            placeholder: "Your Location",
            value: values.location,
            errorMessage: errors.location,
            touched: touched.location
        },
        {
            id: 2,
            name: "phoneNumber",
            type: "number",
            placeholder: "Your Phone Number",
            value: values.phoneNumber,
            errorMessage: errors.phoneNumber,
            touched: touched.phoneNumber,
        },
        {
            id: 3,
            name: "email",
            type: "email",
            placeholder: "Your Email Address",
            value: values.email,
            errorMessage: errors.email,
            touched: touched.email,
        },
        {
            id: 4,
            name: "description",
            type: "text",
            placeholder: "Your Description",
            value: values.description,
            errorMessage: errors.description,
            touched: touched.description,
        },
        {
            id: 5,
            name: "day",
            type: "text",
            placeholder: "Update Day",
            value: values.day,
            errorMessage: errors.day,
            touched: touched.day,
        },
        {
            id: 6,
            name: "time",
            type: "text",
            placeholder: "Update Time",
            value: values.time,
            errorMessage: errors.time,
            touched: touched.time,
        }
    ]

    return (
        <form
            className='lg:p-8 flex-1 lg:mt-0 mt-5'
            onSubmit={handleSubmit}
        >
            <Title addClass="text-[40px]">
                Account Settings
            </Title>
            <div className='grid lg:grid-cols-2 grid-cols-1 gap-4 mt-4'>
                {
                    input.map((item) => (
                        <Input
                            key={item.id}
                            {...item}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                    ))
                }
            </div>
            <div className='mt-4 flex justify-between md:items-center md:flex-row flex-col gap-4'>
                <div className='flex items-center gap-4'>
                    <Input
                        value="https://"
                        placeholder="Link Address"
                        onChange={(e) => setLinkAddress(e.target.value)}
                    />
                    <Input
                        placeholder="Icon Name"
                        onChange={(e) => setIconName(e.target.value)}
                        value={iconName}
                    />
                    <button
                        className="btn-primary"
                        type='button'
                        onClick={() => iconName && setIcons([...icons, `${iconName}`])}
                    >
                        Add
                    </button>
                </div>
                <ul className='flex items-center gap-4'>
                    {
                        icons.map((icon, index) => (
                            <li key={index}>
                                <i className={`${icon} text-2xl`}></i>
                                <button
                                    className='text-danger'
                                    onClick={
                                        () => setIcons((prev) => prev.filter((ic) => ic !== icon))
                                    }
                                >
                                    <i className="fa-solid fa-trash text-xl ml-2" />
                                </button>
                            </li>
                        ))
                    }
                </ul>
            </div>
            <button
                className="btn-primary mt-4"
                type='submit'
            >
                Update
            </button>
        </form>
    )
}

export default Footer