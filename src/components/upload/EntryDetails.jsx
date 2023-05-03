import React, { useState } from "react";

function EntryDetails({ entry, onEdit, onDelete, onClose }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedEntry, setEditedEntry] = useState(entry);

  const handleChange = (event) => {
    setEditedEntry({ ...editedEntry, [event.target.name]: event.target.value });
  };

  const handleSave = () => {
    onEdit(editedEntry);
    setIsEditing(false);
    onClose();
  };

  return (
    <dialog open>
      <div className="dialog-content">
        <div className="dialog-actions">
          <div className="dialog-title">
            {isEditing ? (
              <input
                type="text"
                name="title"
                value={editedEntry.title}
                onChange={handleChange}
              />
            ) : (
              <b>{entry.title}</b>
            )}
          </div>
          <div className="dialog-buttons">
            {isEditing ? (
              <>
                <button onClick={handleSave}>Save</button>
                <button className="cancel" onClick={() => setIsEditing(false)}>
                  Cancel
                </button>
              </>
            ) : (
              <>
                <button onClick={() => setIsEditing(true)}>Edit</button>
              </>
            )}
          </div>
        </div>
        <div className={`dialog-scrollable${isEditing ? " no-scroll" : ""}`}>
          {isEditing ? (
            <textarea
              name="file_content"
              value={editedEntry.file_content}
              onChange={handleChange}
            />
          ) : (
            <p>{entry.file_content}</p>
          )}
        </div>
        <span className="close" onClick={onClose}>
          &times;
        </span>
      </div>
    </dialog>
  );
}

export default EntryDetails;
