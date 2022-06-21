import { Outlet } from "react-router-dom"

//Components
import Header from "../components/Header/Header"
import Footer from "../components/Footer/Footer"

//Style
import style from "./Layout.module.css"
const Layout = () => {
    return (
        <section className={style.layout__container}>
            <Header />
            <Outlet />
            <Footer />
        </section>
    )
}

export default Layout