import styled from "styled-components";

export const Form = styled.form`
  // height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export const Input = styled.input`
  width: 300px;
  padding: 0.7rem 0rem 0.7rem 0.5rem;
  margin: 1rem 0;
  font-size: 1.2rem;
  border: none;
  background: transparent;
  border: 2px solid blue;
  border-radius: 5px;
`;
export const Label = styled.label`
  position: relative;
  .label__text {
    position: absolute;
    bottom: 50%;
    left: 10px;
    transform: translateY(50%);
    transition: transform 0.15s ease;
    z-index: 100000;
    background: grey;
    cursor: text;
  }
  & > input:focus + div {
    transform: translateY(-75%) scale(0.9);
  }
  & > input:not(:placeholder-shown) + div {
    transform: translateY(-75%) scale(0.9);
  }
`;
