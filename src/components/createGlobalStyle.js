import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
  }
  @media (max-width: 576px) {
    .ant-picker-panel-container {
      overflow: auto;
      width: 100vw;
    }  
  }
`;

export default GlobalStyle;