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
import EarthImage from "../images/world-min.jpg";

const inputInitArgs = {
  username: "",
  password: "",
  error: "",
  isLoading: false,
};

const Login = () => {
  const [input, inputDispatch] = useReducer(inputReducer, inputInitArgs);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    inputDispatch({ type: "login" });
  };

  return (
    <SplitInTwoVertical>
      <ImageContainer>
        <img src={EarthImage} alt="earth" />
      </ImageContainer>
      <Form onSubmit={handleSubmit}>
        <FloatingLabel label="username">
          <TextInput
            name="username"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              inputDispatch({
                type: "field",
                field: e.target.name,
                targetValue: e.target.value,
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
                field: e.target.name,
                targetValue: e.target.value,
              })
            }
            value={input.password}
          />
        </FloatingLabel>
        <Button type="submit">Login</Button>
      </Form>
    </SplitInTwoVertical>
  );
};

export default Login;
