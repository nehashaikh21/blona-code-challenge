import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import { Container, Button } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
import * as pdfjs from "pdfjs-dist";
import { TextItem } from "pdfjs-dist/types/src/display/api";
import ListGroup from "react-bootstrap/ListGroup";
import { GlobalWorkerOptions } from "pdfjs-dist/build/pdf";
import Header from "./Header";
GlobalWorkerOptions.workerSrc = window.location.origin + "/pdf.worker.min.js";

function Pdfuploader() {
  const [show, setShow] = useState(false);
  const [files, setFiles] = useState<File | null>(null);
  const [list, setList] = useState<File[]>([]);
  const [parsedText, setParsedText] = useState<string | null>(null);
  const [pdfIndex, setpdfIndex] = useState<number | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      console.log(e.target.files[0]);
      setFiles(e.target.files[0]);
    }
  };

  const handleDelete = (index: number) => {
    list.splice(index, 1);
    setList([...list]);
  };

  useEffect(() => {
    console.log(list); // Log the updated list in a useEffect
  }, [list]);

  const handleSubmit = () => {
    if (files) {
      setList([...list, files]); // Add the selected file to the list
    }
    // parsePdf();
  };

  const handleParse = (index: number) => {
    setpdfIndex(index);
    setShow(true);
    parsePdf(index);
  };
  const handleClose = () => setShow(false);

  const parsePdf = async (index: number) => {
    if (!files) {
      console.error("No file to parse.");
      return;
    }

    const data = await files.arrayBuffer();
    console.log(files);
    const getPdf = await pdfjs.getDocument(data);

    try {
      const pdf = await getPdf.promise;
      const pagesCount = pdf.numPages;
      let plaintext = "";

      for (let i = 1; i <= pagesCount; i++) {
        const page = await pdf.getPage(i);
        const pageText = await page.getTextContent();

        pageText.items.forEach((item) => {
          plaintext += (item as TextItem).str + " ";
        });
      }
      setParsedText(plaintext);
      console.log(plaintext);
    } catch (error) {
      console.error("Error reading PDF:", error);
      setParsedText("Error parsing PDF.");
    }
  };

  return (
    <>
      <Header />
      <Container className="d-flex justify-content-center align-items-center text-center m-5 p-3">
        <div>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Please Select a pdf file to upload</Form.Label>
            <Row className="align-items-center m-3">
              <Col xs="auto">
                <Form.Control
                  type="file"
                  accept=".pdf"
                  onChange={handleChange}
                />
              </Col>
              <Col xs="auto">
                <Button
                  type="button"
                  className="m-3 btn"
                  onClick={handleSubmit}
                >
                  Upload
                </Button>
              </Col>
            </Row>
          </Form.Group>
        </div>
      </Container>
      <div className="m-5">
        <ListGroup>
          {list.map((file, index) => (
            <ListGroup.Item
              key={index}
              className="d-flex  justify-content-between align-items-center"
            >
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-file-earmark-pdf "
                  viewBox="0 0 16 16"
                >
                  <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z" />
                  <path d="M4.603 14.087a.81.81 0 0 1-.438-.42c-.195-.388-.13-.776.08-1.102.198-.307.526-.568.897-.787a7.68 7.68 0 0 1 1.482-.645 19.697 19.697 0 0 0 1.062-2.227 7.269 7.269 0 0 1-.43-1.295c-.086-.4-.119-.796-.046-1.136.075-.354.274-.672.65-.823.192-.077.4-.12.602-.077a.7.7 0 0 1 .477.365c.088.164.12.356.127.538.007.188-.012.396-.047.614-.084.51-.27 1.134-.52 1.794a10.954 10.954 0 0 0 .98 1.686 5.753 5.753 0 0 1 1.334.05c.364.066.734.195.96.465.12.144.193.32.2.518.007.192-.047.382-.138.563a1.04 1.04 0 0 1-.354.416.856.856 0 0 1-.51.138c-.331-.014-.654-.196-.933-.417a5.712 5.712 0 0 1-.911-.95 11.651 11.651 0 0 0-1.997.406 11.307 11.307 0 0 1-1.02 1.51c-.292.35-.609.656-.927.787a.793.793 0 0 1-.58.029zm1.379-1.901c-.166.076-.32.156-.459.238-.328.194-.541.383-.647.547-.094.145-.096.25-.04.361.01.022.02.036.026.044a.266.266 0 0 0 .035-.012c.137-.056.355-.235.635-.572a8.18 8.18 0 0 0 .45-.606zm1.64-1.33a12.71 12.71 0 0 1 1.01-.193 11.744 11.744 0 0 1-.51-.858 20.801 20.801 0 0 1-.5 1.05zm2.446.45c.15.163.296.3.435.41.24.19.407.253.498.256a.107.107 0 0 0 .07-.015.307.307 0 0 0 .094-.125.436.436 0 0 0 .059-.2.095.095 0 0 0-.026-.063c-.052-.062-.2-.152-.518-.209a3.876 3.876 0 0 0-.612-.053zM8.078 7.8a6.7 6.7 0 0 0 .2-.828c.031-.188.043-.343.038-.465a.613.613 0 0 0-.032-.198.517.517 0 0 0-.145.04c-.087.035-.158.106-.196.283-.04.192-.03.469.046.822.024.111.054.227.09.346z" />
                </svg>
                {file.name}
              </div>
              <div className="float-end">
                <Button
                  className="m-3 float-end btn"
                  onClick={() => handleParse(index)}
                >
                  Parse &nbsp;
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-filetype-pdf"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M14 4.5V14a2 2 0 0 1-2 2h-1v-1h1a1 1 0 0 0 1-1V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v9H2V2a2 2 0 0 1 2-2h5.5L14 4.5ZM1.6 11.85H0v3.999h.791v-1.342h.803c.287 0 .531-.057.732-.173.203-.117.358-.275.463-.474a1.42 1.42 0 0 0 .161-.677c0-.25-.053-.476-.158-.677a1.176 1.176 0 0 0-.46-.477c-.2-.12-.443-.179-.732-.179Zm.545 1.333a.795.795 0 0 1-.085.38.574.574 0 0 1-.238.241.794.794 0 0 1-.375.082H.788V12.48h.66c.218 0 .389.06.512.181.123.122.185.296.185.522Zm1.217-1.333v3.999h1.46c.401 0 .734-.08.998-.237a1.45 1.45 0 0 0 .595-.689c.13-.3.196-.662.196-1.084 0-.42-.065-.778-.196-1.075a1.426 1.426 0 0 0-.589-.68c-.264-.156-.599-.234-1.005-.234H3.362Zm.791.645h.563c.248 0 .45.05.609.152a.89.89 0 0 1 .354.454c.079.201.118.452.118.753a2.3 2.3 0 0 1-.068.592 1.14 1.14 0 0 1-.196.422.8.8 0 0 1-.334.252 1.298 1.298 0 0 1-.483.082h-.563v-2.707Zm3.743 1.763v1.591h-.79V11.85h2.548v.653H7.896v1.117h1.606v.638H7.896Z"
                    />
                  </svg>
                </Button>
                <Button
                  className="m-3 float-end btn"
                  onClick={() => handleDelete(index)}
                >
                  Delete &nbsp;
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-trash3"
                    viewBox="0 0 16 16"
                  >
                    <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
                  </svg>
                </Button>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <p>{parsedText}</p>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Pdfuploader;
