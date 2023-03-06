import { newPasswordSchema } from '@/schema/newPassword'
import axios from 'axios'
import { useFormik } from 'formik'
import React from 'react'
import Input from '../form/Input'
import Title from '../ui/Title'

const Password = ({ user }) => {
    const onSubmit = async (values, actions) => {
        try {
            const res = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/users/${user._id}`, values)
            actions.resetForm()
        } catch (error) {
            console.log(error)
        }
    }

    const { values, errors, touched, handleSubmit, handleChange, handleBlur } = useFormik({
        enableReinitialize: true,
        initialValues: {
            password: "",
            confirmPassword: "",
        },
        onSubmit,
        validationSchema: newPasswordSchema
    })

    const input = [
        {
            id: 1,
            name: "password",
            type: "password",
            placeholder: "Your Password",
            value: values.password,
            errorMessage: errors.password,
            touched: touched.password
        },
        {
            id: 2,
            name: "confirmPassword",
            type: "password",
            placeholder: "Your Confirm Password",
            value: values.confirmPassword,
            errorMessage: errors.confirmPassword,
            touched: touched.confirmPassword,
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
            <button
                className="btn-primary mt-4"
                type='submit'
            >
                Update
            </button>
        </form>
    )
}

export default Password