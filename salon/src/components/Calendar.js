// // import React, { useState } from 'react';
// import { ChevronLeft, ChevronRight } from 'lucide-react';

// const BookingCalendar = ({ selectedEmployee, availableDates, onDateSelect, selectedDate }) => {
//   const [currentDate, setCurrentDate] = useState(new Date());

//   // Get days in month
//   const getDaysInMonth = (date) => {
//     return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
//   };

//   // Get day of week for first day of month (0-6)
//   const getFirstDayOfMonth = (date) => {
//     return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
//   };

//   // Check if a date is available
//   const isDateAvailable = (year, month, day) => {
//     if (!availableDates) return false;
//     const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
//     return availableDates.has(dateString);
//   };

//   // Check if a date is in the past
//   const isDateInPast = (year, month, day) => {
//     const checkDate = new Date(year, month, day);
//     const today = new Date();
//     today.setHours(0, 0, 0, 0);
//     return checkDate < today;
//   };

//   // Handle date selection
//   const handleDateSelect = (day) => {
//     if (!selectedEmployee) return;
    
//     const year = currentDate.getFullYear();
//     const month = currentDate.getMonth();
    
//     if (isDateInPast(year, month, day) || !isDateAvailable(year, month, day)) return;
    
//     const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
//     onDateSelect(dateString);
//   };

//   // Navigation handlers
//   const previousMonth = () => {
//     setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
//   };

//   const nextMonth = () => {
//     setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
//   };

//   // Calendar grid generation
//   const renderCalendarGrid = () => {
//     const daysInMonth = getDaysInMonth(currentDate);
//     const firstDayOfMonth = getFirstDayOfMonth(currentDate);
//     const days = [];

//     // Add empty cells for days before the first day of the month
//     for (let i = 0; i < firstDayOfMonth; i++) {
//       days.push(<div key={`empty-${i}`} className="h-12" />);
//     }

//     // Add cells for each day of the month
//     for (let day = 1; day <= daysInMonth; day++) {
//       const year = currentDate.getFullYear();
//       const month = currentDate.getMonth();
//       const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      
//       const isSelected = selectedDate === dateString;
//       const isToday = new Date().getDate() === day && 
//                       new Date().getMonth() === month &&
//                       new Date().getFullYear() === year;
//       const isPast = isDateInPast(year, month, day);
//       const isAvailable = isDateAvailable(year, month, day);

//       days.push(
//         <button
//           key={day}
//           onClick={() => handleDateSelect(day)}
//           className={`
//             h-12 rounded-lg transition-colors relative
//             ${isSelected ? 'bg-blue-500 text-white' : 'bg-white'}
//             ${isToday ? 'border-2 border-blue-400' : ''}
//             ${!isAvailable || isPast ? 'bg-gray-300 cursor-not-allowed' : 'hover:bg-blue-100'}
//             ${!selectedEmployee ? 'cursor-not-allowed opacity-50' : ''}
//           `}
//           disabled={!selectedEmployee || !isAvailable || isPast}
//         >
//           {day}
//           {isAvailable && !isPast && (
//             <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2">
//               <div className="w-1 h-1 bg-green-500 rounded-full"></div>
//             </div>
//           )}
//         </button>
//       );
//     }

//     return days;
//   };

//   return (
//     <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow p-4">
//       <div className="flex justify-between items-center mb-4">
//         <button 
//           onClick={previousMonth}
//           className="p-2 hover:bg-gray-100 rounded-full"
//           disabled={currentDate.getMonth() === new Date().getMonth() && 
//                    currentDate.getFullYear() === new Date().getFullYear()}
//         >
//           <ChevronLeft className="h-5 w-5" />
//         </button>
//         <h2 className="text-lg font-semibold">
//           {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
//         </h2>
//         <button 
//           onClick={nextMonth}
//           className="p-2 hover:bg-gray-100 rounded-full"
//         >
//           <ChevronRight className="h-5 w-5" />
//         </button>
//       </div>

//       <div className="grid grid-cols-7 gap-1 mb-2">
//         {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
//           <div key={day} className="text-center font-medium text-gray-500">
//             {day}
//           </div>
//         ))}
//       </div>

//       <div className="grid grid-cols-7 gap-1">
//         {renderCalendarGrid()}
//       </div>

//       <div className="mt-4 flex items-center justify-center text-sm text-gray-600 gap-4">
//         <div className="flex items-center">
//           <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
//           <span>Available</span>
//         </div>
//         <div className="flex items-center">
//           <div className="w-2 h-2 bg-gray-300 rounded-full mr-2"></div>
//           <span>Unavailable</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BookingCalendar;



// import React, { useState } from 'react';
// import { ChevronLeft, ChevronRight } from 'lucide-react';

// const BookingCalendar = ({ selectedEmployee, availableDates, onDateSelect, selectedDate }) => {
//   const [currentDate, setCurrentDate] = useState(new Date());

//   // Get days in month
//   const getDaysInMonth = (date) => {
//     return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
//   };

//   // Get day of week for first day of month (0-6)
//   const getFirstDayOfMonth = (date) => {
//     return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
//   };

//   // Check if a date is available
//   const isDateAvailable = (year, month, day) => {
//     if (!availableDates) return false;
//     const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
//     return availableDates.has(dateString);
//   };

//   // Check if a date is in the past
//   const isDateInPast = (year, month, day) => {
//     const checkDate = new Date(year, month, day);
//     const today = new Date();
//     today.setHours(0, 0, 0, 0);
//     return checkDate < today;
//   };

//   // Handle date selection
//   const handleDateSelect = (day) => {
//     if (!selectedEmployee) return;
    
//     const year = currentDate.getFullYear();
//     const month = currentDate.getMonth();
    
//     if (isDateInPast(year, month, day) || !isDateAvailable(year, month, day)) return;
    
//     const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
//     onDateSelect(dateString);
//   };

//   // Navigation handlers
//   const previousMonth = () => {
//     setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
//   };

//   const nextMonth = () => {
//     setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
//   };

//   // Calendar grid generation
//   const renderCalendarGrid = () => {
//     const daysInMonth = getDaysInMonth(currentDate);
//     const firstDayOfMonth = getFirstDayOfMonth(currentDate);
//     const days = [];

//     // Add empty cells for days before the first day of the month
//     for (let i = 0; i < firstDayOfMonth; i++) {
//       days.push(<div key={`empty-${i}`} className="h-12" />);
//     }

//     // Add cells for each day of the month
//     for (let day = 1; day <= daysInMonth; day++) {
//       const year = currentDate.getFullYear();
//       const month = currentDate.getMonth();
//       const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      
//       const isSelected = selectedDate === dateString;
//       const isToday = new Date().getDate() === day && 
//                       new Date().getMonth() === month &&
//                       new Date().getFullYear() === year;
//       const isPast = isDateInPast(year, month, day);
//       const isAvailable = isDateAvailable(year, month, day);

//       days.push(
//         <button
//           key={day}
//           onClick={() => handleDateSelect(day)}
//           className={`
//             h-12 rounded-lg transition-colors relative
//             ${isSelected ? 'bg-blue-500 text-white' : 'bg-white'}
//             ${isToday ? 'border-2 border-blue-400' : ''}
//             ${!isAvailable || isPast ? 'bg-gray-300 cursor-not-allowed' : 'hover:bg-blue-100'}
//             ${!selectedEmployee ? 'cursor-not-allowed opacity-50' : ''}
//           `}
//           disabled={!selectedEmployee || !isAvailable || isPast}
//         >
//           {day}
//           {isAvailable && !isPast && (
//             <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2">
//               <div className="w-1 h-1 bg-green-500 rounded-full"></div>
//             </div>
//           )}
//         </button>
//       );
//     }

//     return days;
//   };

//   return (
//     <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow p-4">
//       <div className="flex justify-between items-center mb-4">
//         <button 
//           onClick={previousMonth}
//           className="p-2 hover:bg-gray-100 rounded-full"
//           disabled={currentDate.getMonth() === new Date().getMonth() && 
//                    currentDate.getFullYear() === new Date().getFullYear()}
//         >
//           <ChevronLeft className="h-5 w-5" />
//         </button>
//         <h2 className="text-lg font-semibold">
//           {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
//         </h2>
//         <button 
//           onClick={nextMonth}
//           className="p-2 hover:bg-gray-100 rounded-full"
//         >
//           <ChevronRight className="h-5 w-5" />
//         </button>
//       </div>

//       <div className="grid grid-cols-7 gap-1 mb-2">
//         {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
//           <div key={day} className="text-center font-medium text-gray-500">
//             {day}
//           </div>
//         ))}
//       </div>

//       <div className="grid grid-cols-7 gap-1">
//         {renderCalendarGrid()}
//       </div>

//       <div className="mt-4 flex items-center justify-center text-sm text-gray-600 gap-4">
//         <div className="flex items-center">
//           <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
//           <span>Available</span>
//         </div>
//         <div className="flex items-center">
//           <div className="w-2 h-2 bg-gray-300 rounded-full mr-2"></div>
//           <span>Unavailable</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BookingCalendar;




// Calendar.js
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const BookingCalendar = ({ selectedEmployee, availableDates, onDateSelect, selectedDate }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  // Get days in month
  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  // Get day of week for first day of month (0-6)
  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  // Check if a date is unavailable
  const isDateUnavailable = (year, month, day) => {
    if (!availableDates) return false;
    const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return availableDates.has(dateString);
  };

  // Check if a date is in the past
  const isDateInPast = (year, month, day) => {
    const checkDate = new Date(year, month, day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return checkDate < today;
  };

  // Handle date selection
  const handleDateSelect = (day) => {
    if (!selectedEmployee) return;
    
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    if (isDateInPast(year, month, day) || isDateUnavailable(year, month, day)) return;
    
    const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    onDateSelect(dateString);
  };

  // Navigation handlers
  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  // Calendar grid generation
  const renderCalendarGrid = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDayOfMonth = getFirstDayOfMonth(currentDate);
    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="h-12" />);
    }

    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth();
      const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      
      const isSelected = selectedDate === dateString;
      const isToday = new Date().getDate() === day && 
                      new Date().getMonth() === month &&
                      new Date().getFullYear() === year;
      const isPast = isDateInPast(year, month, day);
      const isUnavailable = isDateUnavailable(year, month, day);

      days.push(
        <button
          key={day}
          onClick={() => handleDateSelect(day)}
          className={`
            h-12 rounded-lg transition-colors relative
            ${isSelected ? 'bg-blue-500 text-white' : 'bg-white'}
            ${isToday ? 'border-2 border-blue-400' : ''}
            ${isUnavailable || isPast ? 'bg-gray-300 cursor-not-allowed' : 'hover:bg-blue-100'}
            ${!selectedEmployee ? 'cursor-not-allowed opacity-50' : ''}
          `}
          disabled={!selectedEmployee || isUnavailable || isPast}
        >
          {day}
          {!isUnavailable && !isPast && (
            <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2">
              <div className="w-1 h-1 bg-green-500 rounded-full"></div>
            </div>
          )}
        </button>
      );
    }

    return days;
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow p-4">
      <div className="flex justify-between items-center mb-4">
        <button 
          onClick={previousMonth}
          className="p-2 hover:bg-gray-100 rounded-full"
          disabled={currentDate.getMonth() === new Date().getMonth() && 
                   currentDate.getFullYear() === new Date().getFullYear()}
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <h2 className="text-lg font-semibold">
          {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
        </h2>
        <button 
          onClick={nextMonth}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center font-medium text-gray-500">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {renderCalendarGrid()}
      </div>

      <div className="mt-4 flex items-center justify-center text-sm text-gray-600 gap-4">
        <div className="flex items-center">
          <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
          <span>Available</span>
        </div>
        <div className="flex items-center">
          <div className="w-2 h-2 bg-gray-300 rounded-full mr-2"></div>
          <span>Unavailable</span>
        </div>
      </div>
    </div>
  );
};

export default BookingCalendar;