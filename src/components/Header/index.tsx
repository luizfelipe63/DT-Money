import { HeaderContainer, HeaderContent, NewTransactionsButton } from "./styles";
import Logo from '../../assets/Logo-dtmoney.svg'
import * as Dialog from '@radix-ui/react-dialog';
import { NewTransactionModal } from "../NewTransactionsModal";


export function Header() {
  return(
    <HeaderContainer>
      <HeaderContent>
        <img src={Logo} alt="" />
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <NewTransactionsButton>Nova Transação</NewTransactionsButton>
          </Dialog.Trigger>
          <NewTransactionModal/>
        </Dialog.Root>
        
      </HeaderContent>
    </HeaderContainer>
  )
}