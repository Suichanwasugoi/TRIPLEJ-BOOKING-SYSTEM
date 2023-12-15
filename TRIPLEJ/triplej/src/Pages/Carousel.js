import React, { useState, useEffect } from 'react';
import Im2 from '../Images/NewCanvas1.png'
import Im3 from '../Images/NewCanvas2.png'
import Im4 from '../Images/NewCanvas3.png'
import '../Css/Carousel.css';

const Carousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      nextSlide();
    }, 20000); // Change slide every 3000 milliseconds (3 seconds)

    // Clear the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, [currentIndex]); // Re-run effect when currentIndex changes

  return (
    <div className="carousel-container">
      <button className="prev-btn" onClick={prevSlide}>
        &lt;
      </button>
      <div className="carousel">
        {images.map((image, index) => (
          <div
            key={index}
            className={`slide ${
              index === currentIndex ? 'active' : 'hidden'
            }`}
          >
            <img src={image} alt={`Slide ${index + 1}`} />
          </div>
        ))}
      </div>
      <button className="next-btn" onClick={nextSlide}>
        &gt;
      </button>
    </div>
  );
};


// Sample images
const images = [
    Im2,
    Im3,
    Im4,
];

// App component
const App = () => {
  return (
    <>
    <div className='w-[980px] mt-2 ml-[20px]'>
      <Carousel images={images} />
    </div>
    </>
  );
};

export default App;
