import { Link } from "react-router-dom";
import Searchbar from "../../components/Searchbar";
import { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useRecoilState } from "recoil";
import userAtom from "../../atoms/useratom";

const UserTable = () => {
  const [users, setUsers] = useRecoilState(userAtom);

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
            setUsers([]); // Set users to an empty array
            localStorage.removeItem("Users"); // Clear local storage if no users are found
          } else {
            toast.success("Users retrieved successfully!");
            setUsers(response.data);
            localStorage.setItem("Users", JSON.stringify(response.data));
          }
        } else {
          toast.error("Failed to retrieve users.");
        }
      } catch (error) {
        toast.error("Error fetching users.");
        console.error("API Error:", error);
      }
    };

    // Fetch users on component mount or fallback to stored users if available
    const storedUsers = localStorage.getItem("Users");
    if (storedUsers) {
      try {
        const parsedUsers = JSON.parse(storedUsers);
        if (Array.isArray(parsedUsers) && parsedUsers.length > 0) {
          setUsers(parsedUsers);
        } else {
          fetchUsers(); 
        }
      } catch (error) {
        console.error("Error parsing stored users:", error);
        fetchUsers(); 
      }
    } else {
      fetchUsers();
    }
  }, [setUsers]);

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <div>
        <Searchbar />
      </div>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">UID</th>
            <th scope="col" className="px-6 py-3">Name</th>
            <th scope="col" className="px-6 py-3">Pref ID</th>
            <th scope="col" className="px-6 py-3">Mobile</th>
            <th scope="col" className="px-6 py-3">Status</th>
            <th scope="col" className="px-6 py-3 text-center">View Profile</th>
            <th scope="col" className="px-6 py-3 text-center">Subusers</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                key={user.uid}
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {user.uid}
                </th>
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
