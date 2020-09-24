import React, { useState } from "react";
import { AbsoluteContainer } from "../../styles/Global";
import styled from "styled-components";
import { CSSTransition } from "react-transition-group";
import Burger from "../Burger/Burger";
import MenuList from "./MenuList";

const Container = styled.div`
  position: relative;
`;

const Menu = () => {
  const [open, setOpen] = useState(true);
  return (
    <Container>
      <AbsoluteContainer style={{ zIndex: 50000 }} top={0} right={0}>
        <Burger open={open} onClick={() => setOpen((prev) => !prev)} />
      </AbsoluteContainer>
      <CSSTransition
        in={open}
        timeout={200}
        classNames="menu-anim"
        unmountOnExit
      >
        <MenuList />
      </CSSTransition>
    </Container>
  );
};

export default Menu;
