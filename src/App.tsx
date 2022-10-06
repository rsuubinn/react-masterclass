import styled, { createGlobalStyle, ThemeProvider } from "styled-components";
import Router from "./Router";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { HelmetProvider } from "react-helmet-async";
import { darkTheme, lightTheme } from "./theme";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isDarkAtom } from "./atoms";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400&display=swap');
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, menu, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
main, menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, main, menu, nav, section {
  display: block;
}
/* HTML5 hidden-attribute fix for newer browsers */
*[hidden] {
    display: none;
}
body {
  line-height: 1;
  transition: background-color 0.3s;
}
menu, ol, ul {
  list-style: none;
}
blockquote, q {
  quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
body {
  font-family: 'Source Sans Pro', sans-serif;
  background-color:${(props) => props.theme.bgColor};
  color:${(props) => props.theme.textColor};
  line-height: 1.2;
}
 *{
  box-sizing: border-box;
 }
 a {
  text-decoration: none;
  color: inherit;
 }
`;

const ThemeButton = styled.div`
  box-shadow: rgb(10 10 10 / 30%) 0px 0rem 0.5rem;
  position: fixed;
  top: 15px;
  left: 15px;
  width: 50px;
  height: 50px;
  background-color: ${(props) => props.theme.coinListBgColor};
  color: ${(props) => props.theme.accentColor};
  text-align: center;
  display: flex;
  flex-direction: center;
  align-items: center;
  border-radius: 50px;
  & svg {
    font-size: 30px;
    display: block;
    position: relative;
    left: 50%;
    transform: translate(-50%, 0%);
  }
  &:hover {
    cursor: pointer;
  }
`;

function App() {
  const isDark = useRecoilValue(isDarkAtom);
  const setIsDarkAtom = useSetRecoilState(isDarkAtom);
  const changeTheme = () => setIsDarkAtom((value) => !value);
  return (
    <>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <ThemeButton onClick={changeTheme}>
          {isDark ? <LightModeIcon /> : <DarkModeIcon />}
        </ThemeButton>
        <GlobalStyle />
        <HelmetProvider>
          <Router />
        </HelmetProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </ThemeProvider>
    </>
  );
}

export default App;
