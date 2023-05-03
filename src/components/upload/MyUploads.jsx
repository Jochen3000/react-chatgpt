import React, { useEffect, useState } from "react";
import EntryDetails from "./EntryDetails";

function MyUploads({ email, myUploadsUpdateKey }) {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [interviews, setInterviews] = useState([]);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updateList, setUpdateList] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [entryIdToDelete, setEntryIdToDelete] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch(apiUrl + "/view-uploads?email=" + encodeURIComponent(email))
      .then((response) => response.json())
      .then((data) => {
        setInterviews(data);
        setUpdateList(false);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, [myUploadsUpdateKey, updateList]);

  const handleEditEntry = (entry) => {
    setIsLoading(true); // Set isLoading to true before sending the update request
    fetch(apiUrl + "/entries/" + entry._id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(entry),
    })
      .then((response) => response.json())
      .then((updatedEntry) => {
        setInterviews(
          interviews.map((interview) =>
            interview._id === updatedEntry._id ? updatedEntry : interview
          )
        );
        setUpdateList(true);
        setIsLoading(false); // Set isLoading back to false after the list has been updated
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false); // Set isLoading back to false in case of an error
      });
  };

  const handleDeleteEntry = (entryId) => {
    setIsLoading(true); // Set isLoading to true before sending the delete request
    fetch(apiUrl + "/entries/" + entryId, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(() => {
        setInterviews(
          interviews.filter((interview) => interview._id !== entryId)
        );
        setUpdateList(true);
        setIsLoading(false); // Set isLoading back to false after the list has been updated
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false); // Set isLoading back to false in case of an error
      });
  };

  const handleConfirmDelete = () => {
    handleDeleteEntry(entryIdToDelete);
    setShowConfirmModal(false);
  };

  const handleDeleteClick = (event, entryId) => {
    event.stopPropagation();
    setEntryIdToDelete(entryId);
    setShowConfirmModal(true);
  };

  const handleOpenModal = (entry) => {
    setSelectedEntry(entry);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedEntry(null);
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="big-text-card">
        <div className="big-card-text">
          <div className="text-headline">Interviews</div>
          <div className="text-card-body">
            {isLoading && (
              <div className="loading-indicator">
                <img src="/images/loading.gif" alt="Loading..." />
              </div>
            )}
            {interviews.map((interview) => (
              <div
                key={interview._id}
                onClick={() => handleOpenModal(interview)}
                className="entry-row"
              >
                <b>{interview.title}</b>
                <span className="entry-email">{interview.email}</span>
                <span>
                  {new Intl.DateTimeFormat("de-DE", {
                    year: "2-digit",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                  }).format(new Date(Date.parse(interview.created_at.$date)))}
                </span>
                <img
                  className="trash-icon"
                  src="/images/trash.svg"
                  alt="delete"
                  onClick={(event) => handleDeleteClick(event, interview._id)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      {isModalOpen && selectedEntry && (
        <EntryDetails
          entry={selectedEntry}
          onEdit={handleEditEntry}
          onDelete={handleDeleteEntry}
          onClose={handleCloseModal}
        />
      )}
      {showConfirmModal && (
        <div className="confirmation-modal">
          <div className="confirmation-modal-content">
            <p>Willst Du die Datei wirklich löschen?</p>
            <div className="confirmation-modal-buttons">
              <button onClick={handleConfirmDelete}>Löschen</button>
              <button onClick={() => setShowConfirmModal(false)}>
                Abbrechen
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default MyUploads;
