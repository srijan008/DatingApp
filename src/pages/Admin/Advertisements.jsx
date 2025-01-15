import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../../components/Searchbar';
import toast from 'react-hot-toast';
import {Oval, Comment } from 'react-loader-spinner'
import axios from 'axios';
const Advertisements = () => {
  const [loading, setLoading] = useState(true);
  const [ads, setAds] = useState([]);

  useEffect(() => {
    const getAds = async () => {
      const token = window.sessionStorage.getItem("token");
      if (!token) {
        console.error("Authentication token not found!");
        return;
      }

      try {
        const response = await axios.get(
          "http://13.235.72.216/auth/get-classifieduser-for-admin",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if(response.data.message === "classifieduser retrieved successfully") {
          toast.success(response.data.message);
          setAds(response.data.classifieduser);
          setLoading(false);
      } else {
        toast.error("Failed to retrieve ads");
        console.error("Failed to retrieve ads");
      }

      } catch (error) {
        console.error("Error fetching ads:", error);
      }
    };

    getAds();
  }, []);

  return (
    <div className='bg-white/20 p-5'>
      <div>
        <SearchBar/>
      </div>
      {loading ? ( <div className='flex justify-center'>
        <Comment
          visible={true}
          height="80"
          width="80"
          ariaLabel="comment-loading"
          wrapperStyle={{}}
          wrapperClass="comment-wrapper"
          color="#fff"
          backgroundColor="#F4442E"
          />
      </div>) : " "}
     
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 rounded-xl">
        {ads.map((ad) => (
          <div key={ad.id} className="bg-white rounded-lg shadow-md p-4">
            <div className="flex flex-col justify-between mt-4">
              <UserCard user={ad} />
              <div className='flex justify-center'>
              <Link to={`/admin/editform/${ad.id}`} className="text-blue-500 mt-4 hover:text-orange-400 transition transform hover:-translate-y-0.5">
                View Details
              </Link>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>

  );
}

const UserCard = ({ user }) => {
  return (
    <div className="flex flex-col bg-white rounded-lg shadow-lg p-4 hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center mb-4">
        {/* Add a placeholder avatar or profile picture */}
        <div className="w-16 h-16 bg-gray-200 rounded-full flex-shrink-0 overflow-hidden">
          <img 
            src={user.profilePicture || "https://cdn-icons-png.flaticon.com/512/149/149071.png"} 
            alt={user.name} 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="ml-4">
          <h2 className="text-lg font-bold text-gray-800">{user.name}</h2>
          <p className="text-sm text-gray-500">{user.email}</p>
        </div>
      </div>
      <ul className="list-disc pl-5 text-gray-700 space-y-2">
        <li><span className="font-medium">Mobile:</span> {user.mobile_number}</li>
        <li><span className="font-medium">Gender:</span> {user.gender}</li>
        <li><span className="font-medium">Height:</span> {user.height} cm</li>
        {user.location && (
          <li>
            <span className="font-medium">Location:</span> {user.location}
          </li>
        )}
      </ul>
      <div className="mt-4">
        <button className="w-full py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors duration-300">
          Contact
        </button>
      </div>
    </div>
  );
};



export default Advertisements;



