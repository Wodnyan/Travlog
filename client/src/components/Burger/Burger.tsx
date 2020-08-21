import React, { useState } from 'react'
import styled from "styled-components";

const BurgerContainer = styled.div`
  margin: 1rem;
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background: black;
  cursor: pointer;
`
const BurgerLines = styled.div`
  position: relative;
  width: 30px;
  height: 5px;
  border-radius: 10px;
  background: white;
  &::after,
  &::before {
    content: "";
    position: absolute;
    height: 5px;
    width: 30px;
    border-radius: 10px;
    background-color: #fff;
    transition: .2s ease transform;
  }
  &::after {
    transform: translateY(-16px);
  }
  &::before {
    transform: translateY(16px);
  }
  &.retard {
    background-color: transparent;
    &::before {
      transform: rotate(45deg);
    }
    &::after {
      transform: rotate(-45deg);
    }
  }

`

const Burger = () => {
  const [open, setOpen] = useState(false);
  return (
    <BurgerContainer onClick={() => setOpen(prev => !prev)}>
      <BurgerLines className={open ? "retard" : ""} />
    </BurgerContainer>
  )
}
export default Burger;
