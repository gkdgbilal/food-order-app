import { useFormik } from "formik"
import Input from "./form/Input"
import Title from "./ui/Title"

const Reservation = () => {
    const onSubmit = async (values, actions) => {
        await new Promise((resolve) => setTimeout(resolve, 4000))
        actions.resetForm()
    }

    const { values, handleSubmit, handleChange } = useFormik({
        initialValues: {
            fullName: "",
            phoneNumber: "",
            email: "",
            persons: "",
            date: "",
        },
        onSubmit,
    })

    const input = [
        {
            id: 1,
            name: "fullName",
            type: "text",
            placeholder: "Your Full Name",
            value: values.fullName,
        },
        {
            id: 2,
            name: "phoneNumber",
            type: "number",
            placeholder: "Your Phone Number",
            value: values.phoneNumber,
        },
        {
            id: 3,
            name: "email",
            type: "email",
            placeholder: "Your Email Address",
            value: values.email,
        },
        {
            id: 4,
            name: "persons",
            type: "number",
            placeholder: "How Many Persons?",
            value: values.persons,
        },
        {
            id: 5,
            name: "date",
            type: "datetime-local",
            value: values.date,
        }
    ]

    return (
        <div className="container mx-auto py-12">
            <Title addClass="text-[40px] mb-10">Book A Table</Title>
            <div className="flex justify-between gap-10 flex-wrap-reverse">
                <form
                    className="lg:flex-1 w-full"
                    onSubmit={handleSubmit}
                >
                    <div className="flex flex-col gap-y-3">
                        {
                            input.map((item) => (
                                <Input
                                    key={item.id}
                                    {...item}
                                    onChange={handleChange}
                                />
                            ))
                        }
                    </div>
                    <button
                        className="btn-primary mt-4"
                        type="submit"
                    >
                        BOOK NOW
                    </button>
                </form>
                <div className="lg:flex-1 w-full">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d770796.9609535023!2d28.45176126881065!3d41.00500097701756!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14caa7040068086b%3A0xe1ccfe98bc01b0d0!2zxLBzdGFuYnVs!5e0!3m2!1str!2str!4v1676637703354!5m2!1str!2str"
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="w-full h-full"
                    />
                </div>
            </div>
        </div>
    )
}

export default Reservation