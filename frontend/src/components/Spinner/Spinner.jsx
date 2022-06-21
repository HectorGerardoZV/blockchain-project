


//Style
import style from "./Spinner.module.css"
const Spinner = () => {
    return (
        <div className={style.spinner}>
            <div className={style.double_bounce1}></div>
            <div className={style.double_bounce2}></div>
        </div>
    )
}

export default Spinner