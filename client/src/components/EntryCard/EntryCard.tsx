import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";
import { removeEntry } from "../../redux/actions";
import { connect, useDispatch } from "react-redux";
import styled from "styled-components";
import Form from "../EntryForm/EntryForm";

interface Props {
  title: string;
  description: string;
  lng: number;
  lat: number;
  _id: string;
}

const Container = styled.div`
  position: relative;
  overflow: hidden;
  width: 300px;
  transition: height 0.2s ease;
  .information-enter {
    transform: translate(-110%);
  }
  .information-enter-active {
    transition: transform 0.3s ease;
    transform: translate(0);
  }
  .information-exit {
    position: absolute;
  }
  .information-exit-active {
    transition: transform 0.3s ease;
    transform: translate(-110%);
  }

  .options-enter {
    transform: translate(110%);
    transition: transform 0.3s ease;
  }
  .options-enter-active {
    transform: translate(0);
  }
  .options-exit {
  }
  .options-exit-active {
    transition: transform 0.3s ease;
    transform: translate(110%);
  }
`;

const EntryCardContainer = styled.article`
  display: block;
  position: relative;
  width: 300px;
  background: grey;
  cursor: default;
  z-index: 100000000000000000;
`;
const EntryTitle = styled.h1`
  display: block;
  width: 75%;
  padding-top: 10px;
  margin: 0 auto;
  margin-bottom: 10px;
  text-align: center;
  font-size: 1.1rem;
  word-wrap: break-word;
`;
const EntryDescription = styled.p`
  padding: 0 1rem 1rem 1rem;
  max-height: 300px;
  overflow: auto;
  word-wrap: break-word;
`;
const Settings = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  background: transparent;
  border: none;
  cursor: pointer;
`;
const Options = styled.button`
  width: 100%;
  background: transparent;
  border: none;
  padding: 1rem 1.5rem;
  cursor: pointer;
`;

const EntryCard: React.FC<Props> = ({ _id, title, lng, lat, description }) => {
  const [menu, setMenu] = useState<
    "information" | "options" | "delete" | "update"
  >("information");
  const [height, setHeight] = useState<null | number>(null);
  const dispatch = useDispatch();
  const calcHeight = (el: any) => {
    const height = el.offsetHeight;
    setHeight(height);
  };

  const handleDeleteEntry = async () => {
    const OPTIONS: RequestInit = {
      method: "DELETE",
      credentials: "include",
    };
    const ENDPOINT = `http://localhost:5050/api/v1/travel-logs/${_id}`;
    try {
      const resp = await fetch(ENDPOINT, OPTIONS);
      const foo = await resp.json();
      console.log(foo);
      console.log(resp);
      if (resp.ok) {
        dispatch(removeEntry(_id));
      } else {
        //Error handling
        console.log("Oof");
      }
    } catch (error) {
      console.log("Entry Card");
      console.error(error);
    }
  };

  return (
    <Container style={{ height: height ? height + "px" : "auto" }}>
      <CSSTransition
        in={menu === "information"}
        timeout={300}
        classNames="information"
        unmountOnExit
        onEnter={calcHeight}
      >
        <EntryCardContainer>
          <EntryTitle>{title}</EntryTitle>
          <EntryDescription>{description}</EntryDescription>
          <Settings onClick={() => setMenu("options")}>
            <svg
              viewBox="0 0 24 24"
              width="24"
              height="24"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="css-i6dzq1"
            >
              <circle cx="12" cy="12" r="3"></circle>
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
            </svg>
          </Settings>
        </EntryCardContainer>
      </CSSTransition>
      <CSSTransition
        in={menu === "options"}
        timeout={300}
        classNames="options"
        onEnter={calcHeight}
        unmountOnExit
      >
        <EntryCardContainer>
          <Options onClick={() => setMenu("information")}>Go Back</Options>
          <Options onClick={() => setMenu("delete")}>Delete</Options>
          <Options onClick={() => setMenu("update")}>Update</Options>
        </EntryCardContainer>
      </CSSTransition>
      <CSSTransition
        in={menu === "delete"}
        timeout={300}
        classNames="settings"
        onEnter={calcHeight}
        unmountOnExit
      >
        <EntryCardContainer>
          <Options onClick={() => setMenu("options")}>Go Back</Options>
          <button onClick={handleDeleteEntry}>Confirm Delete</button>
        </EntryCardContainer>
      </CSSTransition>
      <CSSTransition
        in={menu === "update"}
        timeout={300}
        classNames="settings"
        onEnter={calcHeight}
        unmountOnExit
      >
        <EntryCardContainer>
          <Options onClick={() => setMenu("options")}>Go Back</Options>
          <Form
            lat={lat}
            lng={lng}
            type="PUT"
            description={description}
            title={title}
            _id={_id}
          />
        </EntryCardContainer>
      </CSSTransition>
    </Container>
  );
};
export default connect(null, { removeEntry })(EntryCard);
