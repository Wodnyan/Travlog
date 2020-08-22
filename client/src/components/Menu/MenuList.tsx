import React from "react"
import * as S from "../../styles/Menu";

interface MenuListItem {
  children: React.ReactNode;
  onClick: () => void;
}

const MenuListItem: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <S.MenuListItem>{children}</S.MenuListItem>
  )
}

const MenuList = () => {
  return (
    <S.MenuList>
      <MenuListItem>Hello world</MenuListItem>
      <MenuListItem>Hello world</MenuListItem>
      <MenuListItem>Settings</MenuListItem>
    </S.MenuList>
  )
}
export default MenuList
