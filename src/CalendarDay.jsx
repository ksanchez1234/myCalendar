import React from 'react';

/* This function will calculate current day.*/

export const CalendarDay = ({day, onClick}) => {

    //Checking if day.value is equal to padding. No design or events will be added to padding days.
    const className = `day ${day.value === 'padding' ? 'padding' : ''} ${day.isCurrentDay ? 'currentDay' : ''}`;
    
    return (
        //OnClick function will be called only for actual month days. Not for padding days
        <div onClick={onClick} className = {className}>
            {day.value === 'padding' ? '' : day.value}
            {/*If there is an event. Event will be displayed.*/}
            {day.event && <div className='event'>{day.event.title}</div>}
        </div>
    );
};
