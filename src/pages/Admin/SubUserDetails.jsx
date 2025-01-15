import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';
import {ProgressBar} from 'react-loader-spinner';

export const SubusersInfo = () => {
    const { id, suid } = useParams();
    const [subuser, setSubuser] = useState(null);
  
    useEffect(() => {
      const fetchSubuser = async () => {
        const token = window.sessionStorage.getItem("token");
        if (!token) {
          toast.error("Authentication token not found!");
          return;
        }
  
        try {
          const response = await axios.get(
            `http://13.235.72.216/auth/get-unverified-users`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
  
          if (response.data) {
            const user = response.data.find((user) => user.uid == id);
            if (user) {
              const subuser = user.subusers.find((sub) => sub.suid == suid);
              if (subuser) {
                setSubuser(subuser);
                toast.success("Subuser retrieved successfully!");
              } else {
                toast.error("Subuser not found!");
              }
            } else {
              toast.error("User not found!");
            }
          } else {
            toast.error("Failed to retrieve data!");
          }
        } catch (error) {
          toast.error("Error fetching subusers");
          console.error(error);
        }
      };
  
      fetchSubuser();
    }, [id, suid]);
  
    if (!subuser) {
      return (
        <div className="flex justify-center items-center h-screen">
          <p className="text-3xl font-bold text-black">Loading subuser data...</p>
          <ProgressBar
            visible={true}
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="progress-bar-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
          <Toaster position="top-center" />
        </div>
      );
    }
  
    const formatArrayData = (data) => {
      try {
        const parsed = JSON.parse(data);
        return Array.isArray(parsed) && parsed.length > 0 
          ? parsed.join(", ") 
          : "Not specified";
      } catch {
        return "Not specified";
      }
    };

    const clickverify = async () => {
        const token = window.sessionStorage.getItem("token");
        if (!token) {
            toast.error("Authentication token not found!");
            return;
        }
    
        try {
            const response = await axios.post(
                `http://13.235.72.216/auth/verify-subuser`,
                { // Request body
                    uid: id,
                    suid: suid,
                },
                { // Config with headers
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            // Handle response
            if (response.data.message === "subuser verified successfully") {
                toast.success(response.data.message);
            } else if (response.data.message === "subuser already verified") {
                toast.error(response.data.message);
            } else {
                toast.error("Failed to verify subuser");
                console.error("Failed to verify subuser");
            }
        } catch (error) {
            toast.error("Error verifying subuser.");
            console.error("Error verifying subuser:", error);
        }
    };
    
    return (
      <div className="p-6 max-w-6xl mx-auto">
        <Toaster position="top-center" />
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6">
            <h2 className="text-3xl font-bold text-white">
              Subuser Profile (SUID: {subuser.suid})
            </h2>
          </div>
  
          {/* Photo Gallery */}
          {subuser.photos_and_videos && subuser.photos_and_videos.length > 0 && (
            <div className="p-6 border-b">
              <h3 className="text-xl font-semibold mb-4">Photos</h3>
              <div className="flex gap-4 overflow-x-auto">
                {subuser.photos_and_videos.map((photo, index) => (
                  <img
                    key={index}
                    src={photo}
                    alt={`Photo ${index + 1}`}
                    className="w-48 h-48 object-cover rounded-lg"
                  />
                ))}
              </div>
            </div>
          )}
  
          {/* Basic Information */}
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 border-b">
            <h3 className="text-xl font-semibold col-span-full mb-2">Basic Information</h3>
            
            <div>
              <p className="text-gray-600">Name</p>
              <p className="font-medium">{subuser.name || "Not specified"}</p>
            </div>
            
            <div>
              <p className="text-gray-600">Age</p>
              <p className="font-medium">{subuser.age || "Not specified"}</p>
            </div>
            
            <div>
              <p className="text-gray-600">Gender</p>
              <p className="font-medium">{subuser.gender || "Not specified"}</p>
            </div>
            
            <div>
              <p className="text-gray-600">Height</p>
              <p className="font-medium">{subuser.height ? `${subuser.height} cm` : "Not specified"}</p>
            </div>
            
            <div>
              <p className="text-gray-600">Weight</p>
              <p className="font-medium">{subuser.weight ? `${subuser.weight} kg` : "Not specified"}</p>
            </div>
            
            <div>
              <p className="text-gray-600">Date of Birth</p>
              <p className="font-medium">{subuser.date_of_birth || "Not specified"}</p>
            </div>
          </div>
  
          {/* Location & Professional Details */}
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 border-b">
            <h3 className="text-xl font-semibold col-span-full mb-2">Location & Professional Details</h3>
            
            <div>
              <p className="text-gray-600">Location</p>
              <p className="font-medium">{subuser.location || "Not specified"}</p>
            </div>
            
            <div>
              <p className="text-gray-600">Job Location</p>
              <p className="font-medium">{subuser.job_location || "Not specified"}</p>
            </div>
            
            <div>
              <p className="text-gray-600">Education</p>
              <p className="font-medium">{subuser.education || "Not specified"}</p>
            </div>
            
            <div>
              <p className="text-gray-600">Education Details</p>
              <p className="font-medium">{subuser.education_details || "Not specified"}</p>
            </div>
            
            <div>
              <p className="text-gray-600">Occupation</p>
              <p className="font-medium">{subuser.occupation || "Not specified"}</p>
            </div>
            
            <div>
              <p className="text-gray-600">Company</p>
              <p className="font-medium">{subuser.company || "Not specified"}</p>
            </div>
            
            <div>
              <p className="text-gray-600">Income</p>
              <p className="font-medium">{subuser.income || "Not specified"}</p>
            </div>
          </div>
  
          {/* Personal Details */}
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 border-b">
            <h3 className="text-xl font-semibold col-span-full mb-2">Personal Details</h3>
            
            <div>
              <p className="text-gray-600">Religion</p>
              <p className="font-medium">{subuser.religion || "Not specified"}</p>
            </div>
            
            <div>
              <p className="text-gray-600">Caste</p>
              <p className="font-medium">{subuser.caste || "Not specified"}</p>
            </div>
            
            <div>
              <p className="text-gray-600">Gotra</p>
              <p className="font-medium">{subuser.gotra || "Not specified"}</p>
            </div>
            
            <div>
              <p className="text-gray-600">Languages</p>
              <p className="font-medium">{formatArrayData(subuser.languages)}</p>
            </div>
            
            <div>
              <p className="text-gray-600">Zodiac</p>
              <p className="font-medium">{subuser.zodiac || "Not specified"}</p>
            </div>
          </div>
  
          {/* Lifestyle & Preferences */}
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 border-b">
            <h3 className="text-xl font-semibold col-span-full mb-2">Lifestyle & Preferences</h3>
            
            <div>
              <p className="text-gray-600">Drinking Habits</p>
              <p className="font-medium">{subuser.drinking_habits || "Not specified"}</p>
            </div>
            
            <div>
              <p className="text-gray-600">Smoking</p>
              <p className="font-medium">{subuser.smoking === null ? "Not specified" : subuser.smoking ? "Yes" : "No"}</p>
            </div>
            
            <div>
              <p className="text-gray-600">Diet Preference</p>
              <p className="font-medium">{subuser.diet_preference || "Not specified"}</p>
            </div>
            
            <div>
              <p className="text-gray-600">Personality Type</p>
              <p className="font-medium">{formatArrayData(subuser.personality_type)}</p>
            </div>
          </div>
  
          {/* Interests & Hobbies */}
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <h3 className="text-xl font-semibold col-span-full mb-2">Interests & Hobbies</h3>
            
            <div>
              <p className="text-gray-600">Interests</p>
              <p className="font-medium">{formatArrayData(subuser.interest)}</p>
            </div>
            
            <div>
              <p className="text-gray-600">Hobbies</p>
              <p className="font-medium">{formatArrayData(subuser.hobbies)}</p>
            </div>
            
            <div>
              <p className="text-gray-600">Sports</p>
              <p className="font-medium">{formatArrayData(subuser.sports)}</p>
            </div>
            
            <div>
              <p className="text-gray-600">Travel</p>
              <p className="font-medium">{formatArrayData(subuser.travel)}</p>
            </div>
            
            <div>
              <p className="text-gray-600">Exercise</p>
              <p className="font-medium">{formatArrayData(subuser.exercise)}</p>
            </div>
            
            <div>
              <p className="text-gray-600">Places Interested</p>
              <p className="font-medium">{formatArrayData(subuser.places_interested)}</p>
            </div>
          </div>
  
          {/* Description */}
          {subuser.description && (
            <div className="p-6 border-t">
              <h3 className="text-xl font-semibold mb-2">About</h3>
              <p className="text-gray-700">{subuser.description}</p>
            </div>
          )}
          {subuser.verification_status ?
                    (<div className='flex justify-center items-center p-4 text-lg bg-gray-300 m-3 rounded-lg'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 mr-2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg> Verified
                        </div>):(
                      <button onClick={clickverify} className='bg-green-500 p-2 m-2 rounded-lg w-[98.5%] hover:bg-green-600 text-white font-medium font-mono '>
                      Verify Subuser
                    </button>
          )}

        </div>
      </div>
    );
  };