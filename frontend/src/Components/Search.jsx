import React, { useState } from "react";
import { InputGroup, FormControl, Button } from "react-bootstrap";
import axios from "axios";

export default function Search(props) {
  const [searchKeysSearch, setSearchKeysSearch] = useState("");

  const getListOfWords = async (searchKeys) => {
    const getWords = await axios.get(
      `https://2wolyi7e5c.execute-api.eu-central-1.amazonaws.com/prod/word/${searchKeys}`
    );
    props.setWordList(getWords.data);
  };

  return (
    <div>
      <header style={{ fontSize: "2vw", marginTop: "1vh" }}></header>
      <InputGroup className="mb-3">
        <FormControl
          value={searchKeysSearch}
          onChange={(e) => {
            setSearchKeysSearch(e.target.value.toUpperCase());
            getListOfWords(e.target.value.toUpperCase());
          }}
          placeholder="Type any word/keys as you wish..."
          aria-describedby="basic-addon2"
        />

        <Button
          onClick={() => {
            getListOfWords(searchKeysSearch);
            setSearchKeysSearch("");
          }}
          variant="outline-secondary"
          id="button-addon2"
        >
          search
        </Button>
      </InputGroup>
    </div>
  );
}
