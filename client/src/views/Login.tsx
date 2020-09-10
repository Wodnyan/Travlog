import React, { useReducer, useState } from "react";
import { Redirect } from "react-router-dom";
import { inputReducer } from "../reducers";
import {
  TextInput,
  PasswordInput,
  FloatingLabel,
} from "../components/Input/Input";
import { Button } from "../styles/Button";
import { Form } from "../styles/Form";
import { SplitInTwoVertical, ImageContainer } from "../styles/Global";
//@ts-ignore
import EarthImage from "../images/world-min.jpg";
import styled from "styled-components";

const inputInitArgs = {
  username: "",
  password: "",
};

const OAuthContainer = styled.div``;

const FullHeightCenter = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ErrorMessage = styled.p`
  font-size: 1.2rem;
  color: red;
`;

const Login = () => {
  const [input, inputDispatch] = useReducer(inputReducer, inputInitArgs);
  const [redirect, setRedirect] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const ENDPOINT = "http://localhost:5050/auth/local";
    const fetchOptions: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        username: input.username,
        password: input.password,
      }),
    };
    try {
      const login = await fetch(ENDPOINT, fetchOptions);
      const resp = await login.json();
      if (!login.ok) {
        inputDispatch({
          type: "error",
          payload: resp.message,
        });
      } else {
        setRedirect(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (redirect) return <Redirect to="/map" />;
  return (
    <SplitInTwoVertical>
      <ImageContainer>
        <img src={EarthImage} alt="earth" />
      </ImageContainer>
      <FullHeightCenter>
        <Form onSubmit={handleSubmit}>
          <FloatingLabel label="username">
            <TextInput
              name="username"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                inputDispatch({
                  type: "field",
                  fieldName: e.target.name,
                  fieldValue: e.target.value,
                })
              }
              value={input.username}
            />
          </FloatingLabel>
          <FloatingLabel label="password">
            <PasswordInput
              name="password"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                inputDispatch({
                  type: "field",
                  fieldName: e.target.name,
                  fieldValue: e.target.value,
                })
              }
              value={input.password}
            />
          </FloatingLabel>
          <Button type="submit">Login</Button>
          {input.error && <ErrorMessage>{input.error}</ErrorMessage>}
        </Form>
        <p>Or login with...</p>
        <OAuthContainer>
          <a href="http://localhost:5050/auth/github">Github</a>
          <a href="http://localhost:5050/auth/facebook">Facebook</a>
        </OAuthContainer>
      </FullHeightCenter>
    </SplitInTwoVertical>
  );
};

export default Login;
