import React, { useEffect, useState } from "react";

function MyUploadsVector({
  myUploadsUpdateKey,
  databaseName,
  collectionName,
  documents,
  setDocuments,
}) {
  const apiUrl = import.meta.env.VITE_API_URL;
  const apiUpsertUrl = import.meta.env.VITE_UPSERT_API_URL;
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch(apiUrl + "/view-uploads/" + databaseName + "/" + collectionName)
      .then((response) => response.json())
      .then((data) => {
        const sortedData = data.sort((a, b) => {
          return new Date(b.timestamp) - new Date(a.timestamp);
        });
        setDocuments(sortedData);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, [myUploadsUpdateKey, collectionName]);

  const handleDeleteEntry = (entryId) => {
    setIsLoading(true);

    fetch(apiUpsertUrl + "/delete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        filter: {
          document_id: entryId,
          source: collectionName, // Assuming 'source' is the 'collectionName'
        },
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error deleting entry");
        }
        return response.json();
      })
      .then(() => {
        setDocuments(documents.filter((document) => document.id !== entryId)); // Updated variable name
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  const handleDeleteClick = (event, entryId) => {
    event.stopPropagation();
    handleDeleteEntry(entryId);
  };

  return (
    <div className="big-text-card">
      <div className="big-card-text">
        <div className="text-headline">Dokumente in Podojo Doku DB</div>
        <div className="text-card-body">
          {isLoading && (
            <div className="loading-indicator">
              <img src="/images/loading.gif" alt="Loading..." />
            </div>
          )}
          {documents.map((document) => (
            <div key={document.id} className="entry-row">
              <b>{document.id}</b>
              <span className="entry-email">{document.author}</span>
              <span>
                {new Intl.DateTimeFormat("de-DE", {
                  year: "2-digit",
                  month: "2-digit",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                }).format(new Date(document.timestamp))}{" "}
              </span>
              <img
                className="trash-icon"
                src="/images/trash.svg"
                alt="delete"
                onClick={(event) => handleDeleteClick(event, document.id)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MyUploadsVector;
