import React from "react";
import { createGlobalStyle } from "styled-components";
import Map from "./components/Map/Map";

function App() {
  const GlobalStyle = createGlobalStyle`
    *,
    *::after,
    *::before {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    html,
    body,
    #root{
      height: 100%;
    }
  `;
  return (
    <>
      <GlobalStyle />
      <Map />
    </>
  );
}

export default App;
