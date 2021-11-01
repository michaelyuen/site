import { useState, useEffect } from "react";
import Head from "next/head";
import styled, { ThemeProvider } from "styled-components";
import { ColorModeButton, Header } from "../components";
import GlobalStyle from "../styles/GlobalStyle";
import baseTheme from "../styles/theme";

const LayoutContainer = styled.main`
  padding: ${({ theme }) => theme.space[4]}px;
  margin: 0 auto;
  max-width: ${({ theme }) => theme.sizes.maxWidth};
  -webkit-overflow-scrolling: touch;

  > * {
    h1 span {
      font-family: "Pacifico";
      display: inline-block;
      padding-right: 5px;
    }
  }
`;

const modes = ["light", "dark", "gray", "rose", "chocolate", "teal"];
const getTheme = (mode) => ({
  ...baseTheme,
  colors: baseTheme.colors.modes[mode] || baseTheme.colors,
});

export default function App({ Component, pageProps }) {
  const [mode, setMode] = useState(modes[0]);
  useEffect(() => {
    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    if (mql.matches) {
      return setMode("dark");
    } else {
      return setMode("light");
    }
  }, []);

  const setNextMode = () => {
    let nextModeIndex = modes.indexOf(mode) + 1;
    if (nextModeIndex >= modes.length) {
      nextModeIndex = 0;
    }
    setMode(modes[nextModeIndex]);
  };
  const theme = getTheme(mode);

  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>Michael Yuen&apos;s Personal Website</title>
        <meta
          name="description"
          content="👋🏻 I'm Michael but some people call me my. I love to create order. I am a 👨🏻‍🌾 human bean and software engineer."
        />
      </Head>
      <GlobalStyle />
      <ColorModeButton mode={mode} setMode={setNextMode} />
      <Header />
      <LayoutContainer>
        <Component {...pageProps} />
      </LayoutContainer>
    </ThemeProvider>
  );
}
