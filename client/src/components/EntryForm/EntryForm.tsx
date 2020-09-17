import React, { useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { addEntry, addNotification, updateEntry } from "../../redux/actions";
import styled from "styled-components";
import { Button } from "../../styles/Button";
import { LogEntry } from "../../types";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
  padding: 1em;
  background: #ccc;
  z-index: 491248124120984901284012;
`;

const FormButton = styled(Button)`
  margin: 10px auto 0px;
  padding: 0.5rem 1rem;
  color: blue;
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
  type: "PUT" | "POST";
  description?: string;
  title?: string;
  _id?: string;
}

const EntryForm: React.FC<EntryForm> = ({
  lng,
  lat,
  description,
  title,
  type,
  _id,
}) => {
  const [fields, setFields] = useState<LogEntry>({
    lng: lng,
    lat: lat,
    description: description || "",
    title: title || "",
  });

  const dispatch = useDispatch();

  useEffect(() => {
    setFields((prev) => ({
      ...prev,
      lng: lng,
      lat: lat,
    }));
  }, [lng, lat]);

  const handlePOSTSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
      const resp = await fetch(ENDPOINT, options);
      const { data } = await resp.json();
      dispatch(
        addEntry({
          lat: data.lat,
          lng: data.long,
          _id: data._id,
          description: data.description,
          title: data.title,
        })
      );
    } catch (error) {
      dispatch(
        addNotification("Something went wrong, try again later", "error")
      );
    }
  };

  const handlePUTSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const ENDPOINT = `http://localhost:5050/api/v1/travel-logs/${_id}`;
    const options: RequestInit = {
      method: "PUT",
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
      const resp = await fetch(ENDPOINT, options);
      if (!resp.ok) {
        dispatch(
          addNotification("Something went wrong, try again later", "error")
        );
      }
      const foo = await resp.json();
      dispatch(updateEntry(foo.data));
      dispatch(addNotification("Updated an Entry"));
    } catch (error) {
      dispatch(
        addNotification("Something went wrong, try again later", "error")
      );
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
    <Form onSubmit={type === "POST" ? handlePOSTSubmit : handlePUTSubmit}>
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
      <FormButton>Submit</FormButton>
    </Form>
  );
};
export default connect(null, { addEntry, addNotification, updateEntry })(
  EntryForm
);
