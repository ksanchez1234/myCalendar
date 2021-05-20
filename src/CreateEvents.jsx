import React, { useState } from 'react';

export const CreateEvents = ({ onSave, onClose }) => {

  //Using useState and arrays : state itself and updated state
  const [title, setTitle] = useState(''); //Initiated null - No title
  const [error, setError] = useState(false); //Initiated false - No error

  return(
    <>
      <div id="createEvents">
        <h2>New Event!</h2>

        {/*Ability to enter an event*/}
        <input 
          className={error ? 'error' : ''} //Reading potential error - Ex. No Event Entered
          value={title} 
          onChange={e => setTitle(e.target.value)} 
          id="eventTitleInput" 
          placeholder="Enter an event." 
        />

        {/*Button to Save Event*/}
        <button 
          onClick={() => {
            if (title) {
              setError(false); //If event title entered. Error will be false.
              onSave(title);   //And event title will be saved.
            } else {
              setError(true); //If no title has been set. Error will pop-up
            }
          }} 
          id="saveButton">Save</button>

          {/*Button to Cancel Request to Enter New Event*/}
        <button 
          onClick={onClose}
          id="cancelButton">Cancel</button>
      </div>

      {/*The modalBackDrop is needed to work with the modals like creating events or deleting events */}
      <div id="modalBackDrop"></div>
    </>
  );
};