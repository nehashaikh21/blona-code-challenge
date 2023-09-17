import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import Pdfuploader from ".//src/components/Pdfuploader";

// Mock the pdfjs-dist library since we don't want to actually parse PDFs in tests
jest.mock("pdfjs-dist");

describe("Pdfuploader", () => {
  it("renders without errors", () => {
    render(<Pdfuploader />);
    const uploadLabel = screen.getByText(/Please Select a pdf file to upload/i);
    expect(uploadLabel).toBeInTheDocument();
  });

  it("allows uploading a PDF file", async () => {
    render(<Pdfuploader />);
    const fileInput = screen.getByLabelText(
      "Please Select a pdf file to upload"
    );

    // Create a sample PDF file
    const pdfBlob = new Blob(["Sample PDF content"], {
      type: "application/pdf",
    });
    const pdfFile = new File([pdfBlob], "sample.pdf", {
      type: "application/pdf",
    });

    // Wait for the "Upload" button to appear
    const uploadButton = await waitFor(() => screen.getByText("Upload"));
    expect(uploadButton).toBeInTheDocument();
  });
});
