import { Link, useParams } from "react-router-dom";   
import { useEffect, useState } from "react";
import axios from "axios";
import { FallingLines } from 'react-loader-spinner';
import Loader from "../../components/Loader/Loader";

const MatchesPage = () => {
    const { id } = useParams();
    const [matches, setMatches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [noSwipes, setNoSwipes] = useState(false);

    useEffect(() => {
        const fetchMatches = async () => {
            setLoading(true);
            setError(null);
            setNoSwipes(false);
            
            const adminToken = window.sessionStorage.getItem("token");

            if (!adminToken) {
                setError("Admin token not found");
                setLoading(false);
                return;
            }

            try {
                const userTokenResponse = await axios.get(
                    `http://13.235.72.216/auth/get-userToken/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${adminToken}`,
                        },
                    }
                );

                const userToken = userTokenResponse.data.token;
                if (userToken) {
                    const matchesResponse = await axios.get(
                        `http://13.235.72.216/auth/get-all-matches`,
                        {
                            headers: {
                                Authorization: `Bearer ${userToken}`,
                            },
                        }
                    );

                    if (matchesResponse.data.message === "Requests found successfully") {
                        setMatches(matchesResponse.data.Matches);
                    } else if (matchesResponse.data.message === "No  Swipes found") {
                        setNoSwipes(true);
                    }
                } else {
                    setError("User token not found");
                }
            } catch (err) {
                console.error(err);
                setError("No Matches found!");
            } finally {
                setLoading(false);
            }
        };

        fetchMatches();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen rounded-lg flex flex-col items-center justify-center bg-gray-50/50">
                <Loader />
                <div className="text-2xl font-semibold text-gray-700 mt-4">Loading matches...</div>
            </div>

        );
    }

    if (error) {
        return (
            <div className="min-h-screen rounded-lg flex items-center justify-center bg-gray-50/50">
                <div className="text-center p-8 bg-white rounded-lg shadow-lg">
                    <svg className="w-16 h-16 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div className="text-xl font-semibold text-red-600">{error}</div>
                </div>
            </div>
        );
    }

    if (noSwipes) {
        return (
            <div className="min-h-screen rounded-lg flex items-center justify-center bg-gray-50/50">
                <div className="text-center p-8 bg-white rounded-lg shadow-lg">
                    <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4m8-8v16" />
                    </svg>
                    <h1 className="text-2xl font-semibold text-gray-600">No Swipes Found</h1>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen rounded-lg bg-gray-50/50">
            <MatchesDisplay matches={matches} />
        </div>
    );
};

const MatchesDisplay = ({ matches }) => {
    if (!matches || matches.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center p-8 bg-white rounded-lg shadow-lg">
                    <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                    </svg>
                    <h1 className="text-2xl font-semibold text-gray-600">No Matches Available</h1>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold text-gray-800">
                            Matches Overview
                        </h2>
                        <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium">
                            Total: {matches.length}
                        </span>
                    </div>
                </div>
                
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Name
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Email
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Mobile
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Match Date
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {matches.map((match, index) => (
                                <tr key={match.slNo} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">
                                            {match.user.name}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-600">
                                            {match.user.email}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-600">
                                            {match.user.mobile_number}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                            {match.match_result}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                        {new Date(match.swipeTimestamp).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'short',
                                            day: 'numeric'
                                        })}
                                    </td>
                                </tr>

                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default MatchesPage;