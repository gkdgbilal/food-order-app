import axios from 'axios'
import { useEffect, useState } from 'react'
import Input from '../form/Input'
import Title from '../ui/Title'

const Category = () => {
    const [categories, setCategories] = useState([])
    const [inputText, setInputText] = useState("")

    const getCategories = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/categories`)
            setCategories(response.data.data)
        } catch (error) {
            console.log(error)
        }
    }

    const handleCreateCategory = async () => {
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/categories`, {
                title: inputText
            })
            setCategories([...categories, response.data.data])
            setInputText("")
        } catch (error) {
            console.log(error)
        }
    }

    const handleDeleteCategory = async (id) => {
        try {
            if (confirm("Are you sure to delete this category?")) {
                await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/categories/${id}`)
                setCategories(categories.filter((cat) => cat._id !== id))
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getCategories()
    }, [])

    return (
        <div className='lg:p-8 flex-1 lg:mt-0 mt-5'>
            <Title addClass="text-[40px]">Category</Title>
            <div className='mt-5'>
                <div className='flex gap-4 flex-1 items-center'>
                    <Input
                        placeholder="Add a New Category..."
                        onChange={(e) => setInputText(e.target.value)}
                        value={inputText}
                    />
                    <button
                        className="btn-primary"
                        onClick={handleCreateCategory}
                    >
                        Add
                    </button>
                </div>
                <div className='mt-10 max-h-[250px] overflow-auto pb-4'>
                    {
                        categories && categories.map((category) => (
                            <div
                                className='flex justify-between my-2'
                                key={category._id}
                            >
                                <b className='text-xl'>{category.title}</b>
                                <button
                                    className="btn-primary !bg-danger"
                                    onClick={() => handleDeleteCategory(category._id)}
                                >
                                    Delete
                                </button>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Category