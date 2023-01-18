import { MagnifyingGlass } from "phosphor-react";
import { SearchFormContainer } from "./styles";

export function SearchForm(){
  return(
    <SearchFormContainer>
      <input type="text" placeholder="Busca por transação" />
      <button>
        <MagnifyingGlass size={20} weight='bold'/>
        Buscar
      </button>
    </SearchFormContainer>
  )
}