import React, { useReducer, useState } from "react";
import { useHistory } from "react-router-dom";
import { inputReducer } from "../reducers";
import {
  TextInput,
  PasswordInput,
  FloatingLabel,
} from "../components/Input/Input";
import { Button } from "../styles/Button";
import { Form } from "../styles/Form";
import { FullHeightCenter, Title, ErrorMessage } from "../styles/Global";
import { SplitInTwoVertical, ImageContainer } from "../styles/Global";
//@ts-ignore
import EarthImage from "../images/world-min.jpg";
import styled from "styled-components";

const inputInitArgs = {
  username: "",
  password: "",
};

const OAuthContainer = styled.div``;

const SignUp = () => {
  const [input, inputDispatch] = useReducer(inputReducer, inputInitArgs);
  const history = useHistory();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const ENDPOINT = "http://localhost:5050/auth/local/register";
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
      const signUp = await fetch(ENDPOINT, fetchOptions);
      const resp = await signUp.json();
      if (!signUp.ok) {
        inputDispatch({
          type: "error",
          payload: resp.message,
        });
      } else {
        history.push("/map");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SplitInTwoVertical>
      <FullHeightCenter>
        <Form onSubmit={handleSubmit}>
          <Title>Sign Up!</Title>
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
          <Button type="submit">Sign Up!</Button>
          {input.error && <ErrorMessage>{input.error}</ErrorMessage>}
        </Form>
        <p>Or login with...</p>
        <OAuthContainer>
          <a href="http://localhost:5050/auth/github">Github</a>
          <a href="http://localhost:5050/auth/facebook">Facebook</a>
        </OAuthContainer>
      </FullHeightCenter>
      <ImageContainer>
        <img src={EarthImage} alt="earth" />
      </ImageContainer>
    </SplitInTwoVertical>
  );
};

export default SignUp;
