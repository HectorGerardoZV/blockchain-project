import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

//Pages
import Layout from "../pages/Layout"
import ConnectWallet from "../pages/ConnectWallet/ConnectWallet"
import MainPage from "../pages/MainPage/MainPage"


const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout />} >
                    <Route index element={<ConnectWallet />} />
                    <Route path="mainpage" element={<MainPage />} />
                </Route>
            </Routes>
        </Router>
    )
}

export default AppRouter