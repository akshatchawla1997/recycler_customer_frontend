import React, { useEffect, useState } from 'react';

function DateOfPickup({ handleDateChange }) {
  const [dates, setDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    const today = new Date();
    const options = {
      weekday: 'short',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    };
    const formattedDates = [];

    for (let i = 0; i < 7; i += 1) {
      const date = new Date(today.getTime() + i * 24 * 60 * 60 * 1000);
      if (date.getMonth() !== today.getMonth()) {
        options.month = 'long'; // Update month to retrieve next month's date
      }

      const formattedDate = date.toLocaleDateString('en-US', options);

      const matchResult = formattedDate.match(/(\w{3}), (\w+) (\d{1,2}),/);
      if (matchResult !== null) {
        const weekday = matchResult[1];
        const dateValue = matchResult[3];
        const completeDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
        formattedDates.push({ weekday, dateValue, completeDate });
      }
    }

    setDates(formattedDates);
  }, []);

  const handleDateClick = (date) => {
    setSelectedDate(date);
    handleDateChange(date);
  };

  const handleKeyDown = (event, date) => {
    if (event.key === 'Enter' || event.key === ' ') {
      setSelectedDate(date);
      handleDateChange(date);
    }
  };

  return (
    <div className='flex '>
      <div className='flex flex-wrap pl-8 md:pl-0 '>
        {dates.map((date, index) => (
          <div
            key={index}
            onClick={() => handleDateClick(date.completeDate)}
            onKeyDown={(event) => handleKeyDown(event, date.completeDate)}
            tabIndex={0} // Make the element focusable
            className={`w-20 border-1 cursor-pointer rounded-lg my-3 mx-2 p-4 ${selectedDate === date.completeDate ? 'bg-[#E3FFF4] border border-solid border-[#27AE76]' : 'bg-slate-200'}`}
            role='button' // Indicate the element as a button
          >
            <h4 className='text-center font-semibold'>{date.weekday}</h4>
            <h4 className='text-center'>{date.dateValue}</h4>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DateOfPickup;
