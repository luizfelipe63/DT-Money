import { createContext, ReactNode, useEffect, useState } from "react";

interface Transaction{
  id: number
  transaction: string
  type: 'income' | 'outcome'
  category: string
  price: number
  createdAt: string
}

interface TransactionsContextType{
  transactions: Transaction[]
}

export const TransactionsContext = createContext({} as TransactionsContextType)

interface TransactionsProviderProps{
  children: ReactNode
}

export function TransactionProvider({children}: TransactionsProviderProps ){
  const [transactions, setTransactions] = useState<Transaction[]>([])

  async function loadTransactions(){
    const response = await fetch("http://localhost:3000/transactions")
    const data = await response.json()

    setTransactions(data)
  }

  useEffect(() => {
    loadTransactions()
  }, [])

  return(
    <TransactionsContext.Provider value={{transactions}}>
      {children}
    </TransactionsContext.Provider>
  )
}