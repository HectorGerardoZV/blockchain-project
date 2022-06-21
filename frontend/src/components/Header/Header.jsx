

//Images
import MetaMask from "../../images/metamask.svg"

//Style
import style from "./Header.module.css";
const Header = () => {
    return (
        <div className={style.header}>
            <img className={style.header__img} src={MetaMask} alt="logo metamask" />
        </div>
    )
}

export default Header