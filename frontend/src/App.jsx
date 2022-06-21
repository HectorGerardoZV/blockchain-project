//Router
import AppRouter from "./routes/AppRouter"

//Context
import { TransactionProvider } from "./context/TransactionContext"

function App() {

  return (
    <TransactionProvider>
      <AppRouter />
    </TransactionProvider>
  )
}

export default App
