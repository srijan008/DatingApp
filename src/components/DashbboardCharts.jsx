import React from 'react';
import { Chart } from 'react-google-charts';

const data = {

    "age": {
        "41_50": 3,
        "51_60": 1,
        "61_70": 1,
        "71_80": 1,
        "81_90": 0
    },
    "gender": {
        "Man": 0,
        "Woman": 0,
        "Gay": 0,
        "Lesbian": 0,
        "Trans": 0,
        "Non_binary": 0,
        "Gender_fluid": 0,
        "Other": 91
    },
    "religion": {
        "Christian": 0,
        "Muslim": 0,
        "Hindu": 0,
        "Buddhist": 0,
        "Jewish": 0,
        "Atheist": 0,
        "Agnostic": 0,
        "Spiritual_but_not_religious": 0,
        "Other": 91
    },
    "smoking": {
        "yes": 0,
        "no": 0,
        "rarely": 0,
        "occasionally": 0
    },
    "drinking": {
        "yes": 0,
        "no": 0,
        "rarely": 0,
        "occasionally": 0
    },
    "food_pref": {
        "Vegetarian": 0,
        "Eggetarian": 0,
        "Non_Vegetarian": 0,
        "Vegan": 0,
        "Pescatarian": 0,
        "No_Preferences": 0,
        "Other": 91
    },
    "relationShip": {
        "Casual": 0,
        "Long_term_relationship": 0,
        "Friendship": 0,
        "Open_relationship": 0,
        "Marriage": 0,
        "Just_looking_to_chat": 0
    },
    "languages": {
        "Assamese": 0,
        "Bengali": 0,
        "Bodo": 0,
        "Dogri": 0,
        "Gujarati": 0,
        "Hindi": 0,
        "Kannada": 0,
        "Kashmiri": 0,
        "Konkani": 0,
        "Maithili": 0,
        "Malayalam": 0,
        "Manipuri": 0,
        "Marathi": 0,
        "Nepali": 0,
        "Oriya": 0,
        "Punjabi": 0,
        "Sanskrit": 0
    },
    "zodiac": {
        "Aries": 0,
        "Taurus": 0,
        "Gemini": 0,
        "Cancer": 0,
        "Leo": 0,
        "Virgo": 0,
        "Libra": 0,
        "Scorpio": 0,
        "Sagittarius": 0,
        "Capricorn": 0,
        "Aquarius": 0,
        "Pisces": 0
    }
};

const createChartData = (dataObject, categoryName) => {
    return [
        [categoryName, 'Count'],
        ...Object.entries(dataObject).map(([key, value]) => [key, value]),
    ];
};

const ChartComponent = ({ chartType, dataObject, title, categoryName }) => {
    const chartData = createChartData(dataObject, categoryName);
    const options = {
        title: title,
        is3D: chartType === "PieChart",
    };

    return (
        <Chart
            chartType={chartType}
            data={chartData}
            options={options}
            width={"100%"}
            height={"400px"}
        />
    );
};

export default ChartComponent;
