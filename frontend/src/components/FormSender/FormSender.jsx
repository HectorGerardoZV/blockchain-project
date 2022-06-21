import { useContext, memo } from "react"
//Context
import TransactionContext from "../../context/TransactionContext"


//Components
import Spinner from "../Spinner/Spinner"

//Style
import style from "./FormSender.module.css"

const FormSender = () => {
  const { handleOnChangeForm, handleOnSubmitForm, isLoading, transactionForm } = useContext(TransactionContext);
  const { to, amount, topic, message } = transactionForm;

  return (
    <form className={style.form}
      onSubmit={handleOnSubmitForm}
    >
      <fieldset className={style.fields}>
        <h3 className={style.form__title}>Make a transaction</h3>
        <div className={style.form__field}>
          <label htmlFor="to">To</label>
          <input type="text" id="to" name="to" placeholder="Address to send..."
            value={to}
            onChange={handleOnChangeForm}
          />
        </div>
        <div className={style.form__field}>
          <label htmlFor="amount">Amount</label>
          <input type="number" id="amount" name="amount" placeholder="amount..."
            value={amount}
            onChange={handleOnChangeForm}
          />
        </div>
        <div className={style.form__field}>
          <label htmlFor="topic">Topic</label>
          <input type="text" id="topic" name="topic" placeholder="topic..."
            value={topic}
            onChange={handleOnChangeForm}
          />
        </div>
        <div className={style.form__field}>
          <label htmlFor="message">Message</label>
          <textarea name="message" id="message" placeholder="message..."
            value={message}
            onChange={handleOnChangeForm}
          >

          </textarea>
        </div>
      </fieldset>
      <div className={style.form__button}>

        {
          isLoading
            ? (<Spinner />)
            : (<button className={style.button}>Send Transaction</button>)
        }

      </div>
    </form>
  )
}
export default FormSender