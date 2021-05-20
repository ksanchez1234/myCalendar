import { useEffect, useState } from 'react';

/*This function will calculate each day of the month. 
Will verify padding days and will update current Date. */

export const updatingDate = (events, nav) => {

  //Using useState and arrays : state itself and updated state
  const [dateDisplay, setDateDisplay] = useState(''); 
  const [days, setDays] = useState([]);

  const eventForDate = date => events.find(e => e.date === date);

  useEffect(() => {
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dt = new Date();

    if (nav !== 0) {
      dt.setMonth(new Date().getMonth() + nav);
    }

    const day = dt.getDate();
    const month = dt.getMonth();
    const year = dt.getFullYear();

    const firstDayOfMonth = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const dateString = firstDayOfMonth.toLocaleDateString('en-us', {
      weekday: 'long',
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    });

    setDateDisplay(`${dt.toLocaleDateString('en-us', { month: 'long' })} ${year}`);
    const paddingDays = weekdays.indexOf(dateString.split(', ')[0]);

    //This daysArray is an array used in the for loop to verify padding days
    const daysArray = [];

    //For loop will keep looping as long as it is greater than padding days, increasing by 1
    for (let i = 1; i <= paddingDays + daysInMonth; i++) {

      //Day String will check if we are on a padding day or not.
      const dayString = `${month + 1}/${i - paddingDays}/${year}`;
      if (i > paddingDays) { 
        daysArray.push({ 
          value: i - paddingDays,
          event: eventForDate(dayString),
          isCurrentDay: i - paddingDays === day && nav === 0,
          date: dayString,
        });
      } else {
        daysArray.push({
          value: 'padding', //It is a padding day
          event: null, //Padding days should not have events
          isCurrentDay: false, //Padding days should not be equal to the current day
          date: '', //date set to undefined
        });
      }
    }

    //Setting setDays equal to days array
    setDays(daysArray);
  }, [events, nav]);

  //Returning days and date being displayed
  return {
    days,
    dateDisplay,
  };
};