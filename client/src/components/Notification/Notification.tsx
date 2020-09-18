import React from "react";
import { removeNotification } from "../../redux/actions";
import { connect, useDispatch } from "react-redux";
//@ts-ignore
import closeSVG from "./x-circle.svg";
import * as S from "../../styles/Notification";
import styled from "styled-components";

interface Props {
  children: React.ReactNode;
  id: number;
  type?: "warning" | "error";
}

const Button = styled.button`
  order: 2;
  border: none;
  outline: none;
  background: transparent;
  cursor: pointer;
  img {
    display: block;
  }
`;

const Notification: React.FC<Props> = ({ children, id, type }) => {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(removeNotification(id));
  };
  return (
    <S.Notification type={type}>
      <Button onClick={handleClick}>
        <img src={closeSVG} alt="close button" />
      </Button>
      {children}
    </S.Notification>
  );
};
export default connect(null, {
  removeNotification,
})(Notification);
