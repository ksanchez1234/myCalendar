import React, { useState, useEffect } from 'react';
import { CalendarHeader } from './CalendarHeader';
import { CalendarDay } from './CalendarDay';
import { CreateEvents} from './CreateEvents';
import { DeleteEvents } from './DeleteEvents';
import { updatingDate } from './hooks/updatingDate';

export const App = () => {

  //Using useState and arrays : state itself and updated state
  const [navigation, setNavigation] = useState(0); //Initialized as 0 = Current Month
  const [clicked, setClicked] = useState(); //Initialized as undefined.
  const [events, setEvents] = useState( //Initialized to logic 
    localStorage.getItem('events') ?    //Each day will be an array.
      JSON.parse(localStorage.getItem('events')) : //Update local storage (local database)
      []
  );

  //Function - For every event we want to find where e.date is equal to the date we pass in.
  //Logic is used throughout the app.
  const eventForDate = date => events.find(e => e.date === date);

  //useEffect helps run function to update local storage
  //Events will be set & updated in local storage
  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(events));
  }, [events]);

  const { days, dateDisplay } = updatingDate(events, navigation);

  return(
    <>
      <div id="container">

        {/*Calendar Header*/}
        <CalendarHeader 
          dateDisplay={dateDisplay}
          onNext={() => setNavigation(navigation + 1)}
          onBack={() => setNavigation(navigation - 1)}
        />

        {/*Weekdays - These will never change*/}
        <div id="weekdays">
          <div>Sunday</div>
          <div>Monday</div>
          <div>Tuesday</div>
          <div>Wednesday</div>
          <div>Thursday</div>
          <div>Friday</div>
          <div>Saturday</div>
        </div>

        {/*Using map function for days - Mapping every single day to the Day Component*/}
        <div id="calendar">
          {days.map((d, index) => (
            <CalendarDay
              key={index}
              day={d}
              onClick={() => {
                /*Padding days are any days before or after the month*/
                /*If d.value does not equal to padding days then we want to set those days equal to date.*/
                if (d.value !== 'padding') { 
                  setClicked(d.date);
                }
              }}
            />
          ))}
        </div>
      </div>

              {/*Adding New Event Modal*/}
      {
        clicked && !eventForDate(clicked) &&
        <CreateEvents
          onClose={() => setClicked(null)}
          onSave={title => {
            setEvents([ ...events, { title, date: clicked }]);
            setClicked(null);
          }}
        />
      }

            {/*Adding Delete Event Modal*/}
      {
        clicked && eventForDate(clicked) &&
        <DeleteEvents
          eventText={eventForDate(clicked).title}
          onClose={() => setClicked(null)}
          onDelete={() => {
            setEvents(events.filter(e => e.date !== clicked));
            setClicked(null);
          }}
        />
      }
    </>
  );
};
