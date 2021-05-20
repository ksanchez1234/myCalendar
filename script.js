//Variable Date = New Date
//This helps display current highlighted day.
const date = new Date();

//Function to Make Arrows Work - Placing all code inside
const renderCalendar = () => {

    //First Day of Month set to 1
    date.setDate(1);

    //Gets the current days of the month
    const monthDays = document.querySelector('.days');

    //Gets last days of the month
    const lastDay = new Date(date.getFullYear(), date.getMonth()+1, 0).getDate();

    //Gets last day of the month
    const prevLastDay = new Date(date.getFullYear(), date.getMonth(), 0).getDate();
    const firstDayIndex = date.getDay();
    const lastDayIndex = new Date(date.getFullYear(), date.getMonth()+1, 0).getDay();
    const nextDays = 7 - lastDayIndex - 1;

    //Array for All Months of the Year
    const month = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    //Current Month Heading will be displayed - h1
    //innerHTML changes the properties
    document.querySelector('.date h1').innerHTML = month[date.getMonth()];
    //Current Date will be displayed - p
    document.querySelector('.date p').innerHTML = new Date().toDateString();

    //variable days = Empty string
    let days = "";

    //Counter to display days from previous month
    //days will be equal to days -
    //We are using a <div> element for the previous days of the calendar.
    //This avoids us having to manually enter the days of the month (1-30 or so)
    for(let x = firstDayIndex; x>0; x--){
        days+= `<div class="prev-date">${prevLastDay - x + 1}</div>`;
    }
    //Counter to display days of current month
    //We are using a <div> element for the previous days of the calendar.
    for(let i = 1; i<=lastDay; i++){
        if (i === new Date().getDate() && date.getMonth() === new Date().getMonth()) {
            days += `<div class="today">${i}</div>`;
        }else{
            days += `<div>${i}</div>`;
        }
    }
    //Counter to display days from next month
    for(let j = 1; j<=nextDays; j++){
        days += `<div class="next-date">${j}</div>`;
        monthDays.innerHTML = days;
    }

    }

    //Arrow Event Listeners - Click Left
    document.querySelector('.prev').addEventListener('click',() => {
        date.setMonth(date.getMonth()-1); //Get prev month
        renderCalendar();
    });
    //Arrow Event Listeners - Click Right
    document.querySelector('.next').addEventListener('click',() => {
        date.setMonth(date.getMonth()+1);  //Get next month
        renderCalendar();
    });

//Calling RenderCalendar Function
//Function to Make Arrows Work - Placing all code inside
renderCalendar();