import React from 'react';

export const DeleteEvents = ({ onDelete, eventText, onClose }) => {
  return(
    <>
      <div id="deleteEvents">
        <h2>Event</h2>

        <p id="eventText">{eventText}</p>

        <button onClick={onDelete} id="deleteButton">Delete</button>
        <button onClick={onClose} id="closeButton">Close</button>
      </div>

      {/*The modalBackDrop is needed to work with the modals like creating events or deleting events */}
      <div id="modalBackDrop"></div>
    </>
  );
};