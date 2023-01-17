import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  *{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  :focus{
    outline: 0;
    box-shadow: 0 0 2px ${props => props.theme['green-500']};
  }

  body{
    background: ${props => props.theme['gray-800']};
  }

  body, input, textarea, button {
    font: 400 1rem Roboto, sans-serif;
  }

`