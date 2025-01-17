import React, { createContext, useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../../components/Searchbar';
import toast from 'react-hot-toast';
import { Comment } from 'react-loader-spinner'
import axios from 'axios';
import { Search } from 'lucide-react';

export const AdsDataContext = createContext();

const AdsDataProvider = ({children}) => {
  const [loading, setLoading] = useState(true);
  const [ads, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getAds = async () => {
      const token = window.sessionStorage.getItem("token");
      if (!token) {
        console.error("Authentication token not found!");
        return;
      }

      try {
        const response = await axios.get(
          "http://13.235.72.216/auth/get-all-classified-forSuperAdmin",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if(response.data.message == "Classified retrieved successfully") {
          setData(response.data.classifieds);
          setLoading(false);
      } else {
        setError(response.data.message);
        console.error("Failed to retrieve ads");
      }
      } catch (error) {
        console.error("Error fetching ads:", error);
      }
    };

    getAds();
  }, [setData]);

  return(
    <AdsDataContext.Provider value={{ads, loading, error}}>
      {children}
    </AdsDataContext.Provider>
  )

}


const Advertisements = () => {

  const {ads, loading, error } = useContext(AdsDataContext);
  const [searchTerm, setSearchTerm] = useState("");


  if (error) return <div>Error: {error}</div>;

  const getFilteredAds = () => {
    if (!searchTerm.trim()) return ads;

    const searchQuery = searchTerm.toLowerCase().trim();
    
    return ads.filter((ad) => {
      return (
        (ad?.name?.toLowerCase().includes(searchQuery) || 
        ad?.mobile_number?.toLowerCase().includes(searchQuery) ||
        ad?.email?.toLowerCase().includes(searchQuery))
      );
    });
  };

  const filteredAds = getFilteredAds();

  return (

    <div className='bg-white/20 p-5'>
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search Ads by name, mobile or email ..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
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
        {filteredAds.map((ad) => (
          <div key={ad.cls_id} className="bg-white rounded-lg shadow-md p-4">
            <div className="flex flex-col justify-between mt-4">
              <UserCard user={ad} />
              <div className='flex justify-center'>
              <Link to={`/admin/editform/${ad.cls_id}`} className="text-blue-500 mt-4 hover:text-orange-400 transition transform hover:-translate-y-0.5">
                Update
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
        <li><span className="font-medium">Mobile:</span> {user["mobile_number"]}</li>
        <li><span className="font-medium">Gender:</span> {user.gender}</li>
        <li><span className="font-medium">Height:</span> {user.height} cm</li>
        {user.location && (
          <li>
            <span className="font-medium">Location:</span> {user.location.city}, {user.location.district}, {user.location.state}, 
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

export { AdsDataProvider };





export default Advertisements;



