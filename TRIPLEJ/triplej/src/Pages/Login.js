// Login.js

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Im from '../Images/bg.png';
import Ims from '../Images/Triple J Logo.png';
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    setError(null);
  
    try {
      const response = await axios.post('http://localhost:8000/api/login/', { email, password }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.status === 200) {
        const data = response.data;
        localStorage.setItem('token', data.token);
        navigate('/home');
      } else {
        // Handle error responses
        const errorData = response.data; // Assuming your error message is in the 'data' field
        setError(errorData.error || 'Login failed');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Log In */}
      <div>
        <div className="flex flex-col bg-cyan-100 justify-center items-center h-screen">
          <div>
            <img className="w-[1550px] h-[722px]" src={Im} alt="Background" />
          </div>
          <div className="flex flex-col justify-center items-center mt-[-450px] mb-[25px] bg-cyan-200 h-[300px] w-[300px] border-green-800 border-2 rounded-xl">
            <img className="w-[200px] h-[200px] mt-[-250px] mb-[-150px]" src={Ims} alt="Logo" />
            <div className="flex flex-row justify-center mt-[200px] mb-[10px]">Login</div>
            <div className="mb-2 text-red-500">{error}</div>
            Email
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <br />

            Password
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              id="submit"
              className="rounded-sm border-2 roundedx1 px-3 mt-6 bg-white"
              onClick={handleLogin}
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Log In'}
            </button>

            <button
              id="signup"
              className="rounded-sm border-2 roundedx1 px-3 mt-4 mb-6 bg-white"
            >
              <Link to="/signup">Sign Up</Link>
            </button>
          </div>
          <br />
          <div className="text-center content-center mt-[50px] text-2xl text-blue-900">
            <footer>TriPLEJ Corporation</footer>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
