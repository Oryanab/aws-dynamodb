import { Container, Row, Col } from "react-bootstrap";
import React, { useState } from "react";
import Search from "./Components/Search";
import Results from "./Components/Results";
import Navbar from "./Components/Navbar";

function App() {
  const [wordlist, setWordList] = useState([]);
  return (
    <div>
      <Navbar />
      <Container>
        <Row style={{ textAlign: "center" }}>
          <Col></Col>
          <Col xs={10}>
            <Search setWordList={setWordList} wordlist={wordlist} />
          </Col>
          <Col></Col>
        </Row>
        <Row style={{ marginLeft: "auto", marginRight: "auto" }}>
          <Col xs lg="2"></Col>
          <Col style={{ marginLeft: "6%", marginRight: "auto" }}>
            <Results wordlist={wordlist} />
          </Col>
          <Col xs lg="2"></Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
