import Footer from "@/components/layout/Footer"
import Header from "@/components/layout/Header"
import { Fragment } from "react"

const Layout = ({ children }) => {
    return (
        <Fragment>
            <Header />
            <main>
                {children}
            </main>
            <Footer />
        </Fragment>
    )
}

export default Layout