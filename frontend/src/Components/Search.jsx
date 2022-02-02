import React, { useState } from "react";
import { InputGroup, FormControl, Button, Form } from "react-bootstrap";
import axios from "axios";

export default function Search(props) {
  // Search Words states
  const [searchWord, setSearchWord] = useState("");
  const [searchPos, setSearchPos] = useState("n.");

  // Flag states
  const [showSearchBySingleWord, setShowSearchBySingleWord] = useState("none");
  const [showSearchBySingleWordAndPos, setShowSearchBySingleWordAndPos] =
    useState("none");
  const [showSearchBySinglePosQueryWord, setShowSearchBySinglePosQueryWord] =
    useState("none");

  const getListOfWords = async (searchWords) => {
    const getWords = await axios.get(
      `https://2wolyi7e5c.execute-api.eu-central-1.amazonaws.com/api/word/${searchWords}`
    );
    props.setWordList(getWords.data);
  };

  const getListOfSearchBySingleWordAndPos = async (searchWords, searchPos) => {
    const getWords = await axios.get(
      `https://2wolyi7e5c.execute-api.eu-central-1.amazonaws.com/api/word/${searchWords}/${searchPos}`
    );
    props.setWordList([getWords.data]);
  };

  const getListOfSearchBySinglePosQueryWord = async (searchPos, letters) => {
    const getWords = await axios.get(
      `https://2wolyi7e5c.execute-api.eu-central-1.amazonaws.com/api/part-of-speech/${searchPos}?letter=${letters}`
    );
    props.setWordList([getWords.data]);
  };

  //   /:word - dynamic route - word is dynamic URL parameter, used to request backend api
  // /:word/:partOfSpeech - dynamic route - word is dynamic URL parameter, used to request backend api
  // /part-of-speech/:part - part is enum URL parameter, used to request backend api

  const flagControlSelect = (itemSelected) => {
    switch (itemSelected) {
      case "Please select Action":
        setShowSearchBySingleWord("none");
        setShowSearchBySingleWordAndPos("none");
        setShowSearchBySinglePosQueryWord("none");
        setSearchWord("");
        props.setWordList([]);
        break;
      case "search single word":
        setShowSearchBySingleWord("block");
        setShowSearchBySingleWordAndPos("none");
        setShowSearchBySinglePosQueryWord("none");
        setSearchWord("");
        props.setWordList([]);
        break;
      case "search single word from single part of speech":
        setShowSearchBySingleWord("none");
        setShowSearchBySingleWordAndPos("block");
        setShowSearchBySinglePosQueryWord("none");
        setSearchWord("");
        props.setWordList([]);
        break;
      case "search part of speech query by single word":
        setShowSearchBySingleWord("none");
        setShowSearchBySingleWordAndPos("none");
        setShowSearchBySinglePosQueryWord("block");
        setSearchWord("");
        props.setWordList([]);
        break;
      default:
        return;
    }
  };

  return (
    <div>
      <header
        style={{ fontSize: "2vw", marginTop: "1vh", color: "white" }}
      ></header>
      <Form.Select
        onChange={(e) => flagControlSelect(e.target.value)}
        size="sm"
        style={{ marginBottom: "2vh" }}
      >
        <option>Please select Action</option>
        <option>search single word</option>
        <option>search single word from single part of speech</option>
        <option>search part of speech query by single word</option>
      </Form.Select>

      {/* first ask */}
      <div style={{ display: showSearchBySingleWord }}>
        <InputGroup className="mb-3">
          <FormControl
            value={searchWord}
            onChange={(e) => {
              setSearchWord(e.target.value.toUpperCase());
              getListOfWords(e.target.value.toUpperCase());
            }}
            placeholder="Type any word/keys as you wish..."
            aria-describedby="basic-addon2"
          />
          <Button
            onClick={() => {
              getListOfWords(searchWord);
              setSearchWord("");
            }}
            variant="outline-secondary"
            id="button-addon2"
          >
            search
          </Button>
        </InputGroup>
      </div>

      {/* second ask */}
      <div style={{ display: showSearchBySingleWordAndPos }}>
        <InputGroup className="mb-3">
          <FormControl
            value={searchWord}
            onChange={(e) => {
              setSearchWord(e.target.value.toUpperCase());
            }}
            placeholder="Type any word..."
            aria-describedby="basic-addon2"
          />
          <Form.Select
            onChange={(e) =>
              setSearchPos(
                e.currentTarget.options[e.currentTarget.options.selectedIndex]
                  .id
              )
            }
            size="sm"
            style={{ marginBottom: "2vh" }}
          >
            <option id="n.">noun</option>
            <option id="prep.">prep</option>
            <option id="a.">adjective</option>
            <option id="v.">verb</option>
            <option id="adv.">Adverb</option>
          </Form.Select>
          <Button
            onClick={() => {
              getListOfSearchBySingleWordAndPos(searchWord, searchPos);
              setSearchWord("");
            }}
            variant="outline-secondary"
            id="button-addon2"
          >
            search
          </Button>
        </InputGroup>
      </div>

      {/* third ask */}
      <div style={{ display: showSearchBySinglePosQueryWord }}>
        <InputGroup className="mb-3">
          <Form.Select
            onChange={(e) =>
              setSearchPos(
                e.currentTarget.options[e.currentTarget.options.selectedIndex]
                  .id
              )
            }
            size="sm"
            style={{ marginBottom: "2vh" }}
          >
            <option id="n.">noun</option>
            <option id="prep.">prep</option>
            <option id="a.">adjective</option>
            <option id="v.">verb</option>
            <option id="adv.">Adverb</option>
          </Form.Select>
          ;
          <FormControl
            value={searchWord}
            onChange={(e) => {
              setSearchWord(e.target.value.toUpperCase());
            }}
            placeholder="Query by word/keys..."
            aria-describedby="basic-addon2"
          />
          <Button
            onClick={() => {
              getListOfSearchBySinglePosQueryWord(searchPos, searchWord);
              setSearchWord("");
            }}
            variant="outline-secondary"
            id="button-addon2"
          >
            search
          </Button>
        </InputGroup>
      </div>
    </div>
  );
}
