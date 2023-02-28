import Title from "@/components/ui/Title"
import Image from "next/image"
import { useState } from "react";
import { addProduct } from "@/redux/cartSlice";
import { useDispatch, useSelector } from "react-redux";

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

const foodItems = [
    {
        id: 1,
        name: "Pizza",
        price: 10,
        desc: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptas dolore quod aspernatur architecto odit similique non iure? Dignissimos nam ab, at, ipsum natus ipsam architecto, id odio tenetur ut quo!",
        extraOptions: [
            {
                id: 1,
                name: "Ketchup",
                price: 1,
            }
        ],
    }
]

const Index = () => {
    const [prices, setPrices] = useState([10, 20, 30]);
    const [price, setPrice] = useState(prices[0]);
    const [size, setSize] = useState(0);
    const [extraItems, setExtraItems] = useState(itemsExtra);
    const [extras, setExtras] = useState([]);

    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();

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
            ...foodItems[0],
            price,
            extras,
            quantity: 1,
        }));
    }

    return (
        <div className="flex items-center md:h-[calc(100vh_-_88px)] gap-5 py-20 flex-wrap">
            <div className="relative md:flex-1 md:w-[80%] md:h-[80%] w-[36%] h-[36%] mx-auto">
                <Image
                    src="/images/f1.png"
                    alt=""
                    layout="fill"
                    objectFit="contain"
                />
            </div>
            <div className="md:flex-1 md:text-start text-center">
                <Title addClass="text-6xl">Good Pizza</Title>
                <span className="text-primary text-2xl font-bold underline underline-offset-1 my-4 inline-block">
                    ${price}
                </span>
                <p className="text-sm my-4 md:pr-24">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus ratione accusamus vero nobis doloremque explicabo corporis tenetur quae maiores similique ipsum, fugit sequi iusto expedita voluptas minus. Exercitationem, voluptate tempora?
                </p>
                <div>
                    <h4 className="text-xl font-bold">Choose the size</h4>
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
                </div>
                <div className="flex gap-x-4 my-6 md:justify-start justify-center">
                    {
                        extraItems.map((item) => (
                            <label className="flex items-center gap-x-1" key={item.id}>
                                <input
                                    type="checkbox"
                                    className="w-5 h-5 accent-primary"
                                    onChange={(e) => handleChange(e, item)}
                                />
                                <span className="text-sm font-semibold">{item.name}</span>
                            </label>
                        ))
                    }
                </div>
                <button
                    onClick={handleClick}
                    className="btn-primary"
                >
                    Add to Cart
                </button>
            </div>
        </div>
    )
}

export default Index