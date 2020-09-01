import React from "react";
import styled from "styled-components";
import { Button } from "../../styles/Button";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
  padding: 1em;
  background: #ccc;
`;

const Input = styled.input`
  display: block;
  width: 100%;
  padding: 0.3em;
`;
const TextField = styled.textarea`
  display: block;
  width: 100%;
  resize: none;
  height: 150px;
  padding: 0.5em;
`;

const Label = styled.label`
  font-size: 1.3em;
`;

const EntryForm: React.FC = () => {
  return (
    <Form>
      <Label>
        Title
        <Input />
      </Label>
      <Label>
        Description
        <TextField />
      </Label>
      <Button>Submit</Button>
    </Form>
  );
};
export default EntryForm;
