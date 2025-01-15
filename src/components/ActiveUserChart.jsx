import {Chart} from "react-google-charts";


const UserStatsPieChart = () => {

    const data = {
        "message": "Categories retrieved successfully",
        "data": {
            "dailyUser": 10,
            "newUser": 73,
            "retainedUser": 10,
            "inactiveUser": 14
        }
    };

    const chartData = [
        ['User Type', 'Count'],
        ['Daily Users', data.data.dailyUser],
        ['New Users', data.data.newUser],
        ['Retained Users', data.data.retainedUser],
        ['Inactive Users', data.data.inactiveUser],
    ];

    const options = {
        title: 'User Statistics',
        is3D: false, // Optional: for a 3D pie chart
        colors: ['#007bff', '#28a745', '#dc3545', '#ffc107'], // Bootstrap-like colors
    };

    return (
        <Chart
            chartType="PieChart"
            data={chartData}
            options={options}
            width={"full"}
            height={"400px"}
        />
    );
};

export default UserStatsPieChart;