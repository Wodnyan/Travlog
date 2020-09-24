import styled from "styled-components";

export const MenuList = styled.ul`
  position: relative;
  border-radius: 10px;
  background: blue;
  list-style: none;

  &.primary-enter {
    transform: translateX(-110%);
  }
  &.primary-enter-active {
    transform: translateX(0);
    transition: transform 0.3s ease;
  }
  &.primary-exit {
    transform: translateX(0);
    position: absolute;
  }
  &.primary-exit-active {
    transform: translateX(-110%);
    transition: transform 0.3s ease;
  }

  &.secondary-enter {
    transform: translateX(110%);
  }
  &.secondary-enter-active {
    transform: translateX(0);
    transition: transform 0.3s ease;
  }
  &.secondary-exit {
    transform: translateX(0);
    position: absolute;
  }
  &.secondary-exit-active {
    // position: absolute;
    transform: translateX(100%);
    transition: transform 0.3s ease;
  }
`;
export const MenuListItem = styled.li`
  width: 350px;
  height: 70px;
  display: flex;
  padding-left: 1rem;
  justify-content: flex-start;
  align-items: center;
  cursor: pointer;
  border-radius: 1px;
  a {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    text-decoration: none;
    color: #000;
    width: 100%;
    height: 100%;
  }
  &:first-child {
    border-radius: 10px 10px 0 0;
  }
  &:last-child {
    border-radius: 0 0 10px 10px;
  }
  &:hover {
    background: red;
  }
`;
export const Menu = styled.div`
  position: relative;
  overflow: hidden;
  background: red;
  border-radius: 10px;
  transition: transform 0.5s ease;
  transform-origin: right top;

  &.menu-anim-enter {
    transform: scale(0);
  }
  &.menu-anim-enter-active {
    transform: scale(1);
  }
  &.menu-anim-exit {
    transform: scale(1);
  }
  &.menu-anim-exit-active {
    transform: scale(0);
  }
`;
