import { useContext } from "react"
import TransactionContext from "../../context/TransactionContext"

//Images
import Ether from "../../images/ether.svg"

//Style
import style from "./Wallet.module.css"
const Wallet = () => {
    const {account} = useContext(TransactionContext);


    return (
        <div className={style.wallet}>
            <div className={style.wallet__header}>
                <img src={Ether} alt="ethereum logo" />
                <p>Your wallet</p>
            </div>

            <div className={style.wallet__info}>
                <p className={style.wallet__info_title}>Address</p>
                <p className={`${style.wallet__info_address} address-med`}>{account}</p>
            </div>
        </div>
    )
}

export default Wallet