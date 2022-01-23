import React, { useState } from "react";
import { InputGroup, FormControl, Button, Form } from "react-bootstrap";
import axios from "axios";

export default function Search(props) {
  const [searchKeys, setSearchKeys] = useState("");

  const getListOfWords = async () => {
    const getWords = await axios.get(
      `https://2wolyi7e5c.execute-api.eu-central-1.amazonaws.com/prod/word/${searchKeys}`
    );
    console.log(getWords.data);
    props.setWordList(getWords.data);
  };

  return (
    <div>
      <header style={{ fontSize: "3vh" }}>
        <b>English Dictionary</b>{" "}
      </header>
      <InputGroup className="mb-3">
        <FormControl
          onChange={(e) => setSearchKeys(e.target.value)}
          placeholder="enter a word"
          aria-describedby="basic-addon2"
        />
        <Button
          onClick={(e) => getListOfWords()}
          variant="outline-secondary"
          id="button-addon2"
        >
          search
        </Button>
      </InputGroup>
    </div>
  );
}
