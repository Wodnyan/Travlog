import styled from "styled-components";

export const MenuList = styled.ul`
  position: relative;
  border-radius: 26px;
  background: blue;
  list-style: none;

  &.primary-enter {
    transform: translateX(-110%);
  }
  &.primary-enter-active {
    transform: translateX(0);
    transition: transform .3s ease;
  }
  &.primary-exit {
    transform: translateX(0);
    position: absolute;
  }
  &.primary-exit-active {
    transform: translateX(-110%);
    transition: transform .3s ease;
  }

  &.secondary-enter {
    transform: translateX(110%);
  }
  &.secondary-enter-active {
    transform: translateX(0);
    transition: transform .3s ease;
  }
  &.secondary-exit {
    transform: translateX(0);
    position: absolute;
  }
  &.secondary-exit-active {
    // position: absolute;
    transform: translateX(100%);
    transition: transform .3s ease;
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
export const Menu = styled.div`
  position: relative;
  overflow: hidden;
  background: red;
  border-radius: 26px;
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