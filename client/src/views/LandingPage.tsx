import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Carousel from "../components/Carousel/Carousel";

const Hero = styled.main`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50%;
  z-index: 100;
`;
const HeroTextContainer = styled.div`
  text-align: center;
  color: #fff;
`;
const Title = styled.h1`
  font-size: 3rem;
`;
const Nav = styled.nav`
  position: absolute;
  width: 80%;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: flex-end;
  background: #fff;
  z-index: 10000;
  ul {
    list-style: none;
    display: flex;
    padding: 1rem;
    li {
      margin-right: 1rem;
      button {
        cursor: pointer;
      }
    }
  }
`;

const LandingPage = () => {
  return (
    <>
      <Nav>
        <ul>
          <li>
            <Link to="/auth/sign-up">Sign Up</Link>
          </li>
          <li>
            <Link to="/auth/login">Login</Link>
          </li>
        </ul>
      </Nav>
      <Hero>
        <HeroTextContainer>
          <Title>SportsMaker</Title>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ad magni
            excepturi ipsum maiores, necessitatibus totam commodi expedita
            dignissimos, dolorum earum, cupiditate ut. Tempora distinctio nisi,
            expedita eligendi ea nesciunt est?
          </p>
        </HeroTextContainer>
      </Hero>
      <Carousel />
    </>
  );
};
export default LandingPage;
