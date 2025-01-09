import { ReceiptRussianRuble } from "lucide-react";
import { Link } from "react-router-dom";

const UserTable = () => {
    const Users = [
        {
            Uid: "123",
            name: "Utkarsh",
            Datecreated: "12/12/12",
            verificationStatus: "verified",
        },
    ];

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">UID</th>
                        <th scope="col" className="px-6 py-3">Name</th>
                        <th scope="col" className="px-6 py-3">Date Created</th>
                        <th scope="col" className="px-6 py-3">Status</th>
                        <th scope="col" className="px-6 py-3 text-center">View Profile</th>
                    </tr>
                </thead>
                <tbody>
                    {Users.map((user) => (
                        <tr
                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                            key={user.Uid}
                        >
                            <th
                                scope="row"
                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                            >
                                {user.Uid}
                            </th>
                            <td className="px-6 py-4">{user.name}</td>
                            <td className="px-6 py-4">{user.Datecreated}</td>
                            <td className="px-6 py-4">{user.verificationStatus}</td>
                            <td className="px-6 py-4 text-center">
                                <a
                                    href="/admin/userinfo/:id"
                                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                >
                                    View
                                </a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

function UsersPanel() {
    return (
        <div className="">
            <div className="text-6xl font-mono bg-orange-100 rounded-lg mb-10 p-2 font-bold">
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
