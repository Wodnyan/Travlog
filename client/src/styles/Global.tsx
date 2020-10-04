import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');
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
    /* overflow-y: hidden; */
  }
  body {
    font-family: 'Roboto', sans-serif;
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
export const FullHeightCenter = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
export const Title = styled.h1``;
export const ErrorMessage = styled.p`
  font-size: 1.2rem;
  color: red;
`;

interface AbsoluteContainerProps {
  top?: number;
  bottom?: number;
  right?: number;
  left?: number;
}

export const AbsoluteContainer = styled.div<AbsoluteContainerProps>`
  position: absolute;
  top: ${(props) => props.top + "px" || 0};
  bottom: ${(props) => props.bottom + "px" || 0};
  right: ${(props) => props.right + "px" || 0};
  left: ${(props) => props.left + "px" || 0};
`;
