import React from 'react';

export const Heading = () => {
    return (
        <div className="flex justify-center pb-[15%] items-center h-[80%]">
            <div className="w-full">
                <div className="font-bold text-8xl mb-3 text-center">
                    Start Of Something New
                </div>
                <div className="text-3xl text-center">
                    Description (optional)
                </div>
                <div className="flex justify-center mt-[5%]">
                    <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-base font-medium text-gray-900 rounded-full group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white focus:ring-4 focus:outline-none focus:ring-pink-200">
                        <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white rounded-full group-hover:bg-opacity-0">
                            Make Account
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
}