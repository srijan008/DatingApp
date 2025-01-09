import React, { Children, useState } from "react";
import "./UserInfo.css";
import { Link } from "react-router-dom";


const UserInfo = () => {
    const [verified, setVerified] = useState(true);
    const [enabled, setEnabled] = useState(false);
    const [moreDetails, setMoreDetails] = useState(false);
    const [editstatusmenu, setEditStatusMenu] = useState(false);

    const handleEditStatusMenu = () => {
        setEditStatusMenu(!editstatusmenu);
    }

    const handleVerify = () => {
        setVerified(true);
    }

    const handleEnable = () => {
        setEnabled(true);
    }
    const handlemoredetails = () => {
        setMoreDetails(!moreDetails);
    }
  return (
        <div class="p-10">
        <div class="p-6 bg-white shadow mt-5 rounded-xl ">
        <div class="grid grid-cols-1 md:grid-cols-3">
            <div class="grid grid-cols-3 text-center order-last md:order-first mt-20 md:mt-0">
            <div>
                <p class="font-bold text-gray-700 text-xl">22</p>
                <button class="text-gray-400 hover:text-orange-400 transition transform hover:-translate-y-0.5 transition">Friends</button>
            </div>
            <div>
                <p class="font-bold text-gray-700 text-xl">10</p>
                <button class="text-gray-400 hover:text-orange-400 transition transform hover:-translate-y-0.5 transition">Photos</button>
            </div>
                <div>
                <p class="font-bold text-gray-700 text-xl">89</p>
                <button class="text-gray-400 hover:text-orange-400 transition transform hover:-translate-y-0.5 transition">Comments</button>
            </div>
            </div>
            <div class="relative">
            <div class="w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-24 w-24" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
        </svg>
            </div>
            </div>
            <div class="space-x-8 flex justify-between mt-32 md:mt-0 md:justify-center">
        <Link to ="/admin/matchtable/:id">
        <button className="text-white py-2 px-4 uppercase rounded-xl bg-blue-400 hover:bg-blue-500 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">
         Matches
        </button>
        </Link>
        <Link to ="/admin/swipedetails/:id">
        <button className="text-white py-2 px-4 uppercase rounded-xl bg-black hover:bg-gray-500 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">
         Swipe Details
        </button>
        </Link>
            </div>
        </div>

        <div class="mt-20 text-center border-b pb-12">
            <h1 class="text-4xl font-medium text-gray-700">Utkarsh, <span class="font-light text-gray-500">19</span></h1>
            <p class="font-light text-gray-600 mt-3">Bucharest, Romania</p>

            <p class="mt-8 text-gray-500">Solution Manager - Creative Tim Officer</p>
            <p class="mt-2 text-gray-500">University of Computer Science</p>
            <p class="mt-2 text-gray-500">Verification Status: <span className={verified ? "text-green-400": "text-red-400" }>{verified ? "Verified" : "Not Verified"}</span></p>
            <p class="mt-2 text-gray-500">Enable Status: <span className={enabled ? "text-green-400": "text-red-400" }>{enabled ? "Enabled" : "Disabled"}</span></p>
            <button onClick={handleEditStatusMenu} className="text-blue-500 mt-4 hover:text-orange-400 transition transform hover:-translate-y-0.5">{editstatusmenu ? "" : "Edit Status"}</button>
            <div className="flex justify-center">{editstatusmenu ? <EditStatus close = {handleEditStatusMenu} />: null}</div>
        </div>

        <div class="mt-12 flex flex-col justify-center">
            <p class="text-gray-600 text-center font-light lg:px-16">An artist of considerable range, Ryan — the name taken by Melbourne-raised, Brooklyn-based Nick Murphy — writes, performs and records all of his own music, giving it a warm, intimate feel with a solid groove structure. An artist of considerable range.</p>
        </div>
        <div className="flex justify-center mt-5">
            {moreDetails ? null : <button onClick={handlemoredetails} className="text-blue-500 hover:text-orange-400">More Details</button>}
        </div>
        <div>

        </div>
            {moreDetails ? <MoreDetails/> : null}
            <div className="flex justify-center mt-5">
                {moreDetails ? <button onClick={handlemoredetails} className="text-blue-500 hover:text-orange-400">Less details</button> : null}
            </div>
        </div>
        </div>
  );
};

const MoreDetails = () => {
    return(
        <div class="relative overflow-x-auto mt-5">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <tbody>
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            Apple MacBook Pro 17"
                        </th>
                        <td class="px-6 py-4">
                            Silver
                        </td>
                        <td class="px-6 py-4">
                            Laptop
                        </td>
                        <td class="px-6 py-4">
                            $2999
                        </td>
                    </tr>
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            Microsoft Surface Pro
                        </th>
                        <td class="px-6 py-4">
                            White
                        </td>
                        <td class="px-6 py-4">
                            Laptop PC
                        </td>
                        <td class="px-6 py-4">
                            $1999
                        </td>
                    </tr>
                    <tr class="bg-white dark:bg-gray-800">
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            Magic Mouse 2
                        </th>
                        <td class="px-6 py-4">
                            Black
                        </td>
                        <td class="px-6 py-4">
                            Accessories
                        </td>
                        <td class="px-6 py-4">
                            $99
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

    )
}


const EditStatus = ({close}) => {

    const [formData, setFormData] = useState({
        verified: false,
        enable: false,
      });
    
      // Handle change for radio buttons
      const handleChange = (field, value) => {
        setFormData((prev) => ({
          ...prev,
          [field]: value,
        }));
      };
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
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Status</h2>
          </div>
  
          {/* Verified Feature */}
          <div className="flex gap-10 justify-center">
          <div className="mb-6">
            <p className="text-sm font-medium text-gray-700 mb-2">Verified</p>
            <div className="flex items-center mb-2">
              <input
                id="verified-true"
                type="radio"
                value="true"
                name="verified"
                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                onChange={() => handleChange('verified', true)}
                checked={formData.verified === true}
              />
              <label
                htmlFor="verified-true"
                className="ml-2 text-sm font-medium text-gray-900"
              >
                True
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="verified-false"
                type="radio"
                value="false"
                name="verified"
                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                onChange={() => handleChange('verified', false)}
                checked={formData.verified === false}
              />
              <label
                htmlFor="verified-false"
                className="ml-2 text-sm font-medium text-gray-900"
              >
                False
              </label>
            </div>
          </div>
  
          {/* Enable Feature */}
          <div className="mb-6">
            <p className="text-sm font-medium text-gray-700 mb-2">Enable</p>
            <div className="flex items-center mb-2">
              <input
                id="enable-true"
                type="radio"
                value="true"
                name="enable"
                className="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500"
                onChange={() => handleChange('enable', true)}
                checked={formData.enable === true}
              />
              <label
                htmlFor="enable-true"
                className="ml-2 text-sm font-medium text-gray-900"
              >
                True
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="enable-false"
                type="radio"
                value="false"
                name="enable"
                className="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500"
                onChange={() => handleChange('enable', false)}
                checked={formData.enable === false}
              />
              <label
                htmlFor="enable-false"
                className="ml-2 text-sm font-medium text-gray-900"
              >
                False
              </label>
            </div>
          </div>

          </div>
          <button onClick={()=>{
            alert("Changes Applied")
          }} className="bg-orange-400 text-white p-1 rounded-xl px-2 hover:bg-orange-300">Apply Changes</button>
 
  
          {/* Display JSON Output */}
          <div className="mt-6 bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">Selected Options (JSON):</h3>
            <pre className="text-sm bg-gray-100 p-2 rounded-md">{JSON.stringify(formData, null, 2)}</pre>
          </div>
        </form>
      </div>
      )
}

export default UserInfo;
