import React from 'react'
import * as S from "../../styles/Input";

interface Input {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  name: string;
}

export const PasswordInput: React.FC<Input> = ({
  onChange,
  value,
  name
}) => {
  return (
    <>
      <S.Input name={name} type="password" onChange={onChange} value={value}/>
    </>
  )
}

export const TextInput: React.FC<Input> = ({
  onChange,
  value,
  name
}) => {
  return (
    <>
      <S.Input name={name} type="text" onChange={onChange} value={value}/>
    </>
  )
}