import { useNavigate } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import TransactionContext from "../../context/TransactionContext"

//Components
import Separator from "../../components/Separator/Separator"
import Spinner from "../../components/Spinner/Spinner"

//Style
import style from "./ConnectWallet.module.css"
const ConnectWallet = () => {
  const { connectWallet, account } = useContext(TransactionContext);
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate();


  const handleOnClickNavigate = async () => {
    setIsLoading(true);
    try {
      const connected = await connectWallet();
      if (connected) {
        navigate("mainpage")
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (account) {
      navigate("mainpage")
    }
  }, [])




  return (
    <div className={style.connectWallet}>
      {
        isLoading
          ? (<Spinner />)
          : (<button className={style.connectWallet__button}
            onClick={handleOnClickNavigate}
          >
            Connect Wallet
          </button>
          )
      }
      <Separator />

      <h1 className={style.connectWallet__slogan}>If you want to see the latest transactions
        <br /> connect your wallet</h1>
    </div>
  )
}

export default ConnectWallet