import React, { useEffect, useState } from "react";
import { Search, Users } from "lucide-react";
import { NavLink } from "react-router-dom";
import { Puff } from "react-loader-spinner";
import Loader from "../../components/Loader/Loader";

const SuperAdminDashboard = () => {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchAdmins = async () => {
      const token = sessionStorage.getItem("token");
      
      if (!token) {
        setError("Authentication token not found!");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("http://13.235.72.216/auth/get-all-admin", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        if (data.message === "Admins retrieved successfully") {
          setAdmins(data.admin);
        } else {
          throw new Error(data.message || "Failed to fetch admins");
        }
      } catch (error) {
        setError(error.message || "Error fetching admins");
        console.error("Error fetching admins:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdmins();
  }, []);

  // Improved search function with multiple criteria and error handling
  const getFilteredAdmins = () => {
    if (!searchTerm.trim()) return admins;

    const searchQuery = searchTerm.toLowerCase().trim();
    
    return admins.filter((admin) => {
      return (
        (admin?.name?.toLowerCase().includes(searchQuery) || 
        admin?.email?.toLowerCase().includes(searchQuery) ||
        admin?.age?.toString().includes(searchQuery))
      );
    });
  };

  const filteredAdmins = getFilteredAdmins();

  if (error) {
    return (
      <div className="max-w-6xl mx-auto mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
        <p className="text-red-700">{error}</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md border">
        <div className="p-6 border-b">
          <h1 className="text-2xl font-bold">SuperAdmin Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage administrators and their referred users
          </p>
        </div>

        <div className="p-6">
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search admins by name, email, or age..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {loading ? (
            <div className="flex justify-center py-8">
              <Loader />
            </div>
          ) : filteredAdmins.length > 0 ? (
            <div className="space-y-4">
              {filteredAdmins.map((admin) => (
                <NavLink
                  key={admin.adId}
                  to={`/admin/linkedusers/${admin.adId}`}
                  className="block border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="p-4 flex items-center space-x-4">
                    <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Users className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{admin.name}</h3>
                      <p className="text-sm text-gray-500">
                        {admin.age} years • {admin.email}
                      </p>
                    </div>
                  </div>
                </NavLink>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              No administrators found matching your search criteria
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;