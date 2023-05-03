import React, { useState } from "react";

function UploadExpert() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [uploadStatus, setUploadStatus] = useState("");
  const [errors, setErrors] = useState({
    title: false,
    file: false,
    fileSize: false,
    fileExtension: false,
  });

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const fileSizeLimit = 500 * 1024; // 500KB
    const validFileExtensions = [".txt"];

    let newErrors = {
      title: false,
      file: false,
      fileSize: false,
      fileExtension: false,
    };

    if (!title.trim()) newErrors.title = true;
    if (!file) newErrors.file = true;
    if (file && file.size > fileSizeLimit) newErrors.fileSize = true;
    if (file && !validFileExtensions.includes(file.name.slice(-4)))
      newErrors.fileExtension = true;

    setErrors(newErrors);

    if (!Object.values(newErrors).some((error) => error)) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("title", title);

      fetch(apiUrl + "/upload", {
        method: "POST",
        body: formData,
      })
        .then((response) => {
          setUploadStatus("success");
          setFile(null);
          setTitle("");
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  return (
    <div className="upload-form-container">
      {uploadStatus === "success" ? (
        <div className="upload-success-message">
          <p>File uploaded successfully!</p>
          <button
            className="upload-another-button"
            onClick={() => setUploadStatus("")}
          >
            Upload another file
          </button>
        </div>
      ) : (
        <form className="upload-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title" className="form-label">
              Title:
            </label>
            <input
              type="text"
              id="title"
              name="title"
              className="form-control text-input"
              value={title}
              onChange={handleTitleChange}
            />
            {errors.title && <p>Title cannot be empty.</p>}
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
