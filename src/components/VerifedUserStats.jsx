import { Chart } from "react-google-charts";

const UserStatsPieChart = ({ data }) => {
    const options = {
        title: "User Statistics",
        is3D: false, 
        colors: ["#007bff", "#28a745"], 
    };

    const verified = data?.data?.userType?.verified || 0;
    const unverified = data?.data?.userType?.unverified || 0;

    // Correct data format with headers
    const chartData = [
        ["User Type", "Count"],
        ["Verified Users", verified],
        ["Unverified Users", unverified],
    ];

    return (
        <Chart
            chartType="PieChart"
            data={chartData}
            options={options}
            width={"100%"}
            height={"400px"}
        />
    );
};

export default UserStatsPieChart;
