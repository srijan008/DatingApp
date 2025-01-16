import React from 'react';
import { Chart } from 'react-google-charts';


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
