import React, { useState } from "react";

function UploadExpert({ email, setMyUploadsUpdateKey, isDocumentIdDuplicate }) {
  const apiUrl = import.meta.env.VITE_UPSERT_API_URL;
  const [file, setFile] = useState(null);
  const [documentId, setDocumentId] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState("");
  const [errors, setErrors] = useState({
    documentId: false,
    documentIdDuplicate: false,
    file: false,
    fileSize: false,
    fileExtension: false,
  });

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleDocumentIdChange = (event) => {
    setDocumentId(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const fileSizeLimit = 1000 * 1024; // 1MB
    const validFileExtensions = [
      ".txt",
      ".ppt",
      ".pdf",
      ".doc",
      ".ppt",
      ".docx",
      ".pptx",
    ];

    let newErrors = {
      documentId: false,
      file: false,
      fileSize: false,
      fileExtension: false,
    };

    if (isDocumentIdDuplicate(documentId)) {
      newErrors.documentIdDuplicate = true;
    }

    if (!documentId.trim()) newErrors.documentId = true;
    if (!file) newErrors.file = true;
    if (file && file.size > fileSizeLimit) newErrors.fileSize = true;
    if (
      file &&
      !validFileExtensions.some((extension) =>
        file.name.toLowerCase().endsWith(extension)
      )
    )
      newErrors.fileExtension = true;

    setErrors(newErrors);
    if (!Object.values(newErrors).some((error) => error)) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("document_id", documentId);
      formData.append("author", email);
      formData.append("timestamp", new Date().toISOString());
      formData.append("source", "podoku_db");

      setUploading(true);
      fetch(apiUrl + "/upsert-file", {
        method: "POST",
        body: formData,
      })
        .then((response) => {
          if (response.ok) {
            setUploadStatus("success");
            setFile(null);
            setDocumentId("");
            setMyUploadsUpdateKey((prevKey) => prevKey + 1);
            setUploading(false);
          } else {
            setUploadStatus("error");
            console.error(`Error: ${response.statusText}`);
          }
        })
        .catch((error) => {
          setUploadStatus("error");
          console.error("Network error:", error);
          setUploading(false);
        });
    }
  };

  return (
    <div className="upload-form-container">
      {uploading && (
        <div className="uploading-status">
          <div className="uploading-message">Uploading in progress...</div>
          <div className="loading-indicator">
            <img src="/images/loading.gif" alt="Loading..." />
          </div>
        </div>
      )}
      {uploadStatus === "success" ? (
        <div className="upload-success-message">
          <p>Datei Upload erfolgreich!</p>
          <button
            className="upload-another-button"
            onClick={() => setUploadStatus("")}
          >
            Weitere Datei hochladen
          </button>
        </div>
      ) : (
        <form className="upload-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="document_id" className="form-label">
              Document ID:
            </label>
            <input
              type="text"
              id="document_id"
              name="document_id"
              className="form-control text-input"
              value={documentId}
              onChange={handleDocumentIdChange}
            />
            {errors.documentId && <p>Document ID cannot be empty.</p>}
            {errors.documentIdDuplicate && <p>Document ID already exists.</p>}
          </div>
          <div className="form-group">
            <label htmlFor="file" className="form-label">
              File:
            </label>
            <input
              type="file"
              id="file"
              name="file"
              className="form-control"
              onChange={handleFileChange}
            />
            {errors.file && <p>Please select a file.</p>}
            {errors.fileSize && <p>File size must be less than 500KB.</p>}
            {errors.fileExtension && <p>File must be a .txt file.</p>}
          </div>
          <button type="submit" className="submit-button">
            Upload
          </button>
        </form>
      )}
    </div>
  );
}
export default UploadExpert;
