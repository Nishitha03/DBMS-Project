
// import React, { useState, useEffect } from 'react';
// import { useNavigate, useSearchParams } from 'react-router-dom';
// import '../styles/Booking.css';
// import BookingCalendar from '../components/Calendar';


// function Booking() {
//   const [searchParams] = useSearchParams();
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     phone: '',
//     service: searchParams.get('service') || '',
//     employee: '',
//     date: '',
//   });
//   const [services, setServices] = useState([]);
//   const [employees, setEmployees] = useState([]);
//   const [availability,setAvailability] = useState([])
//   const [employee,setEmployee] = useState([])

//   useEffect(() => {
//     fetchServices();
//     fetchEmployees();
//   }, []);

//   const fetchServices = async () => {
//     const response = await fetch('http://localhost:3001/api/services');
//     const data = await response.json();
//     setServices(data);
//   };

//   const fetchEmployees = async () => {
//     try {
//       const response = await fetch('http://localhost:3001/api/employees');
//       const data = await response.json();
//       setEmployees(data);
//       let arr = [];
//       // Loop through each employee and get their availability
//       for (const employee of data) {
//         const availabilityResponse = await fetch(`http://localhost:3001/api/employeeAvail/get/${employee.Employee_Name}`);
//         const availabilityData = await availabilityResponse.json();
//         let available = []
//         for(const availability of availabilityData["Availability"]){
//           const date = new String(availability.Date)
//           available.push(date.slice(0,10))
//         }
//         arr.push(available)
//       }

//       setAvailability(arr)
//       console.log(arr)
//     } catch (error) {
//       console.error('Error fetching employees or availability:', error);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       // First create customer
//       const customerResponse = await fetch('http://localhost:3001/api/customers', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           First_Name: formData.firstName,
//           Last_Name: formData.lastName,
//           Email: formData.email,
//           Phone_Number: formData.phone
//         })
//       });

//       if (customerResponse && customerResponse.ok) {
//         console.log('the customer updated');
//       }

//       // Then create appointment
//       const selectedEmployee = employees.find(
//         (employee) => employee.Employee_ID === parseInt(formData.employee)
//       );
//       const selectedService = services.find(
//         (service) => service.Service_ID === parseInt(formData.service)
//       );

//       if (selectedEmployee && selectedService) {
//         const appointmentResponse = await fetch('http://localhost:3001/api/appointments', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({
//             Customer_Name: formData.firstName + ' ' + formData.lastName,
//             Employee_Name: selectedEmployee.Employee_Name,
//             Service_Name: selectedService.Service_Name,
//             Appointment_Date: formData.date
//           })
//         });

//         if (appointmentResponse.ok) {
//           alert('Appointment booked successfully!');
//           navigate('/');
//         }
//       } else {
//         console.error('Error: Selected employee or service not found');
//         alert('Error booking appointment. Please try again.');
//       }
//     } catch (error) {
//       console.error('Error booking appointment:', error);
//       alert('Error booking appointment. Please try again.');
//     }
//   };

//   return (
//     <div className="booking-page">
//       <h1>Book an Appointment</h1>
//       <form onSubmit={handleSubmit} className="booking-form">
//         <div className="form-group">
//           <input
//             type="text"
//             placeholder="First Name"
//             value={formData.firstName}
//             onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
//             required
//           />
//           <input
//             type="text"
//             placeholder="Last Name"
//             value={formData.lastName}
//             onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <input
//             type="email"
//             placeholder="Email"
//             value={formData.email}
//             onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//             required
//           />
//           <input
//             type="tel"
//             placeholder="Phone"
//             value={formData.phone}
//             onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
//             required
//           />
//         </div>
//         <select
//           value={formData.service}
//           onChange={(e) => setFormData({ ...formData, service: e.target.value })}
//           required
//         >
//           <option value="">Select Service</option>
//           {services.map((service) => (
//             <option key={service.Service_ID} value={service.Service_ID}>
//               {service.Service_Name} - Rs.{service.Price}
//             </option>
//           ))}
//         </select>
//         <select
//           value={formData.employee}
//           onChange={(e) => setFormData({ ...formData, employee: e.target.value })}
//           required
//         >
//           <option value="">Select Employee</option>
//           {employees.map((employee,index) => (
//             <option key={employee.Employee_ID} value={employee.Employee_ID}>
//               {employee.Employee_Name}
//             </option>
//           ))}
//         </select>
        
//         {formData.employee !== '' ? <BookingCalendar 
//           selectedEmployee={formData.employee ? employees.find(emp => emp.Employee_ID === parseInt(formData.employee)) : null}
//           availableDates={availability[employees.indexOf(employees.find(emp => emp.Employee_ID === parseInt(formData.employee)))]}
//           onDateSelect={(date) => setFormData({ ...formData, date: date })}
//         /> : <></>}
//         <button type="submit" className="submit-button">
//           Book Appointment
//         </button>
//       </form>
//     </div>
//   );
// }

// export default Booking;

import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import '../styles/Booking.css';
import BookingCalendar from '../components/Calendar';

function Booking() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    service: searchParams.get('service') || '',
    employee: '',
    date: '',
  });
  const [services, setServices] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [availableDates, setAvailableDates] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchServices();
    fetchEmployees();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/services');
      const data = await response.json();
      setServices(data);
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  const fetchEmployees = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/employees');
      const data = await response.json();
      setEmployees(data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  // const fetchEmployeeAvailability = async (employeeId) => {
  //   setLoading(true);
  //   try {
  //     const employee = employees.find(emp => emp.Employee_ID === parseInt(employeeId));
  //     if (!employee) return;

  //     const response = await fetch(`http://localhost:3001/api/employeeAvail/get/${employee.Employee_Name}`);
  //     const data = await response.json();
      
  //     // Create a Set of available dates for O(1) lookup
  //     const availableDatesSet = new Set(
  //       data.Availability.map(avail => avail.Date.slice(0, 10))
  //     );
      
  //     setAvailableDates(prevDates => ({
  //       ...prevDates,
  //       [employeeId]: availableDatesSet
  //     }));
  //   } catch (error) {
  //     console.error('Error fetching employee availability:', error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };



  // In your Booking.js, update the fetchEmployeeAvailability function:

const fetchEmployeeAvailability = async (employeeId) => {
  setLoading(true);
  try {
    const employee = employees.find(emp => emp.Employee_ID === parseInt(employeeId));
    if (!employee) return;

    const response = await fetch(`http://localhost:3001/api/employeeAvail/get/${employee.Employee_Name}`);
    const data = await response.json();
    
    // Create a Set of unavailable dates
    const unavailableDatesSet = new Set(
      data.Availability
        .filter(avail => avail.Availability === 'Unavailable')
        .map(avail => avail.Date.slice(0, 10))
    );
    
    setAvailableDates(prevDates => ({
      ...prevDates,
      [employeeId]: unavailableDatesSet
    }));
  } catch (error) {
    console.error('Error fetching employee availability:', error);
  } finally {
    setLoading(false);
  }
};

  const handleEmployeeChange = (e) => {
    const employeeId = e.target.value;
    setFormData({ ...formData, employee: employeeId, date: '' });
    if (employeeId) {
      fetchEmployeeAvailability(employeeId);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const customerResponse = await fetch('http://localhost:3001/api/customers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          First_Name: formData.firstName,
          Last_Name: formData.lastName,
          Email: formData.email,
          Phone_Number: formData.phone
        })
      });

      if (!customerResponse.ok) {
        throw new Error('Failed to create customer');
      }

      const selectedEmployee = employees.find(
        employee => employee.Employee_ID === parseInt(formData.employee)
      );
      const selectedService = services.find(
        service => service.Service_ID === parseInt(formData.service)
      );

      if (!selectedEmployee || !selectedService) {
        throw new Error('Invalid employee or service selection');
      }

      const appointmentResponse = await fetch('http://localhost:3001/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          Customer_Name: `${formData.firstName} ${formData.lastName}`,
          Employee_Name: selectedEmployee.Employee_Name,
          Service_Name: selectedService.Service_Name,
          Appointment_Date: formData.date
        })
      });

      if (!appointmentResponse.ok) {
        throw new Error('Failed to create appointment');
      }

      alert('Appointment booked successfully!');
      navigate('/');
    } catch (error) {
      console.error('Error booking appointment:', error);
      alert(`Error booking appointment: ${error.message}`);
    }
  };

  return (
    <div className="booking-page">
      <h1>Book an Appointment</h1>
      <form onSubmit={handleSubmit} className="booking-form">
        <div className="form-group">
          <input
            type="text"
            placeholder="First Name"
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
          <input
            type="tel"
            placeholder="Phone"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            required
          />
        </div>
        <select
          value={formData.service}
          onChange={(e) => setFormData({ ...formData, service: e.target.value })}
          required
        >
          <option value="">Select Service</option>
          {services.map((service) => (
            <option key={service.Service_ID} value={service.Service_ID}>
              {service.Service_Name} - Rs.{service.Price}
            </option>
          ))}
        </select>
        <select
          value={formData.employee}
          onChange={handleEmployeeChange}
          required
        >
          <option value="">Select Employee</option>
          {employees.map((employee) => (
            <option key={employee.Employee_ID} value={employee.Employee_ID}>
              {employee.Employee_Name}
            </option>
          ))}
        </select>
        
        {loading && <div className="text-center">Loading availability...</div>}
        
        {formData.employee && !loading && (
          <BookingCalendar 
            selectedEmployee={employees.find(emp => emp.Employee_ID === parseInt(formData.employee))}
            availableDates={availableDates[formData.employee]}
            onDateSelect={(date) => setFormData({ ...formData, date })}
            selectedDate={formData.date}
          />
        )}

        <button 
          type="submit" 
          className="submit-button"
          disabled={!formData.date || loading}
        >
          Book Appointment
        </button>
      </form>
    </div>
  );
}

export default Booking;