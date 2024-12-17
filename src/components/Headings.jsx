import React from 'react';
import '../index.css';

const RotatedImageSlider = () => {
  return (
    <div className="slider-container mt-[-30px]">
      {/* Render 5-6 rotated divs */}
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="rotated-div">
          {/* Sliding Images */}
          <div
            className={`image-slider ${
              index % 2 === 0 ? "slide-down" : "slide-up"
            }`}
          >
            {/* Repeated images for seamless effect */}
            {Array.from({ length: 6 }).map((_, imgIndex) => (
              <img
                key={imgIndex}
                src={`https://via.placeholder.com/200x300?text=Image+${imgIndex + 1}`}
                alt={`image-${imgIndex}`}
                className="slider-image"
              />
            ))}
            {/* Duplicate images for seamless loop */}
            {Array.from({ length: 6 }).map((_, imgIndex) => (
              <img
                key={`duplicate-${imgIndex}`}
                src={`https://via.placeholder.com/200x300?text=Image+${imgIndex + 1}`}
                alt={`image-${imgIndex}`}
                className="slider-image"
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
export default RotatedImageSlider;


export const MainBox = () => {
    return (
        <div className="relative w-[90%] mx-auto mt-[100px] rounded-[50px] h-[80%] border-8 border-orange-400 overflow-hidden">
            {/* Text content */}
            <div className="absolute z-10 flex flex-col justify-center items-center text-center w-full h-full text-black p-4">
                <div className="font-bold text-8xl mb-3">
                    Start Of Something New
                </div>
                <div className="text-3xl mb-5">
                    Description (optional)
                </div>
                <div className="flex">
                    <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-base font-medium text-gray-900 rounded-full group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white focus:ring-4 focus:outline-none focus:ring-pink-200">
                        <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white rounded-full group-hover:bg-opacity-0">
                            Make Account
                        </span>
                    </button>
                </div>
            </div>

            {/* Background sliders */}
            <RotatedImageSlider />
        </div>
    );
};
