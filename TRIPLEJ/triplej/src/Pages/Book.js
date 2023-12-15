// Book.js

import React, { useState, useEffect } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../Css/Home.css';
import '../Css/Book.css';
import Im from '../Images/Triple J Logo.png';
import axios from 'axios';

const Book = () => {
  const { flightId } = useParams();
  const location = useLocation();
  const [flightName, setFlightName] = useState('');
  const [destination, setDestination] = useState('');
  const [price, setPrice] = useState('');
  const [date, setDate] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Check if the flight information is available in the location state
        let flightData = location.state?.flight;

        // If not available in state, fetch data from the API
        if (!flightData && flightId) {
          const response = await axios.get(`http://localhost:8000/api/booking/${flightId}/`);
          flightData = response.data;
        }

        const { flightname, destination, price, date } = flightData;
        setFlightName(flightname);
        setDestination(destination);
        setPrice(price);
        setDate(date);
      } catch (error) {
        console.error('Error fetching flight details:', error);
      }
    };

    fetchData();
  }, [flightId, location.state]);

  const handleBook = async () => {
    try {
      if (flightId) {
        // If flightId is present, it means we are editing an existing flight
        await axios.put(`http://localhost:8000/api/booking/${flightId}/`, {
          flightname: flightName,
          destination: destination,
          price: price,
          date: date,
        });
      } else {
        // If flightId is not present, it means we are creating a new flight
        await axios.post('http://localhost:8000/api/booking/', {
          flightname: flightName,
          destination: destination,
          price: price,
          date: date,
        });
      }
  
      // Booking or update successful, show success notification
      toast.success(flightId ? 'Flight successfully updated!' : 'Flight successfully booked!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
      });
  
      // Clear input fields
      setFlightName('');
      setDestination('');
      setPrice('');
      setDate('');
  
      // Redirect to the Booking page after successful booking or update
      navigate('/booking');
    } catch (error) {
      console.error('Error during booking or update:', error);
      // Handle the error and show an error message
      toast.error('Failed to book or update flight. Please try again.', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
      });
    }
  };

  return (
    <>
      <div>
        <div className='bg-gray-100 w-fill h-screen'></div>
        <nav className="text-center bg-cyan-300 w-fill h-[180px] mt-[-743px]">
          <img className="w-[200px] h-[190px] mb-[-200px]" src={Im} alt="Logo" />
          <button className='text-4xl ease-linear duration-200 hover:bg-cyan-400 font-custom font-bold hover:text-white hover:text-[40px] hover-transition-all ml-[700px] mt-[40px]'>
            <Link to="/home" className='block w-full p-[30px] book-now-link'>HOME</Link>
          </button>
          <button className='text-4xl ease-linear duration-200 hover:bg-cyan-400 font-custom font-bold hover:text-white hover:text-[40px] hover-transition-all ml-[20px] mt-[40px]'>
            <Link to="/booking" className='block w-full p-[30px] book-now-link'>BOOKING</Link>
          </button>
          <button className='text-4xl ease-linear duration-200 hover:bg-cyan-400 font-custom font-bold hover:text-white hover:text-[40px] hover-transition-all ml-[20px] mt-[40px]'>
            <Link to="/" className='block w-full p-[30px] book-now-link'>LOGOUT</Link>
          </button>
        </nav>
        <div className='background-link h-[562px]'></div>
      </div>
      <div className='input-link'>
        <div className='details-link'>
          <div className='flightname-link'>
            Flight Name:
            <nav className='type-link1'>
              <input id="FlightName" type="text" value={flightName} onChange={(e) => setFlightName(e.target.value)} />
            </nav>
          </div>

          <div className='destination-link'>
            Destination:
            <nav className='type-link2'>
              <input id="Destination" type="text" value={destination} onChange={(e) => setDestination(e.target.value)} />
            </nav>
          </div>

          <div className='price-link'>
            Price:
            <nav className='type-link3'>
              <input id="Price" type="text" value={price} onChange={(e) => setPrice(e.target.value)} />
            </nav>
          </div>

          <div className='date-link'>
            Date:
            <nav className='type-link4'>
              <input id="Date" type="text" value={date} onChange={(e) => setDate(e.target.value)} />
            </nav>
          </div>
          <div>
            <button
              id="SUBMIT"
              className="rounded-sm border-2 roundedx1 px-3 mt-6 bg-white"
              onClick={handleBook}
            >
              BOOK
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Book;
