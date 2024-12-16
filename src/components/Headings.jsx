import React from 'react';
import Logo from '../assets/datinglogo.png';
import '../index.css';
import image1 from '../images/image1.png';
import image2 from '../images/image2.png';
import image3 from '../images/image3.png';
import image4 from '../images/image4.png';
import image5 from '../images/image5.png';
import image6 from '../images/image6.png';
import image7 from '../images/image7.png';
import image8 from '../images/image8.png';
import image9 from '../images/image9.png';

export const Heading = () => {
    return (
        <div className="flex justify-center pb-[15%] items-center h-[100%] overflow-hidden">
            <div className="w-full  ml-10 p-4 mb-20">
                <div className="font-bold text-7xl mb-3">
                    Start Of Something New
                </div>
                <div className="text-3xl">
                    Description (optional)
                </div>
                <div className="flex mt-[5%]">
                    <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-base font-medium text-gray-900 rounded-full group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white focus:ring-4 focus:outline-none focus:ring-pink-200">
                        <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white rounded-full group-hover:bg-opacity-0">
                            Make Account
                        </span>
                    </button>
                </div>
            </div>
            <div className="flex flex-row w-full mt-10 gap-4">
                {/* Rotated Slider 1 */}
                <div className="bg-red-400 overflow-hidden h-[100vh] inline-block w-[70%] transform skew-x-[-20deg]">
                    <div className="moving-images-container">
                        <img src={image1} className="movingup-image skew-adjustment" style={{ '--image-index': 0 }} alt="Slider 1" />
                        <img src={image2} className="movingup-image skew-adjustment" style={{ '--image-index': 1 }} alt="Slider 1" />
                        <img src={image3} className="movingup-image skew-adjustment" style={{ '--image-index': 2 }} alt="Slider 1" />
                    </div>
                </div>
                <div className="bg-green-400 overflow-hidden h-[100vh] w-[70%] transform skew-x-[-20deg]">
                    <div className="moving-images-container">
                        <img src={image4} className="movingdown-image skew-adjustment" style={{ '--image-index': 0 }} alt="Slider 2" />
                        <img src={image5} className="movingdown-image skew-adjustment" style={{ '--image-index': 1 }} alt="Slider 2" />
                        <img src={image6} className="movingdown-image skew-adjustment" style={{ '--image-index': 2 }} alt="Slider 2" />
                    </div>
                </div>
                <div className="bg-blue-400 overflow-hidden h-[100vh] w-[70%] transform skew-x-[-20deg]">
                    <div className="moving-images-container">
                        <img src={image7} className="movingup-image skew-adjustment" style={{ '--image-index': 0 }} alt="Slider 3" />
                        <img src={image8} className="movingup-image skew-adjustment" style={{ '--image-index': 1 }} alt="Slider 3" />
                        <img src={image9} className="movingup-image skew-adjustment" style={{ '--image-index': 2 }} alt="Slider 3" />
                    </div>
                </div>

            </div>
        </div>
    );
};
