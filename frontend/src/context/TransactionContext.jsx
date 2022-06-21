//0x21142E3c86b61dc15bF18b8c3BD18A5aE3E87C34 = 2
//0x9Cc1339e6a8c8576f1441B28E86834687690db25 = 1

import { createContext, useState, useEffect, useCallback } from "react"
import { ethers } from "ethers"
import { contractABI, contractAddress } from "../utilities/constants"
import { toast } from "react-toastify"

const TransactionContext = createContext();
const { ethereum } = window;

const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const transactionContract = new ethers.Contract(contractAddress, contractABI, signer);
    return transactionContract;
}
const initialStateAccount = localStorage.getItem("account") ? JSON.parse(localStorage.getItem("account")) : null;
const initialStateIsLoading = false;
const initialStateIsLoadingTransactions = false;
const initialStateTransactionForm = { to: "", amount: "", topic: "", message: "" };



const TransactionProvider = ({ children }) => {

    const [account, setAccount] = useState(initialStateAccount);
    const [isLoading, setIsLoading] = useState(initialStateIsLoading);
    const [isLoadingTransactions, setIsLoadingTransactions] = useState(initialStateIsLoadingTransactions);
    const [transactionCounter, setTransactionCounter] = useState(0);
    const [transactionForm, setTransactionFrom] = useState(initialStateTransactionForm);
    const [transactions, setTransactions] = useState([])

    const handleOnChangeForm = (e) => {
        const { name, value } = e.target;
        setTransactionFrom({ ...transactionForm, [name]: value })

    }

    const handleOnSubmitForm = async (e) => {
        e.preventDefault();

        const { amount, message, to, topic } = transactionForm;
        if (!amount.trim() || !message.trim() || !to.trim() || !topic.trim()) {
            openToast(2)
        } else {
            await sendTransaction()
        }

    }

    const connectWallet = async () => {
        try {
            if (!ethereum) return openToast(3)
            const accounts = await ethereum.request({ method: "eth_requestAccounts" });
            setAccount(accounts[0]);
            localStorage.setItem("account", JSON.stringify(accounts[0]));
            return true;
        } catch (error) {
            return false;
        }
    }

    const checkIfWalletIsConnected = async () => {
        try {
            if (!ethereum) return openToast(3)

            const accounts = await ethereum.request({ method: "eth_accounts" });
            if (accounts.length > 0) {
                setCurrentAccount(accounts[0]);
            } else {
                connectWallet();
            }
        } catch (error) {

        }
    }

    const sendTransaction = async () => {
        try {
            if (!ethereum) return openToast(3);
            const { amount, message, to, topic } = transactionForm;
            const transactionContract = getEthereumContract();
            const parsedAmount = ethers.utils.parseEther(amount);
            await ethereum.request({
                method: "eth_sendTransaction",
                params: [{
                    from: account,
                    to,
                    gas: "0x5208",
                    value: parsedAmount._hex
                }]
            })

            const transactionHash = await transactionContract.addToBlockchain(to, parsedAmount, message, topic);
            setIsLoading(true);

            const success = await transactionHash.wait();
            const result = await success.events[0].getTransactionReceipt(account);
            openToast(result.status);
            queryAllTransactions(result.status);

            setIsLoading(false);

        } catch (error) {
            console.log("This is the error brother");
            console.log(error);
        }
    }

    const queryAllTransactions = async (status = 1) => {
        if (status == 1) {
            try {
                const transactionContract = getEthereumContract();
                setIsLoadingTransactions(true);
                const response = await transactionContract.getAllTransactions();

                const transactionsMaped = response.map(transaction => {
                    const { from, to, message, topic } = transaction;
                    return {
                        from,
                        to,
                        amount: parseInt(transaction.amount._hex) / (10 ** 18),
                        message,
                        topic,
                        timestamp: new Date(transaction.timestamp.toNumber() * 1000).toLocaleString()
                    }
                })
                setTransactions(transactionsMaped.reverse());
                setTimeout(async () => {
                    setIsLoadingTransactions(false)
                    await queryTransactionCounter();
                }, 1000);
            } catch (error) {
                openToast(3)
            }
        }
    }

    const queryTransactionCounter = async () => {
        try {
            const transactionContract = getEthereumContract();
            let count = await transactionContract.getTransactionCounter();
            count = parseInt(count._hex);
            setTransactionCounter(count)
        } catch (error) {

        }
    }

    const openToast = (status) => {
        const config = {
            position: status == 2 ? "top-right" : "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            className: "transaction-success"
        }

        if (status == 1) {
            toast.success('successful transaction', config);
            setTransactionFrom(initialStateTransactionForm);
        } else if (status == 0) {
            toast.error('The transaction could not be completed', config);
        } else if (status == 2) {
            toast.error('All inputs are required', config);
        } else if (status == 3) {
            toast.error('Please install metamask', config);
        }
    }

    useEffect(() => {
        checkIfWalletIsConnected();
        queryAllTransactions();
        queryTransactionCounter();
    }, [])


    return (
        <TransactionContext.Provider
            value={{
                transactions,
                account,
                transactionForm,
                isLoading,
                isLoadingTransactions,
                transactionCounter,
                connectWallet,
                handleOnChangeForm,
                handleOnSubmitForm
            }}
        >
            {children}
        </TransactionContext.Provider>
    )
}


export { TransactionProvider }
export default TransactionContext