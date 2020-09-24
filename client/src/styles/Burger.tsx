import styled from "styled-components";

export const BurgerContainer = styled.div`
  margin: 1rem;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background: black;
  cursor: pointer;
`;
export const BurgerLines = styled.div`
  --burger-line-width: 23px;
  --burger-line-height: 3px;
  position: relative;
  width: var(--burger-line-width);
  height: var(--burger-line-height);
  border-radius: 10px;
  background: white;
  &::after,
  &::before {
    content: "";
    position: absolute;
    width: var(--burger-line-width);
    height: var(--burger-line-height);
    border-radius: 10px;
    background-color: #fff;
    transition: 0.2s ease transform;
  }
  &::after {
    transform: translateY(-10px);
  }
  &::before {
    transform: translateY(10px);
  }
  &.burger-anim {
    background-color: transparent;
    &::before {
      transform: rotate(45deg);
    }
    &::after {
      transform: rotate(-45deg);
    }
  }
`;
