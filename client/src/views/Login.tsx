import React, { useReducer } from 'react'
import { inputReducer } from "../reducers"; 
import { TextInput, PasswordInput } from "../components/Input/Input";

const inputInitArgs = {
  username: "",
  password: "",
  erro: "",
  isLoading: false
}

const Login = () => {
  const [input, inputDispatch] = useReducer(inputReducer, inputInitArgs);
  return (
    <div>
      <TextInput
        name="username" 
        onChange={
          (e: React.ChangeEvent<HTMLInputElement>) => inputDispatch({
            type: "field",
            field: e.target.name,
            targetValue: e.target.value
          })
        } 
        value={input.username}
      />
      <PasswordInput 
        name="password" 
        onChange={
          (e: React.ChangeEvent<HTMLInputElement>) => inputDispatch({
            type: "field",
            field: e.target.name,
            targetValue: e.target.value
          })
        } 
        value={input.password}
      />
    </div>
  )
}

export default Login;
