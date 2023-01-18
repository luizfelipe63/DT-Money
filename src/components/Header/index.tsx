import { HeaderContainer, HeaderContent, NewTransactionsButton } from "./styles";
import Logo from '../../assets/Logo-dtmoney.svg'
import * as Dialog from '@radix-ui/react-dialog';


export function Header() {
  return(
    <HeaderContainer>
      <HeaderContent>
        <img src={Logo} alt="" />
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <NewTransactionsButton>Nova Transação</NewTransactionsButton>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay />
            <Dialog.Content>
              <Dialog.Title>
                Nova Transação
              </Dialog.Title>
              <Dialog.Close />
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
        
      </HeaderContent>
    </HeaderContainer>
  )
}