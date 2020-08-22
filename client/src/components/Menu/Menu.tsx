import React, { useState } from "react";
import styled from "styled-components";
import { CSSTransition } from "react-transition-group";
import Burger from "../Burger/Burger";
import MenuList from "./MenuList";

const Container = styled.div`
  position: relative;
`
const BottomRight = styled.div`
  position: absolute;
  bottom: -10px;
  right: -10px;
  z-index: 100;
`


const Menu = () => {
  const [open, setOpen] = useState(true);
  return (
    <Container>
      <BottomRight>
        <Burger open={open} onClick={() => setOpen((prev) => !prev)}/>
      </BottomRight>
      <CSSTransition
        in={open}
        timeout={500}
        classNames="menu-expand"
        unmountOnExit
      >
        <MenuList />
      </CSSTransition>
    </Container>
  )
}

export default Menu;