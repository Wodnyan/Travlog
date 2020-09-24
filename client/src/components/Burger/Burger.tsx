import React from "react";
import { BurgerContainer, BurgerLines } from "../../styles/Burger";

interface Burger {
  open: boolean;
  onClick: () => void;
}

const Burger: React.FC<Burger> = ({ open, onClick }) => {
  return (
    <BurgerContainer onClick={onClick}>
      <BurgerLines className={open ? "burger-anim" : ""} />
    </BurgerContainer>
  );
};
export default Burger;
