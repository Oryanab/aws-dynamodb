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
              {item.pos}
            </Card.Subtitle>
            <Card.Text>{item.definitions.toString()}</Card.Text>
            <Card.Link href="#">View Info</Card.Link>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}
