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

  // Handle form submission by sending request to server for validation of username and password
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
      <div className="m-5 text-center">
        <h1>Blona</h1>
        <h4>AI CoPilot for Manufacturing</h4>
      </div>
      <Container
        fluid
        className="d-flex justify-content-center align-items-center text-center"
      >
        <div className="rounded shadow m-3 p-5 formcontainer">
          <Form onSubmit={(e) => handleSubmit(e)}>
            <Row>
              <Col>
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
            <Row>
              <Col>
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
            <Button className="m-3 loginbtn" type="submit">
              Login
            </Button>
          </Form>
        </div>
      </Container>
    </>
  );
}

export default LandingPage;
