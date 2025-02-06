import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FallingLines } from 'react-loader-spinner';
import { toast } from 'react-hot-toast';
import { useRecoilState } from 'recoil';
import userAtom from '../../atoms/useratom';
import Loader from '../../components/Loader/Loader';

const UserInfo = () => {
  const [moreDetails, setMoreDetails] = useState(false);
  const [editStatusMenu, setEditStatusMenu] = useState(false);
  const navigate = useNavigate();
  const [users, setUsers] = useRecoilState(userAtom);
  const [userDetails, setUserDetails] = useState({
    pending: 0,
    matches: 0,
    requests: 0,
    disliked: 0,
    reject: 0
  });
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const getUserDetails = async () => {
      const token = window.sessionStorage.getItem("token");
      try {
        const response = await axios.get(`http://13.235.72.216/auth/get-userMatch-details/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        // Log the response to debug
        // console.log('API Responsee:', response.data);
        
        // Check for both "message" and "messsgae" due to the typo in API
        if (response.data.message === "data fetched successfully" || 
            response.data.messsgae === "data fetched successfully") {
          // Extract data directly from response.data since the values are at the root level
          const { pending, matches, requests, disliked, reject } = response.data;
          setUserDetails({
            pending: pending ?? 0, // Use nullish coalescing to handle 0 values correctly
            matches: matches ?? 0,
            requests: requests ?? 0,
            disliked: disliked ?? 0,
            reject: reject ?? 0
          });
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
        toast.error('Failed to fetch user details');
      }
    };
    getUserDetails();
  }, [id]);

  useEffect(() => {
    const fetchUsers = async () => {
      const token = window.sessionStorage.getItem("token");
      try {
        const response = await axios.get(
          "http://13.235.72.216/auth/get-all-user-for-admin",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.data) {
          setUsers(response.data.users);
          setLoading(false);
        }
        // console.log("addfad", response.data.users);

      } catch (error) {
        console.error('Error fetching users:', error);
        toast.error('Failed to fetch users');
      }
    };
    fetchUsers();
  }, []);

  const user = users.find((user) => user.uid === Number(id));

  const handleVerify = async (event) => {
    event.preventDefault();
    try {
      const token = sessionStorage.getItem("token");
      if (!token) {
        toast.error("Authentication token not found");
        return;
      }

      const response = await axios.post(
        `http://13.235.72.216/auth/verify-user/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.message === "User verified successfully") {
        toast.success("User verified successfully");
        navigate("/admin/users");
      } else {
        toast.error(response.data.message || "Failed to verify user");
      }
    } catch (error) {
      console.error("Error verifying user:", error);
      toast.error("Error verifying user");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg flex flex-col items-center justify-center p-4">
        <Loader />
        <h1 className="text-4xl font-mono font-bold mt-4">Loading...</h1>
      </div>

    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <h1 className="text-2xl font-bold text-gray-700">User not found</h1>
      </div>
    );
  }

  return (
    <div className=" p-4 md:p-6">
      <div className="bg-white  rounded-lg shadow-lg p-6 relative mt-24">
        {/* Profile Header */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Stats */}
          <div className="grid grid-cols-3 bg-orange-100 p-2 rounded-lg gap-4 order-last md:order-first">
            {[
              { label: 'Pending', value: userDetails.pending },
              { label: 'Matches', value: userDetails.matches },
              { label: 'Requests', value: userDetails.requests },
              { label: 'Disliked', value: userDetails.disliked },
              { label: 'Reject', value: userDetails.reject },
              { label: 'Reported', value: user.reported_count}
            ].map(({ label, value }) => (
              <div key={label} className="text-center">
                <p className="text-lg font-bold text-gray-700">{value}</p>
                <p className="text-sm text-gray-500 hover:text-orange-400 cursor-pointer">
                  {label}
                </p>
              </div>
            ))}
          </div>

          {/* Avatar */}
          <div className="flex justify-center">
            <div className="w-32 h-32 bg-indigo-100 rounded-full shadow-xl flex items-center justify-center text-indigo-500 -mt-20">
              <svg className="w-16 h-16" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-center gap-5 font-mono">
            <Link to={`/admin/matchtable/${id}`}>
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg hover:shadow-lg transition transform hover:-translate-y-0.5">
                Matches
              </button>
            </Link>
            <Link to={`/admin/pendingtable/${id}`}>
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg hover:shadow-lg transition transform hover:-translate-y-0.5">
                Pending
              </button>
            </Link>
          </div>
        </div>

        {/* User Info */}
        <div className="mt- text-center border-b pb-8">
          <h1 className="text-3xl font-semibold text-gray-700">
            {user.name}, <span className="text-gray-500">{user.age}</span>
          </h1>
          <p className="text-gray-600 ">{user.location}</p>
          <p className="text-gray-600 ">{user.mobile_number}</p>
          <p className="text-gray-600 ">{user.email}</p>
          <p className="mt-4">
            Verification Status:{' '}
            <span className={user.verification_status ? "text-green-500" : "text-red-500"}>
              {user.verification_status ? "Verified" : "Not-Verified"}
            </span>
          </p>
          
          {!user.verification_status && (
            <button
              onClick={() => setEditStatusMenu(!editStatusMenu)}
              className="mt-4 text-blue-500 hover:text-blue-600"
            >
              {editStatusMenu ? "Cancel" : "Edit Status"}
            </button>
          )}
          
          {editStatusMenu && <EditStatus close={() => setEditStatusMenu(false)} verify={handleVerify} />}
        </div>

        {/* Bio */}
        <div className="mt-8">
          <p className="text-gray-600 text-center max-w-2xl mx-auto">
            {user.bio || "No bio available"}
          </p>
        </div>

        {/* More Details Toggle */}
        <div className="mt-6 text-center">
          <button
            onClick={() => setMoreDetails(!moreDetails)}
            className="text-blue-500 hover:text-blue-600"
          >
            {moreDetails ? "Show Less" : "More Details"}
          </button>
        </div>

        {moreDetails && <MoreDetails user={user} />}
      </div>
    </div>
  );
};
const MoreDetails = ({user}) => {

  const userDetails = [
    { label: "Email", value: user.email },
    { label: "Mobile", value: user.mobile },
    { label: "Age", value: user.age },
    { label: "Gender", value: user.gender },
    { label: "Height", value: user.height },
    { label: "Location", value: user.location },
    { label: "Job Location", value: user.jobLocation },
    { label: "Income", value: user.income },
    { label: "Class Assets", value: user.classAssets },
    { label: "Education", value: user.education },
    { label: "Profession", value: user.profession },
    { label: "Occupation Type", value: user.occupationtype },
    { label: "Company", value: user.company },
    { label: "Family Members", value: user.familyMembers },
    { label: "Religion", value: user.religion },
    { label: "Caste", value: user.caste },
    { label: "Pets", value: user.pets },
    { label: "Places", value: user.places },
    { label: "Bio", value: user.bio },
    { label: "Languages Known", value: user.languagesKnown },
    { label: "Personality Type", value: user.personalitytype },
    { label: "Drinking", value: user.drinking },
    { label: "Smoking", value: user.smoking },
    { label: "Diet", value: user.diet },
    { label: "Date of Birth", value: user.dob },
    { label: "Place of Birth", value: user.placeOfbirth },
    { label: "Gotra", value: user.gotra },
    { label: "Weight", value: user.weight },
    { label: "Interest", value: user.interest },
    { label: "Hobbies", value: user.hobbies },
    { label: "Sports", value: user.sports },
    { label: "Travel", value: user.travel },
    { label: "Social Media", value: user.socialMedia },
    { label: "Zodiac", value: user.zodiac },
    { label: "Gambling", value: user.Gambling },
  ];

  return (
    <div className="relative overflow-x-auto mt-5 rounded-xl">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <tbody>
          {userDetails.map(({ label, value }, index) => (
            <tr
              key={index}
              className={`${
                index % 2 === 0
                  ? "bg-white dark:bg-gray-800"
                  : "bg-gray-100 dark:bg-gray-700"
              } border-b dark:border-gray-700`}
            >
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
              >
                {label}:
              </th>
              <td className="px-6 py-4">{value || "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


const EditStatus = ({close, verify}) => {
  
    return (
      <div className="flex justify-center items-center ">
      <form className=" shadow-md rounded-lg p-3 bg-gray-100 max-w-md w-full">
      <div className="flex justify-end">
          <button onClick={close} >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
          </button>
      </div>
        <div className="flex justify-center">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Status</h2>
        </div>
        <div>
          <button onClick={verify} className="px-3 py-1  bg-green-500 text-white font-mono rounded-lg shadow-lg hover:bg-green-400">
            Verify
          </button>
        </div>
      </form>
    </div>
    )
}

export default UserInfo;
