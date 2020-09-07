import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Button } from "../../styles/Button";
import { LogEntry } from "../../types";

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

interface EntryForm {
  lng: number;
  lat: number;
  onSubmitComplete?: () => void;
  onSubmitFailure?: (error: any) => void;
}

const EntryForm: React.FC<EntryForm> = ({
  onSubmitComplete,
  onSubmitFailure,
  lng,
  lat,
}) => {
  const [fields, setFields] = useState<LogEntry>({
    lng: lng,
    lat: lat,
    description: "",
    title: "",
  });

  useEffect(() => {
    setFields((prev) => ({
      ...prev,
      lng: lng,
      lat: lat,
    }));
  }, [lng, lat]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const ENDPOINT = "http://localhost:5050/api/v1/travel-logs";
    const options: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        title: fields.title,
        description: fields.description,
        lat: fields.lat,
        long: fields.lng,
      }),
    };
    try {
      const addNewEntry = await fetch(ENDPOINT, options);
      const resp = await addNewEntry.json();
      if (onSubmitComplete) {
        onSubmitComplete();
      }
    } catch (error) {
      if (onSubmitFailure) {
        onSubmitFailure(error);
      }
    }
  };
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    e.persist();
    setFields((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  return (
    <Form onSubmit={handleSubmit}>
      <Label>
        Title
        <Input name="title" value={fields.title} onChange={handleChange} />
      </Label>
      <Label>
        Description
        <TextField
          name="description"
          value={fields.description}
          onChange={handleChange}
        />
      </Label>
      <Button>Submit</Button>
    </Form>
  );
};
export default EntryForm;
