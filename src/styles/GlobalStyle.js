import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';

const GlobalStyle = createGlobalStyle`
  ${normalize}
    * {
  margin: 0;
  font-family: 'Noto Sans KR', sans-serif;
  box-sizing: border-box;
}

html {
  font-family: 'Noto Sans KR', sans-serif;
}

body {
  font-family: 'Noto Sans KR', sans-serif;
  &::-webkit-scrollbar {
    display: none;
  }
}

h1 {
  margin: 0;
}

a {
  color: inherit;
  text-decoration: none;
}

button:focus,
input:focus,
select:focus,
textarea:focus {
  outline: none;
  box-shadow: none;
}

a,
button {
  cursor: pointer;
}

ul,
ol {
  padding-left: 0;
  list-style: none;
}
`;

export default GlobalStyle;
