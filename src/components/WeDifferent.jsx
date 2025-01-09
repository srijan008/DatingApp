import {LottiePlayer3, LottiePlayer2, LottiePlayer1, LottiePlayer4} from "./LottieAnimations";
import React from "react";

export const WeDifferent = () => {


    return (
        <div className=" bg-gradient-to-b from-gray-50/50 via-[#FFE5B4] to-[#ff6600]/70 w-auto h-[101vh] flex items items-center justify-center">
            <div className="justify-center items-center flex flex-col">
                <div className="text-3xl lg:text-6xl font-bold ">
                    What Makes Us Different ?
                </div>
                <div className="text-xl">
                    (content)

                </div>
                <div className="hidden lg:flex scale-50 lg:scale-100">
                    <div className="block lg:flex">
                    <LottiePlayer1 />
                    <LottiePlayer2 />
                    </div>
                    <div className="block lg:flex">
                    <LottiePlayer3 />
                    <LottiePlayer4 />
                    </div>
                   
                </div>
            </div>

        </div>
    );
}