import React from "react";
import styled from "styled-components";

interface Props {
  title: string;
  description: string;
}

const EntryCardContainer = styled.div`
  cursor: default;
  z-index: 4124124124;
`;

const EntryCard: React.FC<Props> = ({ title, description }) => {
  return (
    <EntryCardContainer>
      <h1>{title}</h1>
      <p>{description}</p>
    </EntryCardContainer>
  );
};
export default EntryCard;
