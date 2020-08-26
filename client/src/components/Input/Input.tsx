import React from "react";
import * as S from "../../styles/Form";

interface Input {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  name: string;
}

interface Label {
  children: React.ReactNode;
  label: string;
}

export const PasswordInput: React.FC<Input> = ({ onChange, value, name }) => {
  return (
    <>
      <S.Input
        placeholder=" "
        name={name}
        type="password"
        onChange={onChange}
        value={value}
      />
    </>
  );
};

export const TextInput: React.FC<Input> = ({ onChange, value, name }) => {
  return (
    <>
      <S.Input
        placeholder=" "
        name={name}
        type="text"
        onChange={onChange}
        value={value}
      />
    </>
  );
};

export const FloatingLabel: React.FC<Label> = ({ label, children }) => {
  return (
    <S.Label>
      {children}
      <div className="label__text">{label}</div>
    </S.Label>
  );
};
