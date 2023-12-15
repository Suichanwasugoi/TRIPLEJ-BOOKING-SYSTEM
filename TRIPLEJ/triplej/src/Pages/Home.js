import { Link } from 'react-router-dom';
import '../Css/Home.css'
import Carousel from '../Pages/Carousel.js';
import Im from '../Images/Triple J Logo.png'
import Im2 from '../Images/NewCanvas1.png'
import Im3 from '../Images/NewCanvas2.png'
import Im4 from '../Images/NewCanvas3.png'
import '../Css/Carousel.css'

export default function Home(){
  const carouselImages = [
    Im2,
    Im3,
    Im4,
  ];
  return (
    <>
      <div>
        <div className='bg-cyan-100 w-fill h-screen'></div>
        <nav className="text-center bg-cyan-300 w-fill h-[180px] mt-[-743px]">
          <img className="w-[200px] h-[190px] mb-[-200px]" src={Im} />
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
          <Carousel images={carouselImages} />
          <div className='mt-[-350px] ml-[1100px] animate-bounce delay-200'>
            <button className='text-4xl font-custom font-bold'>
             <Link to="/book" className='block w-full p-[30px] book-now-link2'>
               BOOK NOW!
             </Link>
            </button>
          </div>

      </div>

      </>
  );
}