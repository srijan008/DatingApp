import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Users } from "lucide-react";
import axios from "axios";

const AdminDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  if (!id) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
          <p className="text-red-700">Error: Admin ID not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md border border-gray-200">
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">Admin referrals</h1>
          {/* <div className="bg-gray-50 p-4 rounded-lg">
            <h2 className="text-lg mb-2">ID: {id}</h2>
            <h2 className="text-lg mb-2">Name: John Doe</h2>
            <h2 className="text-lg">Mobile Number: 000000023</h2>
          </div> */}
        </div>
        <LinkedUsersPage id={id} />
      </div>
    </div>
  );
};

const LinkedUsersPage = ({ id }) => {
  const [activeTab, setActiveTab] = useState("referred");
  const [referredUsers, setReferredUsers] = useState([]);
  const [totalReferralCount, setTotalReferralCount] = useState(0);
  const [legitReferralCount, setLegitReferralCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLinkedUsers = async () => {
      const token = sessionStorage.getItem("token");
  
      if (!token) {
        setError("Authentication token not found!");
        setLoading(false);
        return;
      }
  
      try {
        console.log("Current Admin Token:", token);
  
        // Step 1: Get the target admin's token
        const adminTokenResponse = await axios.get(
          `http://13.235.72.216/auth/get-adminToken/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Send current admin's token
            },
          }
        );
  
        const adminToken = adminTokenResponse.data.token;
        console.log("Admin Token Retrieved:", adminToken);
  
        if (!adminToken) {
          throw new Error("Admin token not received");
        }
  
        // Step 2: Fetch linked users using the target admin's token
        const linkedUsersResponse = await axios.get(
          "http://13.235.72.216/auth/get-admin-linkedUser",
          {
            headers: {
              Authorization: `Bearer ${adminToken}`, // Use the target admin's token
            },
          }
        );

        const linkedUsersData = linkedUsersResponse.data;
        console.log("Linked Users Data:", linkedUsersData);
  
        if (linkedUsersData.message === "Admin's Linked Users retrieved successfully") {
          setReferredUsers(linkedUsersData.referredUsers || []);
          setTotalReferralCount(linkedUsersData.totalReferralCount || 0);
          setLegitReferralCount(linkedUsersData.legitReferralCount || 0);
        } else {
          setError("No referred users found");
        }
      } catch (error) {
        console.error("Error fetching data:", error.response?.data || error.message);
        setError(
          error.response?.data?.message || error.message || "Error fetching data"
        );
      } finally {
        setLoading(false);
      }
    };
  
    if (id) {
      fetchLinkedUsers();
    }
  }, [id]);
  
  
  

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  if (loading) {
    return (
      <div className="p-6 text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
          <p className="text-red-700">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 border-t border-gray-200">
      <div className="flex space-x-2 mb-6">
        <button
          className={`flex-1 py-2 px-4 text-center rounded-lg transition-colors ${
            activeTab === "referred"
              ? "bg-blue-100 text-blue-700 font-semibold"
              : "bg-gray-100 hover:bg-gray-200"
          }`}
          onClick={() => handleTabClick("referred")}
        >
          Referred Users ({totalReferralCount})
        </button>
        <button
          className={`flex-1 py-2 px-4 text-center rounded-lg transition-colors ${
            activeTab === "created"
              ? "bg-blue-100 text-blue-700 font-semibold"
              : "bg-gray-100 hover:bg-gray-200"
          }`}
          onClick={() => handleTabClick("created")}
        >
          Created Users
        </button>
      </div>

      <div className="mt-4">
        {activeTab === "referred" && (
          <div>
            <div className="mb-4">
              <p className="text-sm text-gray-600">
                Legitimate Referrals: {legitReferralCount} / {totalReferralCount}
              </p>
            </div>
            {referredUsers.length > 0 ? (
              <div className="space-y-3">
                {referredUsers.map((user) => (
                  <Link to = {``}>
                  <div
                    key={user.uid}
                    className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <Users className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{user.name}</h3>
                        <p className="text-sm text-gray-600">
                          {user.age} years • {user.gender}
                        </p>
                        <p className="text-sm text-gray-600">
                          {user.mobile_number}
                        </p>
                        <span
                          className={`text-sm ${
                            user.legit_referral
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {user.legit_referral ? "Legitimate" : "Not Legitimate"}
                        </span>
                      </div>
                    </div>
                  </div>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500 py-8">
                No referred users found
              </p>
            )}
          </div>
        )}

        {activeTab === "created" && (
          <div className="text-center text-gray-500 py-8">
            Created users feature coming soon
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDetails;