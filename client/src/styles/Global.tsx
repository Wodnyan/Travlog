import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
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
    background: grey;
  }
`;
export const SplitInTwoVertical = styled.div`
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-content: center;
`;

export const ImageContainer = styled.div`
  height: 100%;
  width: 100%;
  overflow: hidden;
  img {
    object-fit: fill;
  }
`;
