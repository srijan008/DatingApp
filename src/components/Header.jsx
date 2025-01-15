import React, { useState, useEffect, useRef } from 'react';
import { Navigate, useNavigate, Link } from 'react-router-dom';
import datinglogo from '../assets/datinglogo.png';


export const Header = () => {
  const [showHeader, setShowHeader] = useState(true);
  const firstScreenRef = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // If the first section is less than 5% visible, hide the header
        setShowHeader(entry.intersectionRatio > 0.05);
      },
      {
        root: null, // Observe within the viewport
        threshold: Array.from({ length: 101 }, (_, i) => i / 100), // 0% to 100%
      }
    );

    if (firstScreenRef.current) {
      observer.observe(firstScreenRef.current);
    }

    return () => {
      if (firstScreenRef.current) {
        observer.unobserve(firstScreenRef.current);
      }
    };
  }, []);

  return (
    <>
      <div
        className={`fixed top-0 left-0 w-full transition-transform duration-500 ${
          showHeader ? 'translate-y-0' : '-translate-y-full'
        } bg-gradient-to-b from-gray-600/80 via-gray-400/30 to-white/20 flex justify-between items-center z-50`}
      >
        <div className='absolute'>
        </div>
        <div className="flex items-center text-lg ">
        <img src={datinglogo} alt="heart" className=" ml-5 w-[40px] lg:w-[60px] inline" />
          <div className="flex m text-[#F47C20] font-bold text-2xl lg:text-4xl mr-5 justify-center">
            famly.in
            </div>
          <div className="m-4 hidden lg:block sm:hidden hover:text-orange-500 hover:underline cursor-pointer">Products</div>
          <div className="m-4 hidden lg:block sm:hidden hover:text-orange-500 hover:underline cursor-pointer">Safety</div>
          <div className="m-4 hidden lg:block sm:hidden hover:text-orange-500 hover:underline cursor-pointer">Learn</div>
          <div className="m-4 hidden lg:block sm:hidden hover:text-orange-500 hover:underline cursor-pointer">Download</div>
          <div className="m-4 hidden lg:block sm:hidden hover:text-orange-500 hover:underline cursor-pointer">Support</div>
        </div>
        <div className="flex">
          <button className="lg:flex py-2 mr-[-10px] hidden   m-5 text-sm lg:text-base rounded-full bg-black hover:bg-gray-600 text-white font-bold px-2 lg:m-5">
            <div className='mr-2'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 lg:size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m10.5 21 5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 0 1 6-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 0 1-3.827-5.802" />
            </svg>
            </div>
            Language
          </button>
          <Link to = '/login' className="rounded-full bg-gradient-to-br from-[#ff6600] to-pink-400 text-white font-bold px-[2px] py-[2px] mt-5 mb-5 mr-5">
            <div className='bg-white py-[6px] px-[20px] text-black rounded-full hover:bg-gradient-to-tl hover:from-pink-400 hover:to-[#ff6600] hover:text-white '>
                Admin Login
            </div>
          </Link>
        </div>
      </div>

      {/* First screen reference div */}
      <div ref={firstScreenRef} className=" w-full">
        {/* Empty div to measure visibility */}
      </div>
    </>
  );
};

export default Header;

