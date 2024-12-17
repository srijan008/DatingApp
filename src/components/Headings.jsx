import React from 'react';
import '../index.css';

import image10 from '../images/image10.png';
export const Heading = () => {
    return (
        <div className="flex relative justify-center items-center h-[100%] overflow-hidden">
            {/* <div className="w-full  ml-10 p-4 mb-20">
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
            </div> */}
            <div className="flex flex-row w-full gap-1">
                {/* Rotated Slider 1 */}
                <div className="transparent overflow-hidden  inline-block transform skew-x-[-20deg]">
                    <div className="moving-images-container">
                        <img src={image10} className="w-[1000px] movingup-image skew-adjustment" style={{ '--image-index': 0 }} alt="Slider 1" />
                        <img src={image10} className="movingup-image skew-adjustment" style={{ '--image-index': 1 }} alt="Slider 1" />
                        <img src={image10} className="movingup-image skew-adjustment" style={{ '--image-index': 2 }} alt="Slider 1" />
                        <img src={image10} className="movingup-image skew-adjustment" style={{ '--image-index': 3 }} alt="Slider 1" />
                        <img src={image10} className="movingup-image skew-adjustment" style={{ '--image-index': 4 }} alt="Slider 1" />
                        <img src={image10} className="movingup-image skew-adjustment" style={{ '--image-index': 5 }} alt="Slider 1" />

                    </div>
                </div>
                <div className="transparent overflow-hidden h-[100vh] w-[70%] transform skew-x-[-20deg]">
                    <div className="moving-images-container">
                        <img src={image10} className="movingdown-image skew-adjustment" style={{ '--image-index': 0 }} alt="Slider 2" />
                        <img src={image10} className="movingdown-image skew-adjustment" style={{ '--image-index': 1 }} alt="Slider 2" />
                        <img src={image10} className="movingdown-image skew-adjustment" style={{ '--image-index': 2 }} alt="Slider 2" />
                        <img src={image10} className="movingdown-image skew-adjustment" style={{ '--image-index': 3 }} alt="Slider 1" />
                        <img src={image10} className="movingdown-image skew-adjustment" style={{ '--image-index': 4 }} alt="Slider 1" />
                        <img src={image10} className="movingdown-image skew-adjustment" style={{ '--image-index': 5 }} alt="Slider 1" />
                        
                    </div>
                </div>
                <div className="transparent overflow-hidden h-[100vh] w-[70%] transform skew-x-[-20deg]">
                    <div className="moving-images-container">
                        <img src={image10} className="movingup-image skew-adjustment" style={{ '--image-index': 0 }} alt="Slider 3" />
                        <img src={image10} className="movingup-image skew-adjustment" style={{ '--image-index': 1 }} alt="Slider 3" />
                        <img src={image10} className="movingup-image skew-adjustment" style={{ '--image-index': 2 }} alt="Slider 3" />
                        <img src={image10} className="movingup-image skew-adjustment" style={{ '--image-index': 3 }} alt="Slider 1" />
                        <img src={image10} className="movingup-image skew-adjustment" style={{ '--image-index': 4 }} alt="Slider 1" />
                        <img src={image10} className="movingup-image skew-adjustment" style={{ '--image-index': 5 }} alt="Slider 1" />
                    </div>
                </div>
                <div className="transparent overflow-hidden h-[100vh] w-[70%] transform skew-x-[-20deg]">
                    <div className="moving-images-container">
                    <img src={image10} className="movingdown-image skew-adjustment" style={{ '--image-index': 0 }} alt="Slider 2" />
                        <img src={image10} className="movingdown-image skew-adjustment" style={{ '--image-index': 1 }} alt="Slider 2" />
                        <img src={image10} className="movingdown-image skew-adjustment" style={{ '--image-index': 2 }} alt="Slider 2" />
                        <img src={image10} className="movingdown-image skew-adjustment" style={{ '--image-index': 3 }} alt="Slider 1" />
                        <img src={image10} className="movingdown-image skew-adjustment" style={{ '--image-index': 4 }} alt="Slider 1" />
                        <img src={image10} className="movingdown-image skew-adjustment" style={{ '--image-index': 5 }} alt="Slider 1" />
                    </div>
                </div>
                <div className="transparent overflow-hidden h-[100vh] w-[70%] transform skew-x-[-20deg]">
                    <div className="moving-images-container">
                        <img src={image10} className="movingup-image skew-adjustment" style={{ '--image-index': 0 }} alt="Slider 3" />
                        <img src={image10} className="movingup-image skew-adjustment" style={{ '--image-index': 1 }} alt="Slider 3" />
                        <img src={image10} className="movingup-image skew-adjustment" style={{ '--image-index': 2 }} alt="Slider 3" />
                        <img src={image10} className="movingup-image skew-adjustment" style={{ '--image-index': 3 }} alt="Slider 1" />
                        <img src={image10} className="movingup-image skew-adjustment" style={{ '--image-index': 4 }} alt="Slider 1" />
                        <img src={image10} className="movingup-image skew-adjustment" style={{ '--image-index': 5 }} alt="Slider 1" />
                    </div>
                </div>
                                <div className="transparent overflow-hidden h-[100vh] w-[70%] transform skew-x-[-20deg]">
                    <div className="moving-images-container">
                        <img src={image10} className="movingdown-image w-[500px] skew-adjustment" style={{ '--image-index': 0 }} alt="Slider 2" />
                        <img src={image10} className="movingdown-image skew-adjustment" style={{ '--image-index': 1 }} alt="Slider 2" />
                        <img src={image10} className="movingdown-image skew-adjustment" style={{ '--image-index': 2 }} alt="Slider 2" />
                        <img src={image10} className="movingdown-image skew-adjustment" style={{ '--image-index': 3 }} alt="Slider 1" />
                        <img src={image10} className="movingdown-image skew-adjustment" style={{ '--image-index': 4 }} alt="Slider 1" />
                        <img src={image10} className="movingdown-image skew-adjustment" style={{ '--image-index': 5 }} alt="Slider 1" />
                    </div>
                </div>

            </div>
        </div>
    );
};

export const MainBox = () => {
    return (
        <div className="relative w-[90%] mx-auto mt-[100px] rounded-[50px] h-[80%] border-8 border-orange-400 overflow-hidden">
            {/* Text content */}
            <div className="absolute z-10 flex flex-col justify-center items-center text-center w-full h-full text-white p-4">
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
            <Heading />
        </div>
    );
};
