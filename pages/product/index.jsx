import Title from "@/components/ui/Title"
import Image from "next/image"
import { useState } from "react";

const Index = () => {
    const [prices, setPrices] = useState([10, 20, 30]);


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
                    $10
                </span>
                <p className="text-sm my-4 md:pr-24">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus ratione accusamus vero nobis doloremque explicabo corporis tenetur quae maiores similique ipsum, fugit sequi iusto expedita voluptas minus. Exercitationem, voluptate tempora?
                </p>
                <div>
                    <h4 className="text-xl font-bold">Choose the size</h4>
                    <div className="flex items-center gap-x-20 md:justify-start justify-center">
                        <div className="relative w-8 h-8">
                            <Image
                                src="/images/size.png"
                                alt="large"
                                layout="fill"
                            />
                            <span className="absolute top-0 -right-6 text-xs bg-primary rounded-full px-[5px] font-medium">Small</span>
                        </div>
                        <div className="relative w-12 h-12">
                            <Image
                                src="/images/size.png"
                                alt="small"
                                layout="fill"
                            />
                            <span className="absolute top-0 -right-8 text-xs bg-primary rounded-full px-[5px] font-medium">Medium</span>
                        </div>
                        <div className="relative w-16 h-16">
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
                    <label className="flex items-center gap-x-1">
                        <input type="checkbox" className="w-5 h-5 accent-primary" />
                        <span className="text-sm font-semibold">Ketchup</span>
                    </label>
                    <label className="flex items-center gap-x-1">
                        <input type="checkbox" className="w-5 h-5 accent-primary" />
                        <span className="text-sm font-semibold">Mayonnaise</span>
                    </label>
                    <label className="flex items-center gap-x-1">
                        <input type="checkbox" className="w-5 h-5 accent-primary" />
                        <span className="text-sm font-semibold">Hot Sauce</span>
                    </label>
                </div>
                <button className="btn-primary">
                    Add to Cart
                </button>
            </div>
        </div>
    )
}

export default Index