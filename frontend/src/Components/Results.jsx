import React from "react";
import { Card, FormControl, Button } from "react-bootstrap";
import axios from "axios";

export default function Results(props) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {props.wordlist.map((item) => (
        <Card style={{ width: "18rem" }}>
          <Card.Body>
            <Card.Title>{item.word}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              <b>type: </b>
              {item.pos === "n."
                ? "noun"
                : item.pos === "prep."
                ? "prep"
                : item.pos === "a."
                ? "adjective"
                : item.pos === "v."
                ? "verb"
                : "Adverb"}
            </Card.Subtitle>
            <Card.Text>
              <b>Definition: </b>
              {item.definitions.toString()}
            </Card.Text>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}
