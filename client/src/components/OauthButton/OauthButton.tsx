import React from "react";
import styled from "styled-components";
import * as S from "../../styles/Button";

interface Props {
  children: React.ReactNode;
  icon: string;
  href: string;
  iconBackground?: string;
  onClick?: () => void;
}

interface IconContainerProps {
  background: string;
}

const Button = styled(S.Button)`
  align-items: center;
  justify-content: flex-start;
  margin: 5px 0;
  padding: 0;
  display: flex;
  border: none;
  background: #fff;
  color: #000;
  width: 200px;
  &:active {
    background: #c4c4c4;
  }
  .text {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    height: 100%;
    color: currentColor;
    text-decoration: none;
  }
`;

const IconContainer = styled.span<IconContainerProps>`
  margin-right: 0.7rem;
  background: ${(props) => props.background};
  padding: 0.5rem;
  border-radius: 7px 0px 0px 7px;
  img {
    display: block;
  }
`;

const OauthButton: React.FC<Props> = ({
  children,
  icon,
  href,
  iconBackground,
  onClick,
}) => {
  return (
    <Button onClick={onClick}>
      {icon && (
        <IconContainer background={iconBackground || "red"}>
          <img src={icon} alt="oauth icon" />
        </IconContainer>
      )}
      <a href={href} className="text">
        {children}
      </a>
    </Button>
  );
};

export default OauthButton;
