import PropTypes from "prop-types"

//Components
import Separator from "../Separator/Separator"
import { CopyToClipboard } from "react-copy-to-clipboard"

//Images
import Etheres from "../../images/ether.svg"

//style
import style from "./TransactionCard.module.css"
const TransactionCard = ({ to, from, amount, topic, message, timestamp, latest }) => {
    const handleOnClickCopyText = (e) => {
        e.clipboardData.setDate("data", "Hello")
    }
    return (
        <div className={latest ? style.latestTransaction : style.transactionCard}>
            <CopyToClipboard text={from}>
                <p id={"select"} className={`address-med`} onClick={handleOnClickCopyText} ><span className={style.important}>From</span>: {from}</p>
            </CopyToClipboard>
            <CopyToClipboard text={to}>
                <p id={"select"} className={`address-med`}><span className={style.important}>To</span>: {to}</p>
            </CopyToClipboard>
            <Separator colorLine={"two"} margin={"no"} total={"yes"} />
            <div className={style.amount__area}>
                <p><span className={style.important}>Amount</span> : {amount} </p>
                <img src={Etheres} alt="" />
            </div>
            <Separator colorLine={"two"} margin={"no"} total={"yes"} />
            <p><span className={style.important}>Topic</span>: {topic}</p>
            <p><span className={style.important}>Message</span>: {message}</p>
            <p><span className={style.important}>Date</span>:{timestamp} </p>
        </div>
    )
}

TransactionCard.propTypes = {
    to: PropTypes.string.isRequired,
    from: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
    topic: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
}

export default TransactionCard