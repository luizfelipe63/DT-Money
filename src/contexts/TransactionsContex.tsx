import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../lib/axios";

interface Transaction{
  id: number
  description: string
  type: 'income' | 'outcome'
  category: string
  price: number
  createdAt: string
}

interface CreateTransactionsInput{
  description:string
  category: string
  price:number
  type: 'income' | 'outcome'
}

interface TransactionsContextType{
  transactions: Transaction[]
  fetchTransactions: (query:string) =>  Promise<void>
  createTransactions: (data: CreateTransactionsInput) => Promise<void>
}

export const TransactionsContext = createContext({} as TransactionsContextType)

interface TransactionsProviderProps{
  children: ReactNode
}

export function TransactionProvider({children}: TransactionsProviderProps ){
  const [transactions, setTransactions] = useState<Transaction[]>([])

  async function fetchTransactions(query?:string){
    const response = await api.get('/transactions',{
      params: {
        _sort: 'createdAt',
        _order: 'desc',
        q : query
      }
    })

    setTransactions(response.data)
  }
  
  async function createTransactions(data: CreateTransactionsInput){
    const {category,description,price,type} = data

    const reponse = await api.post('transactions', {
      description,
      price,
      type,
      category,
      createdAt: new Date()
    })

    setTransactions(state => [reponse.data, ...state])

  }

  useEffect(() => {
    fetchTransactions()
  }, [])

  return(
    <TransactionsContext.Provider value={{transactions, fetchTransactions,createTransactions}}>
      {children}
    </TransactionsContext.Provider>
  )
}