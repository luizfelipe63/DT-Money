import * as Dialog from '@radix-ui/react-dialog';
import { ArrowCircleDown, ArrowCircleUp, X } from 'phosphor-react';
import { CloseButton, Content, Overlay, TransactionType, TransactionTypeButton } from './styles';
import * as zod from 'zod' 
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { api } from '../../lib/axios';
import { useContext } from 'react';
import { TransactionsContext } from '../../contexts/TransactionsContex';

const newTransactionFormSchema = zod.object({
  description: zod.string(),
  price: zod.number(),
  category: zod.string(),
  type: zod.enum(['income', 'outcome'])
})

type TransactionsFormInputs = zod.infer<typeof newTransactionFormSchema>

export function NewTransactionModal(){
  const { register, formState:{isSubmitting}, handleSubmit, control, reset} = useForm<TransactionsFormInputs>({
    resolver:zodResolver(newTransactionFormSchema),
    defaultValues:{
      type: 'income'
    }
  })

  const {createTransactions} = useContext(TransactionsContext)

  async function handleNewTransactions(data:TransactionsFormInputs){
    const {category,description,price,type} = data
    await createTransactions({
      category,
      description,
      price,
      type
    })
    
    reset()
  }

  return(
    <Dialog.Portal>
    <Overlay/>
    <Content>
      <Dialog.Title>
        Nova Transação
      </Dialog.Title>
      <CloseButton>
        <X size={24}/>
      </CloseButton>
      <form action="" onSubmit={handleSubmit(handleNewTransactions)}>
        <input type="text" placeholder='Descrição' {...register('description')}/>
        <input type="number" placeholder='Preço' {...register('price', {valueAsNumber: true})} />
        <input type="text" placeholder='Categoria' {...register('category')}/>

        <Controller
          control={control}
          name="type"
          render={({field}) => {
            return(
              <TransactionType onValueChange={field.onChange} value={field.value}>
                <TransactionTypeButton variant='income' value='income'>
                  <ArrowCircleUp size={24}/>
                  Entrada
                </TransactionTypeButton>
                <TransactionTypeButton variant='outcome' value='outcome'>
                  <ArrowCircleDown size={24}/>
                  Saída
                </TransactionTypeButton>
              </TransactionType>
            )
          }}
        />
        <button type='submit' disabled={isSubmitting}>Cadastrar</button>
      </form>
    </Content>
  </Dialog.Portal>
  )
}