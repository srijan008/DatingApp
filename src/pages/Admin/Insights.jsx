import React, { useEffect, useState } from 'react';
import { Chart } from "react-google-charts";
import MatchesChart from '../../components/MatchRatiosChart';
import ReferredUsersChart from '../../components/refferedUserChart';
import UserStatsPieChart from '../../components/ActiveUserChart';
import VerifiedUserStats from '../../components/VerifedUserStats.jsx'
import ChartComponent from '../../components/DashbboardCharts';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { ThreeCircles } from 'react-loader-spinner';
import Loader from '../../components/Loader/Loader';
// import {data} from '../../components/DashbboardCharts';

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


const InsightsDashboard = () => {

  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const token = window.sessionStorage.getItem('token');
      
      if (!token) {
        setError('No authentication token found');
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const response = await axios.get('http://13.235.72.216/auth/get-dashboard-items', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (response.data) {
          console.log(response.data);
          setData(response.data);
          toast.success("Data fetched successfully!");
        } else {
          setError('No data received from server');
          toast.error('There was error fetching data!');
        }
      } catch (error) {
        const errorMessage = error.response?.data?.message || error.message || 'An error occurred while fetching data';
        setError(errorMessage);
        toast.error(errorMessage);
        console.error('Dashboard data fetch error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    getData();
  }, []); // Remove setData from dependencies as it's stable

  if (isLoading) {
    return <div className="flex justify-center items-center bg-gray-100/70 h-[90vh] w-full">
      <div className='flex flex-col justify-center items-center'>
      <Loader />


      <div className='flex justify-center items-center'>
        <div className="text-4xl font-base font-mono m-10">Loading...</div>
      </div>
      </div>
    </div>;
  }

  if (error) {
    return <div className="text-red-600 p-4">Error: {error}</div>;
  }
  const profileCompletionData = [
    ["Status", "Percentage"],
    ["Complete", 65],
    ["Partial", 25],
    ["Minimal", 10],
  ];

  const chartOptions = {
    titleTextStyle: { color: "#333", fontSize: 16 },
    chartArea: { width: "80%", height: "70%" },
    legend: { position: "bottom" },
    backgroundColor: '#ffffff',
  };

  return (
    <div style={{
      padding: '20px',
      minHeight: '100vh'
    }} className='bg-white/50 rounded-lg'>
      <Toaster position='top-center'/>
      <h1 style={{
        fontSize: '34px',
        fontWeight: 'bold',
        color: '#333',
        marginBottom: '20px',
        textAlign: 'center'
      }} >
        Analytics Dashboard
      </h1>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))',
        gap: '20px',
      }}>
        {/* Active Users Card */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '8px',
          padding: '20px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{
            fontSize: '18px',
            fontWeight: 'bold',
            color: '#333',
            marginBottom: '15px'
          }}>Active Users Ratio</h2>
          <UserStatsPieChart/>
        </div>
        {/* Verifed vs Unverified ratio */}

        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '8px',
          padding: '20px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{
            fontSize: '18px',
            fontWeight: 'bold',
            color: '#333',
            marginBottom: '15px'
          }}>Verified User Status</h2>
          <VerifiedUserStats data={{data}}/>
        </div>

        {/* Profile Completion Card */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '8px',
          padding: '20px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{
            fontSize: '18px',
            fontWeight: 'bold',
            color: '#333',
            marginBottom: '15px'
          }}>Profile Completion</h2>
          <Chart
            chartType="PieChart"
            width="100%"
            height="300px"
            data={profileCompletionData}
            options={{
              ...chartOptions,
              pieHole: 0.4,
              colors: ["#0088FE", "#00C49F", "#FFBB28"],
            }}
          />
        </div>

        {/* Match Ratios Card */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '8px',
          padding: '20px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{
            fontSize: '18px',
            fontWeight: 'bold',
            color: '#333',
            marginBottom: '15px'
          }}>Match & Success Rates</h2>
          <MatchesChart/>
        </div>
          {/*RefferedUsers Card */}
          <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '8px',
          padding: '20px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{
            fontSize: '18px',
            fontWeight: 'bold',
            color: '#333',
            marginBottom: '15px'
          }}>Admin Referrals</h2>
          <ReferredUsersChart/>
        </div>
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '8px',
          padding: '20px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{
            fontSize: '18px',
            fontWeight: 'bold',
            color: '#333',
            marginBottom: '15px'
          }}>Food Preferences</h2>
             <ChartComponent chartType="PieChart" dataObject={data.food_pref} title="Food Preferences" categoryName="Food Preferences"/>
        </div>
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '8px',
          padding: '20px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{
            fontSize: '18px',
            fontWeight: 'bold',
            color: '#333',
            marginBottom: '15px'
          }}>Drinking habits</h2>
             <ChartComponent chartType="ColumnChart" dataObject={data.drinking} title="Drinking Habits" categoryName="Drinking"/>
        </div>
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '8px',
          padding: '20px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{
            fontSize: '18px',
            fontWeight: 'bold',
            color: '#333',
            marginBottom: '15px'
          }}>Smoking Habits</h2>
            <ChartComponent chartType="ColumnChart" dataObject={data.smoking} title="Smoking Habits" categoryName="Smoking"/>
        </div>
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '8px',
          padding: '20px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{
            fontSize: '18px',
            fontWeight: 'bold',
            color: '#333',
            marginBottom: '15px'
          }}>Religion Distribution</h2>
            <ChartComponent chartType="PieChart" dataObject={data.religion} title="Religion Distribution" categoryName="Religion"/>
        </div>
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '8px',
          padding: '20px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{
            fontSize: '18px',
            fontWeight: 'bold',
            color: '#333',
            marginBottom: '15px'
          }}>Gender Distribution</h2>
            <ChartComponent chartType="PieChart" dataObject={data.gender} title="Gender Distribution" categoryName = "Gender"/>
        </div>
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '8px',
          padding: '20px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{
            fontSize: '18px',
            fontWeight: 'bold',
            color: '#333',
            marginBottom: '15px'
          }}>Age Distribution</h2>
        <ChartComponent chartType="ColumnChart" dataObject={data.age} title="Age Distribution" categoryName="Age Range" />
        </div>

            {/* You can add more charts here as needed */}
            {/* Example for Smoking (Bar Chart) */}
        
      </div>
    </div>
  );
};

export default InsightsDashboard;