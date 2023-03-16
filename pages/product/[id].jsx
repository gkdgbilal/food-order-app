import Title from "@/components/ui/Title"
import Image from "next/legacy/image"
import { useState } from "react";
import { addProduct } from "@/redux/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const itemsExtra = [
    {
        id: 1,
        name: "Ketchup",
        price: 1,
    },
    {
        id: 2,
        name: "Mayonnaise",
        price: 2,
    },
    {
        id: 3,
        name: "Hot Sauce",
        price: 3,
    },
]

const Index = ({ foodItem }) => {
    const [prices, setPrices] = useState(foodItem?.prices);
    const [price, setPrice] = useState(prices[0]);
    const [size, setSize] = useState(0);
    const [extraItems, setExtraItems] = useState(itemsExtra);
    const [extras, setExtras] = useState([]);

    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const findCart = cart.products.find((item) => item._id === foodItem?._id);

    const handleSize = (index) => {
        const difference = prices[index] - prices[size];
        setSize(index);
        changePrice(difference);
    }

    const changePrice = (difference) => {
        setPrice(price + difference);
    }

    const handleChange = (e, item) => {
        const checked = e.target.checked;

        if (checked) {
            changePrice(item.price);
            setExtras([...extras, item]);
        } else {
            changePrice(-item.price);
            setExtras(extras.filter((extra) => extra.id !== item.id));
        }
    }

    const handleClick = () => {
        dispatch(addProduct({
            ...foodItem,
            price,
            extras,
            quantity: 1,
        }));
    }

    return (
        <div className="flex items-center md:h-[calc(100vh_-_88px)] gap-5 py-20 flex-wrap">
            <div className="relative md:flex-1 md:w-[80%] md:h-[80%] w-[36%] h-[36%] mx-auto">
                <Image
                    src={foodItem?.image}
                    alt={foodItem?.title}
                    layout="fill"
                    objectFit="contain"
                />
            </div>
            <div className="md:flex-1 md:text-start text-center">
                <Title addClass="text-6xl">{foodItem?.title}</Title>
                <span className="text-primary text-2xl font-bold underline underline-offset-1 my-4 inline-block">
                    ${price}
                </span>
                <p className="text-sm my-4 md:pr-24">
                    {foodItem?.description}
                </p>
                <div>
                    <h4 className="text-xl font-bold">Choose the size</h4>
                    {
                        foodItem?.category === "pizza" && (
                            <div className="flex items-center gap-x-20 md:justify-start justify-center">
                                <div
                                    className="relative w-8 h-8 cursor-pointer"
                                    onClick={() => handleSize(0)}
                                >
                                    <Image
                                        src="/images/size.png"
                                        alt="large"
                                        layout="fill"
                                    />
                                    <span className="absolute top-0 -right-6 text-xs bg-primary rounded-full px-[5px] font-medium">Small</span>
                                </div>
                                <div
                                    className="relative w-12 h-12 cursor-pointer"
                                    onClick={() => handleSize(1)}
                                >
                                    <Image
                                        src="/images/size.png"
                                        alt="small"
                                        layout="fill"
                                    />
                                    <span className="absolute top-0 -right-8 text-xs bg-primary rounded-full px-[5px] font-medium">Medium</span>
                                </div>
                                <div
                                    className="relative w-16 h-16 cursor-pointer"
                                    onClick={() => handleSize(2)}
                                >
                                    <Image
                                        src="/images/size.png"
                                        alt="medium"
                                        layout="fill"
                                    />
                                    <span className="absolute top-0 -right-2 text-xs bg-primary rounded-full px-[5px] font-medium">Large</span>
                                </div>
                            </div>
                        )
                    }
                </div>
                <div className="flex gap-x-4 my-6 md:justify-start justify-center">
                    {
                        foodItem?.extraOptions.map((item) => (
                            <label
                                className="flex items-center gap-x-1"
                                key={item._id}
                            >
                                <input
                                    type="checkbox"
                                    className="w-5 h-5 accent-primary"
                                    onChange={(e) => handleChange(e, item)}
                                />
                                <span className="text-sm font-semibold">{item.text}</span>
                            </label>
                        ))
                    }
                </div>
                <button
                    onClick={handleClick}
                    className="btn-primary"
                    disabled={findCart}
                >
                    Add to Cart
                </button>
            </div>
        </div>
    )
}

export const getServerSideProps = async (context) => {
    const { id } = context.params;

    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`)

    return {
        props: {
            foodItem: res.data || [],
        }
    }
}

export default Index