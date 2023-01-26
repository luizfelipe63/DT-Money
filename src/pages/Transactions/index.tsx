import { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { Summary } from "../../components/Summary";
import { SearchForm } from "./Components/SearchForm";
import { PriceHightLight, TransactionsContainer, TransactionsTable } from "./styles";

interface Transaction{
  id: number
  transaction: string
  type: 'income' | 'outcome'
  category: string
  price: string
  createdAt: string
}

export function Transactions(){
  const [transaction, setTransaction] = useState<Transaction[]>([])

  async function loadTransactions(){
    const response = await fetch("http://localhost:3000/transactions")
    const data = await response.json()

    setTransaction(data)
  }

  useEffect(() => {
    loadTransactions()
  }, [])

  return(
    <div>
      <Header/>
      <Summary/>

      <TransactionsContainer>
        <SearchForm/>
        <TransactionsTable>
          <tbody>
            {transaction.map(transaction => {
              return(
                <tr key={transaction.id}>
                  <td width='50%'>{transaction.transaction}</td>
                  <td>
                    <PriceHightLight variant={transaction.type}>
                      {transaction.price}
                    </PriceHightLight>
                  </td>
                  <td>{transaction.category}</td>
                  <td>{transaction.createdAt}</td>
                </tr>
              )
            })}
            
          </tbody>
        </TransactionsTable>
      </TransactionsContainer>
    </div>
  )
  
}