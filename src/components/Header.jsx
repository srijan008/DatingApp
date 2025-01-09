import React, { useState, useEffect, useRef } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import datinglogo from '../assets/datinglogo.png';


export const Header = () => {
  const [showHeader, setShowHeader] = useState(true);
  const [isloginActive, setLoginActive] = useState(false);
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

  const LoginActivate=()=>{
    setLoginActive(true);
  }

  const LoginDeactivate=()=>{
    setLoginActive(false);
  }
  


  return (
    <>
      <div
        className={`fixed top-0 left-0 w-full transition-transform duration-500 ${
          showHeader ? 'translate-y-0' : '-translate-y-full'
        } bg-gradient-to-b from-gray-600/80 via-gray-400/30 to-white/20 flex justify-between items-center z-50`}
      >
        <div className='absolute'>
        {isloginActive ? <LoginForm cross ={LoginDeactivate} /> : ""}
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
          <button onClick={LoginActivate} className="rounded-full bg-gradient-to-br from-[#ff6600] to-pink-400 text-white font-bold px-[2px] py-[2px] mt-5 mb-5 mr-5">
            <div className='bg-white py-[6px] px-[20px] text-black rounded-full hover:bg-gradient-to-tl hover:from-pink-400 hover:to-[#ff6600] hover:text-white '>
                Admin Login
            </div>
          </button>
        </div>
      </div>

      {/* First screen reference div */}
      <div ref={firstScreenRef} className=" w-full">
        {/* Empty div to measure visibility */}
      </div>
    </>
  );
};


const LoginForm = ({ cross }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the login submission here (e.g., call an API)
    console.log('Form submitted:', formData);
  };

  return (
    <section className="absolute flex flex-col w-[100vw] h-[100vh] mt-[-42px] justify-center bg-black/80 dark:bg-gray-900">
      <div className="flex flex-row justify-end mt-10 mr-10">
        <button onClick={cross}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 bg-white rounded-xl">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="flex flex-col items-center w-[90%] lg:w-[50%] justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-white dark:text-white">
          <img className="w-10 h-10" src={datinglogo} alt="logo" />
          Famly.in
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Admin Login
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required
                />
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                  </div>
                </div>
                <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
              </div>
              <button type="submit" className="w-full text-white bg-orange-400 py-2 rounded-xl hover:bg-orange-300">
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Header;

