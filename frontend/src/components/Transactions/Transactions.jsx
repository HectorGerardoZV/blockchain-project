import { useContext } from "react"

//Context
import TransactionContext from "../../context/TransactionContext"

//Components
import TransactionCard from "../TransactionCard/TransactionCard"
import Spinner from "../Spinner/Spinner"

import style from "./Transactions.module.css"
const Transactions = () => {
    const { transactions, isLoadingTransactions, transactionCounter } = useContext(TransactionContext);

    return (

        <>
            {isLoadingTransactions
                ? (
                    <div className={style.spinnerTransacitons__area}>
                        <Spinner />
                    </div>
                )
                : (
                    <section className={style.transactions}>
                        <h2 className={style.title}>Latest Transactions</h2>
                        <h3 className={style.title}>Total transactions: {transactionCounter}</h3>
                        <div className={style.transactions__area}>
                            {
                                transactions.reverse().map((transaction, i) => {
                                    if (i == 0) {
                                        return <TransactionCard
                                            latest={true}
                                            key={i}
                                            {...transaction}
                                        />
                                    } else {
                                        return <TransactionCard
                                            latest={false}
                                            key={i}
                                            {...transaction}
                                        />
                                    }
                                })
                            }
                        </div>
                    </section>

                )
            }

        </>

    )
}

export default Transactions