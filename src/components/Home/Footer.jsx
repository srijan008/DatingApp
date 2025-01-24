import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaInstagram, FaFacebook, FaLinkedin, FaArrowRight } from 'react-icons/fa';

const Footer = () => {
    const navigate = useNavigate();

    const handleClick = (url) => {
        window.scrollTo(0, 0);
        navigate(url);
    };

    return (
        <footer className="bg-[#f47c20] py-16 px-10 w-full">
            {/* Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

                {/* Subscribe Section */}
                <div className='flex flex-col items-start gap-4'>
                    <h1 className='text-xl font-bold'>Subscribe</h1>
                    <div className="text-[#8a8888] bg-[#d9d9d9] flex rounded-md w-full text-lg items-center pr-4">
                        <input
                            type="text"
                            placeholder="Enter your Email"
                            className="bg-[#d9d9d9] flex-grow px-4 outline-none rounded-l-md py-3"
                        />
                        <button className="bg-[#f47c20] h-[40px] w-[40px] rounded-full cursor-pointer flex items-center justify-center">
                            <FaArrowRight size={15} className="text-white" />
                        </button>
                    </div>
                </div>

                {/* Helps & Support */}
                <div className='flex flex-col items-center'>
                    <h1 className='text-xl font-bold pb-2'>Helps & Support</h1>
                    <ul className="flex flex-col gap-2 text-lg text-center">
                        <li>
                            <a
                            //  onClick={() => handleClick('/about')}
                              className="cursor-pointer hover:text-white">About Us</a></li>
                        <li><a 
                        // onClick={() => handleClick('/contact')} 
                        
                        className="cursor-pointer hover:text-white">Contact Us</a></li>
                        <li><a 
                        // onClick={() => handleClick('/feedback')} 
                        className="cursor-pointer hover:text-white">Feedback</a></li>
                        <li><a
                        //  onClick={() => handleClick('/faq')} 
                         
                         className="cursor-pointer hover:text-white">FAQ</a></li>
                    </ul>
                </div>

                {/* Information */}
                <div className='flex flex-col items-center'>
                    <h1 className='text-xl font-bold pb-2'>Information</h1>
                    <ul className="flex flex-col gap-2 text-lg text-center">
                        <li><a onClick={() => handleClick('/privacy-policy')} className="cursor-pointer hover:text-white">Privacy Policy</a></li>
                        <li><a onClick={() => handleClick('/terms-and-conditions')} className="cursor-pointer hover:text-white">Terms and Conditions</a></li>
                        <li><a 
                        // onClick={() => handleClick('/cookies-policy')} 

                        className="cursor-pointer hover:text-white">Cookies Policy</a></li>
                        <li><a onClick={() => handleClick('/fraud-alert')} className="cursor-pointer hover:text-white">Fraud Alert</a></li>
                    </ul>
                </div>

                {/* Social Media */}
                <div className='flex flex-col items-center'>
                    <h1 className='text-xl font-bold pb-2'>Follow Us</h1>
                    <div className='flex gap-6'>
                        <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
                            <FaInstagram size={40} className='cursor-pointer hover:text-white' />
                        </a>
                        <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
                            <FaFacebook size={40} className='cursor-pointer hover:text-white' />
                        </a>
                        <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer">
                            <FaLinkedin size={40} className='cursor-pointer hover:text-white' />
                        </a>
                    </div>
                </div>

                

            </div>
            <div className='text-left text-lg pt-6 font-semibold'>
            Copyright © 2025 famly.in, All rights reserved
            </div>
        </footer>
    );
};

export default Footer;
