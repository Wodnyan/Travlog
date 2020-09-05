import React, { useReducer } from "react";
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

const inputInitArgs = {
  username: "",
  password: "",
};

const SignUp = () => {
  const [input, inputDispatch] = useReducer(inputReducer, inputInitArgs);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const ENDPOINT = "http://localhost:5050/auth/local/register";
    const fetchOptions: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": "true",
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
      console.log(resp);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SplitInTwoVertical>
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
        <Button type="submit">Sign up!</Button>
      </Form>
      <ImageContainer>
        <img src={EarthImage} alt="earth" />
      </ImageContainer>
    </SplitInTwoVertical>
  );
};

export default SignUp;
