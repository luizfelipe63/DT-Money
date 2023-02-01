import * as Dialog from '@radix-ui/react-dialog';
import { ArrowCircleDown, ArrowCircleUp, X } from 'phosphor-react';
import { CloseButton, Content, Overlay, TransactionType, TransactionTypeButton } from './styles';
import * as zod from 'zod' 
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const newTransactionFormSchema = zod.object({
  description: zod.string(),
  price: zod.number(),
  category: zod.string(),
  type: zod.enum(['income', 'outcome'])
})

type TransactionsFormInputs = zod.infer<typeof newTransactionFormSchema>

export function NewTransactionModal(){
  const { register, formState:{isSubmitting}, handleSubmit, control} = useForm<TransactionsFormInputs>({
    resolver:zodResolver(newTransactionFormSchema),
    defaultValues:{
      type: 'income'
    }
  })

  async function handleNewTransactions(data:TransactionsFormInputs){
    await new Promise(resolve => setTimeout(resolve, 2000))
    console.log(data)
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