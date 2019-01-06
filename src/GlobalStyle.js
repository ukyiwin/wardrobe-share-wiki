import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body, html {
    margin: 0;
    padding: 0;
    font-family: 'Roboto', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    box-sizing: border-box;
    min-width: 1200px;
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }

  a {
    color: inherit; 
    text-decoration: inherit;
    }
  
  h1, h2, h3, h4, h5, h6 {
    color: ${({ theme }) => theme.color.primary}
  }

  .blockquote {
    border-left: 5px solid #eee;
    font-style: italic;
    margin: 1rem 0;
    padding: 1rem 1.2rem;
  }
  .codeblock {
    background-color: rgba(0, 0, 0, 0.05);
    font-family: ${({ theme }) => theme.font.tertiary};
    padding: 1rem;
    margin: 1rem 0;
  }
`;

export default GlobalStyle;
