
import {Chart} from "react-google-charts";

const ReferredUsersChart = () => {

    const data = {
      "message": "Data fetched Successfully",
      "totalMatches": 2,
      "successfulMatches": 2,
      "totalrefferedUser": 3,
      "legit_refferedUser": 1
    };
  
    const chartData = [
      ['Referral Type', 'Count'],
      ['Total Referred Users', data.totalrefferedUser],
      ['Legit Referred Users', data.legit_refferedUser],
    ];
  
    const options = {
      title: 'Referred Users Summary',
      chartArea: { width: '50%' },
      hAxis: {
        title: 'Number of Users',
        minValue: 0,
      },
      vAxis: {
        title: 'Referral Type',
      },
      colors: ['#FF9900', '#FF3366'], // Example colors
    };
  
    return (
      <Chart
        chartType="BarChart"
        width="100%"
        height="400px"
        data={chartData}
        options={options}
      />
    );
  };

  export default ReferredUsersChart;