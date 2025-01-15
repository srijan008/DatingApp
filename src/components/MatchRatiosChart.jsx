import {Chart} from "react-google-charts";



const MatchesChart = () => {

    const data = {
      "message": "Data fetched Successfully",
      "totalMatches": 2,
      "successfulMatches": 2,
      "totalrefferedUser": 3,
      "legit_refferedUser": 1
    };
  
    
    const chartData = [
      ['Match Type', 'Count'],
      ['Total Matches', data.totalMatches],
      ['Successful Matches', data.successfulMatches],
    ];
  
    const options = {
      title: 'Matches Summary',
      chartArea: { width: '50%' },
      hAxis: {
        title: 'Number of Matches',
        minValue: 0,
      },
      vAxis: {
        title: 'Match Type',
      },
      colors: ['#3366CC', '#00CC99'], // Example colors
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

  export default MatchesChart;