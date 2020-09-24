import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { CSSTransition } from "react-transition-group";
import * as S from "../../styles/Menu";

interface MenuListItem {
  children: React.ReactNode;
  onClick?: () => void;
}

const MenuListItem: React.FC<MenuListItem> = ({ children, onClick }) => {
  return <S.MenuListItem onClick={onClick}>{children}</S.MenuListItem>;
};

type Menu = "all" | "user" | "settings";

const StyledRouterLink = styled(Link)`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  text-decoration: none;
  color: #000;
  width: 100%;
  height: 100%;
`;

const MenuList = () => {
  const [menuState, setMenuState] = useState<Menu>("all");
  return (
    <S.Menu>
      <CSSTransition
        in={menuState === "all"}
        timeout={300}
        classNames="primary"
        unmountOnExit
      >
        <S.MenuList>
          <MenuListItem onClick={() => setMenuState("user")}>User</MenuListItem>
          <MenuListItem onClick={() => setMenuState("settings")}>
            Settings
          </MenuListItem>
          <MenuListItem>
            <StyledRouterLink to="/">Homepage</StyledRouterLink>
          </MenuListItem>
        </S.MenuList>
      </CSSTransition>
      <CSSTransition
        in={menuState === "user"}
        timeout={300}
        classNames="secondary"
        unmountOnExit
      >
        <S.MenuList>
          <MenuListItem onClick={() => setMenuState("all")}>
            Go Back
          </MenuListItem>
          <MenuListItem>
            <a href="http://localhost:5050/auth/logout">Log Out</a>
          </MenuListItem>
        </S.MenuList>
      </CSSTransition>
      <CSSTransition
        in={menuState === "settings"}
        timeout={300}
        classNames="secondary"
        unmountOnExit
      >
        <S.MenuList>
          <MenuListItem onClick={() => setMenuState("all")}>
            Go Back
          </MenuListItem>
          <MenuListItem>Settings</MenuListItem>
        </S.MenuList>
      </CSSTransition>
    </S.Menu>
  );
};
export default MenuList;
