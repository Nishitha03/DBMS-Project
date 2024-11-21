import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../styles/OwnerDashboard.css';

function OwnerDashboard() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [services, setServices] = useState([]);
  const [employees,setEmployees] = useState([]);
  const [newService, setNewService] = useState({
    Service_Name: '',
    Service_Description: '',
    Price: ''
  });
  const [newEmployee, setNewEmployee] = useState({
    Employee_Name: '',
    Role: '',
    Phone_Number: ''
  });



  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/owner/signin');
    } else {
      fetchAppointments();
      fetchServices();
      fetchEmployees();
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    console.log(appointments)
  },[appointments])

  const fetchAppointments = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/appointments');
      const data = await response.json();
      setAppointments(data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

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

  const handleAddService = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/api/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newService)
      });
      if (response.ok) {
        fetchServices();
        setNewService({ Service_Name: '', Service_Description: '', Price: '' });
      }
    } catch (error) {
      console.error('Error adding service:', error);
    }
  };

  const handleDeleteService = async (serviceId) => {
    try {
      const response = await fetch(`http://localhost:3001/api/services/${serviceId}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        fetchServices();
      }
    } catch (error) {
      console.error('Error deleting service:', error);
    }
  };

  const handleDeleteEmployee = async (serviceId) => {
    try {
      const response = await fetch(`http://localhost:3001/api/employees/${serviceId}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        fetchEmployees();
      }
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };


  const handleAddEmployee = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/api/employees', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newEmployee)
      });
      if (response.ok) {
        fetchEmployees();
        setNewEmployee({ Employee_Name: '', Role: '', Phone_Number: '' });
      }
    } catch (error) {
      console.error('Error adding Employee:', error);
    }
  }
  return (
    <div className="dashboard">
      <h1>Owner Dashboard</h1>
      
      <section className="appointments-section">
        <h2>Upcoming Appointments</h2>
        <div className="appointments-list">
          {
          appointments.map(appointment => (

            <div key={appointment.Appointment_ID} className="appointment-card">
              <p>Date: {new Date(appointment.Appointment_Date).toLocaleDateString()}</p>
              <p>Customer: {appointment.Customer_Name}</p>
              <p>Service: {appointment.Service_Name}</p>
              <p>Employee: {appointment.Employee_Name}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="services-section">
        <h2>Manage Services</h2>
        <form onSubmit={handleAddService} className="add-service-form">
          <input
            type="text"
            placeholder="Service Name"
            value={newService.Service_Name}
            onChange={(e) => setNewService({...newService, Service_Name: e.target.value})}
          />
          <textarea
            placeholder="Service Description"
            value={newService.Service_Description}
            onChange={(e) => setNewService({...newService, Service_Description: e.target.value})}
          />
          <input
            type="number"
            placeholder="Price"
            value={newService.Price}
            onChange={(e) => setNewService({...newService, Price: e.target.value})}
          />
          <button type="submit">Add Service</button>
        </form>

        <div className="services-list">
          {services.map(service => (
            <div key={service.Service_ID} className="service-card">
              <h3>{service.Service_Name}</h3>
              <p>{service.Service_Description}</p>
              <p>Rs.{service.Price}</p>
              <button onClick={() => handleDeleteService(service.Service_ID)}>Delete</button>
            </div>
          ))}
        </div>
      </section>

      <section className="services-section">
        <h2>Manage Employees</h2>
        <form onSubmit={handleAddEmployee} className="add-service-form">
          <input
            type="text"
            placeholder="Employee Name"
            value={newEmployee.Employee_Name}
            onChange={(e) => setNewEmployee({...newEmployee, Employee_Name: e.target.value})}
          />
          <textarea
            placeholder="Employee Role"
            value={newEmployee.Roles}
            onChange={(e) => setNewEmployee({...newEmployee, Roles: e.target.value})}
          />
          <input
            type="number"
            placeholder="Phone Number"
            value={newEmployee.Phone_Number}
            onChange={(e) => setNewEmployee({...newEmployee, Phone_Number: e.target.value})}
          />
          <button type="submit">Add Employee</button>
        </form>

        <div className="services-list">
          {employees.map(employee => (
            <div key={employee.Employee_ID} className="service-card">
              <h3>{employee.Employee_Name}</h3>
              <p>{employee.Roles}</p>
              <p>{employee.Phone_Number}</p>
              <button onClick={() => handleDeleteEmployee(employee.Employee_ID)}>Delete</button>
            </div>
          ))}
        </div>
      </section>
  
    </div>
  );
}

export default OwnerDashboard;