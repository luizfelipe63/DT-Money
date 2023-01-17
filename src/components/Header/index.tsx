import { HeaderContainer, HeaderContent, NewTransactionsButton } from "./styles";
import Logo from '../../assets/Logo-dtmoney.svg'


export function Header() {
  return(
    <HeaderContainer>
      <HeaderContent>
        <img src={Logo} alt="" />
        <NewTransactionsButton>Nova Transação</NewTransactionsButton>
      </HeaderContent>
    </HeaderContainer>
  )
}