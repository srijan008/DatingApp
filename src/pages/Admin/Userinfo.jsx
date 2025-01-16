import React, { useEffect, useState } from "react";
import "./userinfo.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

const UserInfo = () => {
  // const [verified, setVerified] = useState(true);
  const [enabled, setEnabled] = useState(false);
  const [moreDetails, setMoreDetails] = useState(false);
  const [editStatusMenu, setEditStatusMenu] = useState(false);
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const { id } = useParams();

  useEffect(() => {

    if (users.length === 0) {
      const storedUsers = localStorage.getItem('Users');
      if (storedUsers) {
        const parsedUsers = JSON.parse(storedUsers);
        setUsers(parsedUsers);
      } else {

        fetchUsers();
      }
    }
  }, []);

  const fetchUsers = async () => {
    try {

      const response = await fetch('http://13.235.72.216/auth/get-all-user-for-admin');
      const data = await response.json();
      setUsers(data);

      localStorage.setItem('users', JSON.stringify(data));
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const User = users.find((user) => user.uid === Number(id));

  const handleEditStatusMenu = () => {
    setEditStatusMenu(!editStatusMenu);
  };

  const handleVerify = async (event) => {
    event.preventDefault();
    try {
      // Replace with your actual token retrieval method
      const token = sessionStorage.getItem("token");
      if (!token) {
        toast.error("Authentication token not found");
        return;
      }
  
      const response = await axios.post(
        `http://13.235.72.216/auth/verify-user/${id}`,
        {}, // Post data if required (currently empty)
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (response.data.message === "User verified successfully") {
        toast.success("User verified successfully");
        navigate("/admin/users"); // Navigate without refresh
      } else {
        toast.error(response.data.message || "Failed to verify user");
      }
    } catch (error) {
      console.error("Error verifying user:", error.response?.data || error.message);
      toast.error(
        error.response?.data?.message || error.message || "Error verifying user"
      );
    }
  };
  

  const handleMoreDetails = () => {
    setMoreDetails(!moreDetails);
  };

  if (!User) {
    return <div>User not found</div>;
  }

  return (
    <div className="p-10">
      <div className="p-6 bg-white shadow mt-5 rounded-xl">
        <div className="grid grid-cols-1 md:grid-cols-3">
          <div className="grid grid-cols-3 text-center order-last md:order-first mt-20 md:mt-0">
            <div>
              <p className="font-bold text-gray-700 text-xl">22</p>
              <button className="text-gray-400 hover:text-orange-400 transition transform hover:-translate-y-0.5">
                Blocked
              </button>
            </div>
            <div>
              <p className="font-bold text-gray-700 text-xl">10</p>
              <button className="text-gray-400 hover:text-orange-400 transition transform hover:-translate-y-0.5">
                Reported
              </button>
            </div>
          </div>
          <div className="relative">
            <div className="w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-24 w-24"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
          <div className="space-x-8 flex justify-between mt-32 md:mt-0 md:justify-center">
            <Link to={`/admin/matchtable/${id}`}>
              <button className="text-white py-1 px-3 rounded-xl bg-blue-400 hover:bg-blue-500 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">
                Matches
              </button>
            </Link>
            <Link to={`/admin/swipedetails/${id}`}>
              <button className="text-white py-1 px-4 rounded-xl bg-black hover:bg-gray-500 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">
                Swipe Details
              </button>
            </Link>
          </div>
        </div>

        <div className="mt-20 text-center border-b pb-12">
          <h1 className="text-4xl font-medium text-gray-700">
            {User.name}, <span className="font-light text-gray-500">{User.age}</span>
          </h1>
          <p className="font-light text-gray-600 mt-3">{User.location}</p>

          <p className="mt-8 text-gray-500">
            Verification Status: {" "}
            <span className={User.verification_status ? "text-green-400" : "text-red-400"}>
              {enabled ? "Verified" : "Not-Verified"}
            </span>
          </p>
          {/* <p className="mt-2 text-gray-500">
            Enable Status:{" "}
            <span className={enabled ? "text-green-400" : "text-red-400"}>
              {enabled ? "Enabled" : "Disabled"}
            </span>
          </p> */}
          <button
            onClick={handleEditStatusMenu}
            className="text-blue-500 mt-4 hover:text-orange-400"
          >
            {editStatusMenu ? "" : "Edit Status"}
          </button>
          <div className="flex justify-center">
            {editStatusMenu ? (
              <EditStatus close={handleEditStatusMenu} verify={handleVerify} />
            ) : null}
          </div>
        </div>

        <div className="mt-12 flex flex-col justify-center">
          <p className="text-gray-600 text-center font-light lg:px-16">
            An artist of considerable range, Ryan — the name taken by
            Melbourne-raised, Brooklyn-based Nick Murphy — writes, performs and
            records all of his own music, giving it a warm, intimate feel with a
            solid groove structure. An artist of considerable range.
          </p>
        </div>
        <div className="flex justify-center mt-5">
          {moreDetails ? null : (
            <button
              onClick={handleMoreDetails}
              className="text-blue-500 hover:text-orange-400"
            >
              More Details
            </button>
          )}
        </div>
        {moreDetails ? <MoreDetails user = {User}/> : null}
        <div className="flex justify-center mt-5">
          {moreDetails ? (
            <button
              onClick={handleMoreDetails}
              className="text-blue-500 hover:text-orange-400"
            >
              Less details
            </button>
          ) : null}
        </div>
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
      <div className="flex justify-center items-center bg-gray-100">
      <form className="bg-white shadow-md rounded-lg p-3 max-w-md w-full">
      <div className="flex justify-end">
          <button onClick={close} >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
          </button>
      </div>
        <div className="flex justify-center">
        <h2 className="text-xl font-semibold text-gray-800 mb-4"></h2>
        </div>
        <div>
          <button onClick={verify} className="px-3 py-1 m-5 bg-green-500 text-white font-mono rounded-lg shadow-lg hover:bg-green-400">
            Verify
          </button>
        </div>
      </form>
    </div>
    )
}

export default UserInfo;
