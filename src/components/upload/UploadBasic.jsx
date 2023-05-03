import React, { useState } from "react";

function UploadBasic({ email, setMyUploadsUpdateKey }) {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [uploadStatus, setUploadStatus] = useState("");
  const [uploadedTitle, setUploadedTitle] = useState("");
  const [uploadedContent, setUploadedContent] = useState("");
  const [fileContent, setFileContent] = useState("");
  const [uploading, setUploading] = useState(false);
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

  const getEndpoint = (fileExtension) => {
    if (
      [".mp3", ".wav", ".mpeg", "mp4", "mpga", "m4a", "webm"].includes(
        fileExtension
      )
    ) {
      return "/whisper-upload";
    }
    return "/upload-basic";
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const fileSizeLimit = 5000 * 1024; // 5MB
    const validFileExtensions = [
      ".txt",
      ".mp3",
      ".wav",
      ".mpeg",
      "mp4",
      "mpga",
      "m4a",
      "webm",
    ];

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
      formData.append("email", email);
      setUploading(true);

      fetch(apiUrl + getEndpoint(file.name.slice(-4)), {
        method: "POST",
        body: formData,
      })
        .then((response) => {
          if (response.status === 200) {
            return response.json();
          } else {
            // Handle different error statuses, if needed
            throw new Error(`Error: ${response.status}`);
          }
        })
        .then((data) => {
          console.log(data); // check response data
          setUploadStatus("success");
          setTitle(data.title);
          if (file.name.slice(-4) === ".txt") {
            setFileContent(data.file_content);
          } else {
            setFileContent(data.transcript);
          }
          setFile(null);
          setTitle("");
          setMyUploadsUpdateKey((prevKey) => prevKey + 1);
          setUploading(false);
        })
        .catch((error) => {
          console.error(error);
          setUploading(false);
        });
    }
  };

  return (
    <div className="upload-form-container">
      {uploading && (
        <div className="uploading-status">
          <div className="uploading-message">Upload läuft...</div>
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
            onClick={() => {
              setUploadStatus("");
              setFileContent("");
              setTitle("");
            }}
          >
            Weitere Datei hochladen
          </button>
        </div>
      ) : (
        <form className="upload-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title" className="form-label">
              Titel:
            </label>
            <input
              type="text"
              id="title"
              name="title"
              className="form-control text-input"
              value={title}
              onChange={handleTitleChange}
            />
            {errors.title && <p>Bitte Titel eingeben</p>}
          </div>
          <div className="form-group">
            <label htmlFor="file" className="form-label">
              Datei:
            </label>
            <input
              type="file"
              id="file"
              name="file"
              className="form-control"
              onChange={handleFileChange}
            />
            {errors.file && <p>Bitte Datei wählen</p>}
            {errors.fileSize && <p>Die maximale Dateigrösse ist 5MB</p>}
            {errors.fileExtension && (
              <p>
                Das Dateiformat muss .txt oder mp3, wav, mpeg, mp4, mpga, m4a,
                webm sein
              </p>
            )}
          </div>
          <button type="submit" className="submit-button">
            Upload
          </button>
        </form>
      )}
    </div>
  );
}
export default UploadBasic;
