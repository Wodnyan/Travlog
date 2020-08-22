import styled from "styled-components";

export const MenuList = styled.ul`
  border-radius: 26px;
  background: blue;
  list-style: none;
  transition: transform .5s ease;
  transform-origin: right bottom;
  &.menu-expand-enter {
    transform: scale(0);
  }
  &.menu-expand-enter-active {
    transform: scale(1);
  }
  &.menu-expand-exit {
    transform: scale(1);
  }
  &.menu-expand-exit-active {
    transform: scale(0);
  }
`
export const MenuListItem = styled.li`
  width: 350px;
  height: 100px;
  cursor: pointer;
  border-radius: 1px;
  &:first-child {
    border-radius: 26px 26px 0 0;
  }
  &:last-child {
    border-radius: 0 0 26px 26px;
  }
  &:hover {
    background: red;
  }

`