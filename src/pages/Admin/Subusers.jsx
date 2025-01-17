import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Blocks, ProgressBar } from "react-loader-spinner";

// Table for displaying all subusers of a user
const SubusersTable = () => {
    const { id } = useParams(); // Get the user's UID from route parameters
    const [subusers, setSubusers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSubusers = async () => {
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
                    if (user && user.subusers) {
                        setSubusers(user.subusers);
                        setLoading(false);  
                    } else {
                        toast.error("No subusers found for this user!");
                    }
                } else {
                    toast.error("Failed to retrieve subusers!");
                }
            } catch (error) {
                toast.error("Error fetching subusers");
                console.error(error);
            }
        };

        fetchSubusers();
    }, [id]);

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-4">
            <h2 className="text-3xl font-bold mb-4">Subusers of User {id}</h2>
            <div className="flex justify-center">
                {loading ? ( <Blocks
                height="80"
                width="80"
                color="#4fa94d"
                ariaLabel="blocks-loading"
                wrapperStyle={{}}
                wrapperClass="blocks-wrapper"
                visible={true}
                />):(
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th className="px-6 py-3">SUID</th>
                            <th className="px-6 py-3">Name</th>
                            <th className="px-6 py-3">Open for Marriage</th>
                            <th className="px-6 py-3">Status</th>
                            <th className="px-6 py-3">View Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {subusers.length > 0 ? (
                            subusers.map((subuser) => (
                                <tr
                                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                    key={subuser.suid}
                                >
                                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {subuser.suid}
                                    </td>
                                    <td className="px-6 py-4">{subuser.name || "N/A"}</td>
                                    <td className="px-6 py-4">
                                        {subuser.open_for_marriage ? "Yes" : "No"}
                                    </td>
                                    <td className="px-6 py-4">
                                        {subuser.verification_status ? "Verified" : "Unverified"}
                                    </td>
                                    <td className="px-6 py-4">
                                        <Link
                                            to={`/admin/userinfo/subusers/${id}/${subuser.suid}`}
                                            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                        >
                                            View
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan="5"
                                    className="text-center px-6 py-4 text-gray-500 dark:text-gray-400"
                                >
                                    No subusers found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                )}
           
            </div>

        </div>
    );
};

// Component to display individual subuser information
export const SubusersInfo = () => {
    const { id, suid } = useParams(); // Get `id` and `suid` from route parameters
    const [subuser, setSubuser] = useState(null); // Initialize subuser as `null`

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
                    const user = response.data.find((user) => user.uid == id); // Find user by ID
                    if (user) {
                        const subuser = user.subusers.find((sub) => sub.suid == suid); // Find subuser by SUID
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
    }, [id, suid]); // Add `id` and `suid` as dependencies

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

    return (
        <div className="p-4">
            <Toaster position="top-center" />
            <h2 className="text-3xl font-bold mb-4">
                Subuser Details (SUID: {subuser.suid})
            </h2>
            <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                <p className="mb-2">
                    <strong>Name:</strong> {subuser.name || "N/A"}
                </p>
                <p className="mb-2">
                    <strong>Open for Marriage:</strong>{" "}
                    {subuser.open_for_marriage ? "Yes" : "No"}
                </p>
                <p className="mb-2">
                    <strong>Verification Status:</strong>{" "}
                    {subuser.verification_status ? "Verified" : "Unverified"}
                </p>
                <p className="mb-2">
                    <strong>Additional Info:</strong> {subuser.additional_info || "N/A"}
                </p>
            </div>
        </div>
    );
};

// Panel to show all subusers and navigation
function SubusersPanel() {
    return (
        <div>
            <Toaster position="top-center" />
            <div className="text-6xl font-mono bg-orange-100 rounded-lg mb-2 p-2 font-bold">
                Subusers List
            </div>

            <SubusersTable />
            <div>
                <Link to="/admin/users">
                    <div className="mt-4 py-2 px-3 inline-block bg-blue-500 rounded-lg shadow-xl text-white hover:shadow-none hover:bg-blue-400">
                        Back to Users
                    </div>
                </Link>
            </div>
        </div>
    );
}

export default SubusersPanel;
