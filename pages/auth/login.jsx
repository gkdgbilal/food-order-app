import { useFormik } from "formik"
import Input from '@/components/form/Input'
import Title from '@/components/ui/Title'
import { loginSchema } from "@/schema/login"
import Link from "next/link"
import { signIn, getSession } from "next-auth/react"
import { useRouter } from "next/router"

const Login = () => {
    const { push } = useRouter()

    const onSubmit = async (values, actions) => {
        const { email, password } = values;
        let options = {
            redirect: false,
            email,
            password
        }
        try {
            const res = await signIn("credentials", options)
            actions.resetForm()
            push("/profile/64008fe156d54616d7f3b3a3")
        } catch (error) {
            console.log(error)
        }
    }

    const { values, errors, touched, handleSubmit, handleChange, handleBlur } = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        onSubmit,
        validationSchema: loginSchema
    })

    const input = [
        {
            id: 1,
            name: "email",
            type: "email",
            placeholder: "Your Email Address",
            value: values.email,
            errorMessage: errors.email,
            touched: touched.email,
        },
        {
            id: 2,
            name: "password",
            type: "password",
            placeholder: "Your Password",
            value: values.password,
            errorMessage: errors.password,
            touched: touched.password,
        }
    ]

    return (
        <div className='container mx-auto'>
            <form
                className='flex flex-col items-center my-20 md:w-1/2 w-full mx-auto'
                onSubmit={handleSubmit}
            >
                <Title addClass="text-[40px] mb-6">
                    Login
                </Title>
                <div className='flex flex-col gap-y-3 w-full'>
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
                <div className="flex flex-col w-full gap-y-3 mt-6">
                    <button className="btn-primary" type="submit">
                        Login
                    </button>
                    <button
                        className="btn-primary !bg-secondary"
                        type="button"
                        onClick={() => signIn("github")}
                    >
                        <i className="fa-brands fa-github mr-2 text-lg" />
                        GITHUB
                    </button>
                    <Link href="/auth/register">
                        <span className="text-sm underline cursor-pointer text-secondary">Do you no have an account?</span>
                    </Link>
                </div>
            </form>
        </div>
    )
}

export async function getServerSideProps({ req }) {
    const session = await getSession({ req })

    if (session) {
        return {
            redirect: {
                destination: "/profile/64008fe156d54616d7f3b3a3",
                permanent: false
            }
        }
    }

    return {
        props: {
            session
        }
    }
}

export default Login