import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { Container, Button } from "react-bootstrap";

function LandingPage() {
  const [values, setValues] = useState({ username: "", password: "" });
  const handleSubmit = () => {};
  return (
    <>
      <h1>Blona</h1>
      <h4>AI CoPilot for Manufacturing</h4>
      <Container className="rounded shadow p-3">
        <Form onSubmit={(e) => handleSubmit()}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              name="username"
              required
              onChange={(e) =>
                setValues({ ...values, [e.target.name]: e.target.value })
              }
              type="text"
              placeholder="Enter username"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control
              name="password"
              required
              onChange={(e) =>
                setValues({ ...values, [e.target.name]: e.target.value })
              }
              type="password"
              placeholder="Password"
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Login
          </Button>
        </Form>
      </Container>
    </>
  );
}

export default LandingPage;
