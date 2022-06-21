
//Components
import Wallet from "../../components/Wallet/Wallet"
import FormSender from "../../components/FormSender/FormSender"
import Separator from "../../components/Separator/Separator"
import Transactions from "../../components/Transactions/Transactions"
import { ToastContainer } from "react-toastify"

//Style
import style from "./MainPage.module.css"
import "react-toastify/dist/ReactToastify.css"
const MainPage = () => {
    return (
        <>
            <main>
                <h2 className={style.title}>Send your transactions </h2>
                <section className={style.topSection}>
                    <Wallet />
                    <FormSender />
                </section>
                <Separator />
                <Transactions />
            </main>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </>

    )
}

export default MainPage