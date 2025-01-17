import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useRecoilState } from "recoil";
import userAtom from "../../atoms/useratom";
import { Blocks } from "react-loader-spinner";
import { Search } from "lucide-react";

const UserTable = () => {
  const [users, setUsers] = useRecoilState(userAtom);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      const token = window.sessionStorage.getItem("token");
      if (!token) {
        toast.error("Authentication token not found!");
        return;
      }

      try {
        const response = await axios.get(
          "http://13.235.72.216/auth/get-unverified-users",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Handle API response
        if (response.data) {
          if (response.data.message === "No unverified users found") {
            toast.error(response.data.message);
            setUsers([]);
          } else {
            setUsers(response.data);
            setLoading(false);
          }
        } else {
          toast.error("Failed to retrieve users.");
        }
      } catch (error) {
        toast.error("Error fetching users.");
        console.error("API Error:", error);
      }
    };

    fetchUsers();
  }, [setUsers]);

  const getFilteredUsers = () => {
    if (!searchTerm.trim()) return users;

    const searchQuery = searchTerm.toLowerCase().trim();
    
    return users.filter((user) => {
      return (
        (user?.name?.toLowerCase().includes(searchQuery) || 
        user?.mobile_number?.toLowerCase().includes(searchQuery))
      );
    });
  };

  const filteredUsers = getFilteredUsers();

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search users by name or mobile"
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
      {loading ? (<div className="flex justify-center items-center h-full">
        <Blocks
        height="80"
        width="80"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
        visible={true}
        />
        </div>): (
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">Name</th>
                  <th scope="col" className="px-6 py-3">Pref ID</th>
                  <th scope="col" className="px-6 py-3">Mobile</th>
                  <th scope="col" className="px-6 py-3">Status</th>
                  <th scope="col" className="px-6 py-3 text-center">View Profile</th>
                  <th scope="col" className="px-6 py-3 text-center">Subusers</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <tr
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                      key={user.uid}
                    >
                      <td className="px-6 py-4">{user.name || "N/A"}</td>
                      <td className="px-6 py-4">{user.Pref_id || "N/A"}</td>
                      <td className="px-6 py-4">{user.mobile_number || "N/A"}</td>
                      <td className="px-6 py-4">
                        {user.verification_status ? "Verified" : "Unverified"}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <Link
                          to={`/admin/userinfo/${user.uid}`}
                          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        >
                          View
                        </Link>
                      </td>
                      <td className="px-6 py-4 text-center">
                        {user.subusers && user.subusers.length > 0 ? (
                          <Link
                            to={`/admin/userinfo/subusers/${user.uid}`}
                            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                          >
                            {user.subusers.length} Subusers
                          </Link>
                        ) : (
                          "No Subusers"
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="7"
                      className="text-center px-6 py-4 text-gray-500 dark:text-gray-400"
                    >
                      No users found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
      )}

    </div>
  );
};

function UsersPanel() {
  return (
    <div>
      <Toaster position="top-center" />
      <div className="text-6xl font-mono bg-orange-100 rounded-lg mb-2 p-2 font-bold">
        User List
      </div>
      <UserTable />
      <div>
        <Link to="/admin/createuser">
          <div className="mt-2 py-2 px-3 inline-block bg-blue-500 rounded-lg shadow-xl text-white hover:shadow-none hover:bg-blue-400">
            Create New
          </div>
        </Link>
      </div>
    </div>
  );
}

export default UsersPanel;
