import React, { useReducer } from "react";
import { useHistory } from "react-router-dom";
import { inputReducer } from "../reducers";
import {
  TextInput,
  PasswordInput,
  FloatingLabel,
} from "../components/Input/Input";
import { Button } from "../styles/Button";
import { Form } from "../styles/Form";
import { SplitInTwoVertical, ImageContainer } from "../styles/Global";
import OauthButton from "../components/OauthButton/OauthButton";
//@ts-ignore
import EarthImage from "../assets/world-min.jpg";
//@ts-ignore
import githubLogo from "../assets/github.svg";
//@ts-ignore
import facebookLogo from "../assets/facebook.svg";
import styled from "styled-components";

const inputInitArgs = {
  username: "",
  password: "",
};

const OAuthContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const FullHeightCenter = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ErrorMessage = styled.p`
  margin: 10px 0;
  font-size: 1.2rem;
  color: red;
`;

const Paragraph = styled.p`
  font-size: 1.1rem;
  margin: 1rem 0;
`;

const Login = () => {
  const [input, inputDispatch] = useReducer(inputReducer, inputInitArgs);
  const history = useHistory();

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
        history.push("/map");
      }
    } catch (error) {
      inputDispatch({
        type: "error",
        payload: "Something went wrong",
      });
    }
  };

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
        <Paragraph>Or login with...</Paragraph>
        <OAuthContainer>
          <OauthButton
            href="http://localhost:5050/auth/github"
            icon={githubLogo}
            iconBackground="#24292e"
          >
            GitHub
          </OauthButton>
          <OauthButton
            href="http://localhost:5050/auth/facebook"
            icon={facebookLogo}
            iconBackground="#3b5998"
          >
            Facebook
          </OauthButton>
        </OAuthContainer>
      </FullHeightCenter>
    </SplitInTwoVertical>
  );
};

export default Login;
