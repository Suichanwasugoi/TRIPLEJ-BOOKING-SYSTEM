// Booking.js

import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../Css/Booking.css';
import '../Css/Home.css';
import Im from '../Images/Triple J Logo.png';

const Booking = () => {
  const [bookedFlights, setBookedFlights] = useState([]);
  const [searchFlight, setSearchFlight] = useState('');
  const [isPlaceholderVisible, setIsPlaceholderVisible] = useState(true);
  const navigate = useNavigate();

  const handleInputClick = () => {
    setIsPlaceholderVisible(false);
  };

  const handleInputBlur = () => {
    if (searchFlight === '') {
      setIsPlaceholderVisible(true);
    }
  };

  const handleEdit = (flight) => {
    console.log('Edit button clicked');
    navigate({
      pathname: `/book/${flight.id}`,
      state: {
        flight: flight,
      },
    });
  };

  const handleDelete = async (flightId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this flight?');
  
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:8000/api/booking/${flightId}/`);
        setBookedFlights((prevFlights) => prevFlights.filter((flight) => flight.id !== flightId));
        toast.success('Flight successfully deleted!', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
        });
      } catch (error) {
        console.error('Error during flight deletion:', error);
        toast.error('Failed to delete flight. Please try again.', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
        });
      }
    }
  };

  useEffect(() => {
    const fetchBookedFlights = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/booking/');
        setBookedFlights(response.data);
      } catch (error) {
        console.error('Error fetching booked flights:', error);
      }
    };
  
    fetchBookedFlights();
  }, []);

  const filteredFlights = bookedFlights.filter((flight) =>
    flight.flightname.toLowerCase().includes(searchFlight.toLowerCase())
  );

  return (
    <>
      <div>
        <div className='bg-gray-200 w-fill h-screen'></div>
        <nav className="text-center bg-cyan-300 w-fill h-[180px] mt-[-743px]">
          <img className="w-[200px] h-[190px] mb-[-200px]" src={Im} alt="Logo" />
          
          <button className='text-4xl ease-linear duration-200 hover:bg-cyan-400 font-custom font-bold hover:text-white hover:text-[40px] hover-transition-all ml-[700px] mt-[40px]'>
            <Link to="/home" className='block w-full p-[30px] book-now-link'>HOME</Link>
          </button>
          <button className='text-4xl ease-linear duration-200 hover:bg-cyan-400 font-custom font-bold hover:text-white hover:text-[40px] hover-transition-all ml-[20px] mt-[40px]'>
            <Link to="/book" className='block w-full p-[30px] book-now-link'>BOOK</Link>
          </button>
          <button className='text-4xl ease-linear duration-200 hover:bg-cyan-400 font-custom font-bold hover:text-white hover:text-[40px] hover-transition-all ml-[20px] mt-[40px]'>
            <Link to="/" className='block w-full p-[30px] book-now-link'>LOGOUT</Link>
          </button>
        </nav>
        <div className='backgroundcolor-link h-screen'></div>
        <div className='title-link mt-[-745px] slide-in-out font-custom'>
          BOOKED FLIGHTS
        </div>
        <div className='detail-link flex flex-col h-full'>
          <div className='search-link mt-[50px]'>
            <label className='block ml-[-100px] mt-[15px] text-4xl font-bold mb-2' htmlFor='SearchFlight'>
              Search Flight:
            </label>
            <nav className='type-link relative'>
              <input
                id='SearchFlight'
                type='text'
                value={searchFlight}
                onChange={(e) => setSearchFlight(e.target.value)}
                onClick={handleInputClick}
                onBlur={handleInputBlur}
                placeholder={isPlaceholderVisible ? 'Search For Flight Name' : ''}
                className='w-[500px] py-2 px-3 border font-custom border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring bg-cyan-100 focus:border-blue-300'
              />
            </nav>
          </div>
          <div className='info-link mt-[10px] font-custom text-2xl font-extrabold ml-[450px] text-center'>
            {filteredFlights.map((flight) => (
              <div className='bg-orange-200 content-center mr-[20px] ml-[-430px]' key={flight.id}>
                <p className='mt-[30px] ml-[-1000px]'>Flight Name</p>
                <p className='mt-[20px] ml-[-1000px]'>{flight.flightname}</p>
                <p className='mt-[-84px] ml-[-100px]'>Destination</p>
                <p className='ml-[-100px] mt-[18px]'>{flight.destination}</p>
                <p className='ml-[600px] mt-[-83px]'>Price</p>
                <p className='ml-[600px] mt-[18px]'>{flight.price}php</p>
                <p className='ml-[1100px] mt-[-82px]'>Date </p>
                <p className='ml-[1100px] mt-[18px]'>{flight.date}</p>

                <button
                  className='edit-button'
                  onClick={() => handleEdit(flight)}
                >
                  EDIT
                </button>
                <button
                  className='delete-button'
                  onClick={() => handleDelete(flight.id)}
                >
                  DELETE
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Booking;
