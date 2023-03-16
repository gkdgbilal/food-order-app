import Logo from "../ui/Logo"
import { FaUserAlt, FaShoppingCart, FaSearch } from "react-icons/fa"
import { useState } from "react"
import Search from "../ui/Search"
import { GiHamburgerMenu, GiCancel } from 'react-icons/gi'
import { useRouter } from "next/router"
import Link from "next/link"
import { useSelector } from "react-redux"

const Header = () => {
    const [isSearchModal, setIsSearchModal] = useState(false)
    const [isMenuModal, setIsMenuModal] = useState(false)
    const cart = useSelector((state) => state.cart)


    const router = useRouter()

    return (
        <div className={`h-[5.5rem] z-40 relative w-full bg-secondary ${router.asPath === "/" ? "bg-transparent" : "bg-secondary !fixed"}`}>
            <div className="container mx-auto text-white flex justify-between items-center h-full">
                <Logo />
                <nav className={`sm:static absolute top-0 left-0 sm:flex hidden sm:w-auto w-full sm:h-auto h-screen sm:text-white text-black sm:bg-transparent bg-white z-50 ${isMenuModal === true && "!grid place-content-center"}`}>
                    <ul className="flex gap-x-2 sm:flex-row flex-col">
                        <li
                            className={`px-[5px] py-[10px] uppercase hover:text-primary ${router.asPath === "/" && "text-primary"}`}
                            onClick={() => setIsMenuModal(false)}
                        >
                            <Link href="/">Home</Link>
                        </li>
                        <li
                            className={`px-[5px] py-[10px] uppercase hover:text-primary ${router.asPath === "/menu" && "text-primary"}`}
                            onClick={() => setIsMenuModal(false)}
                        >
                            <Link href="/menu">Menu</Link>
                        </li>
                        <li
                            className={`px-[5px] py-[10px] uppercase hover:text-primary ${router.asPath === "/about" && "text-primary"}`}
                            onClick={() => setIsMenuModal(false)}
                        >
                            <Link href="/about">About</Link>
                        </li>
                        <li
                            className={`px-[5px] py-[10px] uppercase hover:text-primary ${router.asPath === "/reservation" && "text-primary"}`}
                            onClick={() => setIsMenuModal(false)}
                        >
                            <Link href="/reservation">Book Table</Link>
                        </li>
                    </ul>
                    {
                        isMenuModal && (
                            <button
                                className='absolute top-4 right-4 z-50'
                                onClick={() => setIsMenuModal(false)}
                            >
                                <GiCancel size={25} className='transition-all' />
                            </button>
                        )
                    }
                </nav>
                <div className="flex gap-x-4 items-center">
                    <Link href="/auth/login">
                        <FaUserAlt
                            className={`hover:text-primary transition-all ${(router.asPath.includes("profile") || router.asPath.includes("auth")) && "text-primary"}`}
                            size={18}
                        />
                    </Link>
                    <Link href="/cart">
                        <span className="relative">
                            <FaShoppingCart
                                className={`hover:text-primary transition-all ${router.asPath === "/cart" && "text-primary"}`}
                                size={18}
                            />
                            <span className="px-[5px] text-[10px] grid place-content-center bg-primary rounded-full absolute -top-2 -right-3 text-black font-bold">
                                {cart.products.length === 0 ? "0" : cart.products.length}
                            </span>
                        </span>
                    </Link>
                    <button
                        onClick={() => setIsSearchModal(true)}
                    >
                        <FaSearch
                            className="hover:text-primary transition-all"
                            size={18}
                        />
                    </button>
                    <a href="/" className="md:inline-block hidden">
                        <button className="btn-primary" >Order Online</button>
                    </a>
                    <button
                        className="sm:hidden inline-block"
                        onClick={() => setIsMenuModal(true)}
                    >
                        <GiHamburgerMenu className="text-xl hover:text-primary transition-all" />
                    </button>
                </div>
            </div>
            {
                isSearchModal && (
                    <Search setIsSearchModal={setIsSearchModal} />
                )
            }
        </div>
    )
}

export default Header