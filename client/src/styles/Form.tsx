import styled from "styled-components";

export const Form = styled.form`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export const Input = styled.input`
  width: 300px;
  padding: 0.7rem 0 0.7rem 0.3rem;
  margin: 1rem 0;
  font-size: 1.2rem;
  border: none;
`;
export const Label = styled.label`
  position: relative;
  .label__text {
    position: absolute;
    bottom: 50%;
    left: 10px;
    transform: translateY(50%);
    transition: transform 0.2s ease;
  }
  & > input:focus + div {
    transform: translateY(-135%) scale(1.2);
  }
  & > input:not(:placeholder-shown) + div {
    transform: translateY(-135%) scale(1.2);
  }
`;
