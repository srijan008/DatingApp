import React from 'react';
import Lottie from 'lottie-react';

// Generic Lottie Animation Component
const LottieAnimation = ({ animationData, height = 200, width = 200, loop = true, autoplay = true }) => {
    return (
        <Lottie
            animationData={animationData}
            autoplay={autoplay}
            loop={loop}
            style={{ height, width }}
        />
    );
};

// JSON Animations (use `process.env.PUBLIC_URL` for public folder paths in React)
import default1 from '../assets/lotties/female_def.json';
import default2 from '../assets/lotties/male_def.json';
import default3 from '../assets/lotties/subuser_female.json';
import default4 from '../assets/lotties/subuser_male.json';

// Reusable Components with Specific Animations
export const LottiePlayer1 = () => (
    <LottieAnimation height={300} width={300} animationData={default1} />
);

export const LottiePlayer2 = () => (
    <LottieAnimation height={300} width={300} animationData={default2} />   
);

export const LottiePlayer3 = () => (
    <LottieAnimation height={300} width={300} animationData={default3} />
);

export const LottiePlayer4 = () => (
    <LottieAnimation height={300} width={300} animationData={default4} />
);

export default LottieAnimation;
