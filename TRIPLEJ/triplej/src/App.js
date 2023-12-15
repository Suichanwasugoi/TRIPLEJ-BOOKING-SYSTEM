import { Routes, Route  } from 'react-router-dom';
import Home from './Pages/Home.js';
import Booking from './Pages/Booking.js';
import Login from './Pages/Login.js';
import Signup from './Pages/SignUp.js';
import Book from './Pages/Book.js';


function App() {
  return (
    <div className = " bg-cyan-100 h-full">
      <Routes>
        <Route path = "/home" element = {<Home/>}/>
        <Route path ="/booking" element = {<Booking/>}/>
        <Route path="/booking/:flightId" element={<Booking />} />
        <Route path="/book/:flightId" element={<Book />} />
        <Route path ="/book" element = {<Book/>}/>
        <Route path ="/" element = {<Login/>}/>
        <Route path ="/signup" element = {<Signup/>}/>
      </Routes>
    </div>
  );
}

export default App;
