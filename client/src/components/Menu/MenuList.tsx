import React, { useState } from "react"
import { CSSTransition } from "react-transition-group";
import * as S from "../../styles/Menu";

interface MenuListItem {
  children: React.ReactNode;
  onClick?: () => void;
}

const MenuListItem: React.FC<MenuListItem> = ({ children, onClick }) => {
  return (
    <S.MenuListItem onClick={onClick}>{children}</S.MenuListItem>
  )
}

const MenuList = () => {
  const [menuState, setMenuState] = useState("all");
  return (
    <S.Menu>
      <CSSTransition
        in={menuState === "all"}
        timeout={300}
        classNames="primary"
        unmountOnExit
      >
        <S.MenuList>
          <MenuListItem>Hello world</MenuListItem>
          <MenuListItem>Hello world</MenuListItem>
          <MenuListItem onClick={() => setMenuState("settings")}>Settings</MenuListItem>
        </S.MenuList>
      </CSSTransition>
      <CSSTransition
        in={menuState === "settings"}
        timeout={300}
        classNames="secondary"
        unmountOnExit
      >
        <S.MenuList>
          <MenuListItem onClick={() => setMenuState("all")}>Go Back</MenuListItem>
          <MenuListItem>Hello world</MenuListItem>
        </S.MenuList>
      </CSSTransition>
    </S.Menu>
  )
}
export default MenuList
