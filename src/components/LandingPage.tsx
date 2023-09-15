import React, { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";

import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Container, Button } from "react-bootstrap";

interface Values {
  username: string;
  password: string;
}

function LandingPage() {
  const navigate = useNavigate();

  const [values, setValues] = useState<Values>({ username: "", password: "" });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      console.log(process.env.REACT_APP_SERVER + "auth/login");

      const { data } = await axios.post(
        process.env.REACT_APP_SERVER + "auth/login",
        {
          ...values,
        },
        { withCredentials: false }
      );
      if (data) {
        if (data.errors) {
          const { username, password } = data.errors;
        } else {
          navigate("/Pdfuploader");
        }
      }
    } catch (ex) {
      console.log(ex);
    }
  };

  return (
    <>
      <h1>Blona</h1>
      <h4>AI CoPilot for Manufacturing</h4>
      <Container className="p-3 mt-5">
        <Form onSubmit={(e) => handleSubmit(e)}>
          <Row className="mb-3">
            <Col md={{ span: 4, offset: 4 }}>
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
            </Col>
          </Row>
          <Row className="mb-3">
            <Col md={{ span: 4, offset: 4 }}>
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
            </Col>
          </Row>
          <Button variant="primary" type="submit">
            Login
          </Button>
        </Form>
      </Container>
    </>
  );
}

export default LandingPage;
