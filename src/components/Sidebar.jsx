import datinglogo from '../assets/datinglogo.png'
import {Link, useLocation} from 'react-router-dom'
import { useSetRecoilState } from 'recoil'
import { isLoggedin } from '../atoms/loginatom'

const Sidebar = () => {
    const setlogin = useSetRecoilState(isLoggedin);
    const location = useLocation();
    
    const isActive = (path) => {
        return location.pathname === path;
    };
    
    const hadnleLogout = ()=>{
        setlogin(false);
        window.sessionStorage.removeItem('token');
        window.location.reload();
    }

    return (
        <div className='relative'>
            <button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
            <span className="sr-only">Open sidebar</span>
            <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
            </svg>
            </button>

            <aside id="logo-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
            <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                <Link to="/" className="flex items-center ps-2.5 mb-5">
                    <img src={datinglogo} className="h-6  mr-1 sm:h-7" alt="Flowbite Logo" />
                    <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Famly.in</span>
                </Link>
                <ul className="space-y-2 font-medium">
                <li>
                        <Link 
                            to="/admin/users" 
                            className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${
                                isActive('/admin/users') ? 'bg-gray-100 dark:bg-gray-700' : ''
                            }`}
                        >
                        <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                            <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z"/>
                        </svg>
                        <span className="flex-1 ms-3 whitespace-nowrap">Users</span>
                        </Link>
                    </li>
                    <li>
                        <Link 
                            to="/admin/classifiedform" 
                            className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${
                                isActive('/admin/classifiedform') ? 'bg-gray-100 dark:bg-gray-700' : ''
                            }`}
                        >
                        <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                            <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z"/>
                        </svg>
                        <span className="flex-1 ms-3 whitespace-nowrap">Classified Forms</span>
                        </Link>
                    </li>
                    <li>
                        <Link 
                            to="/admin/advertisements" 
                            className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${
                                isActive('/admin/advertisements') ? 'bg-gray-100 dark:bg-gray-700' : ''
                            }`}
                        >
                        <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M19 3H5c-1.1 0-1.99.9-1.99 2L3 19c0 1.1.9 2 1.99 2H19c1.1 0 1.99-.9 1.99-2V5c0-1.1-.9-2-1.99-2zm-1 16H6V8h12v11zM6 6V5h12v1H6z"/>
                            </svg>

                        <span className="flex-1 ms-3 whitespace-nowrap">All Ads</span>
                        </Link>
                    </li>
                    <li>
                        <Link 
                            to="/admin/charts" 
                            className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${
                                isActive('/admin/charts') ? 'bg-gray-100 dark:bg-gray-700' : ''
                            }`}
                        >
                        <svg className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M3 3v18h18V3H3zm16 16H5V5h14v14zm-4-4h-3V9h3v6zm-5 0H7V7h3v8zm-5 0H2v4h3v-4z"/>
                        </svg>

                        <span className="flex-1 ms-3 whitespace-nowrap">Insights</span>
                        </Link>
                    </li>
                    <li>
                        <Link 
                            to="/admin/superadminprofile" 
                            className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${
                                isActive('/admin/superadminprofile') ? 'bg-gray-100 dark:bg-gray-700' : ''
                            }`}
                        >
                        <svg
                            className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white border border-gray-400 rounded-lg"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            >
                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                            </svg>

                        <span className="flex-1 ms-3 whitespace-nowrap">Admin Profile</span>
                        </Link>
                    </li>
                    <li className='flex'>
                        <button onClick={hadnleLogout} className="flex w-full items-center justify-left p-2 text-gray-900 rounded-lg dark:text-white hover:bg-red-100 dark:hover:bg-red-400/50 group">
                        <svg className="flex w-5 h-5  text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 16">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"/>
                        </svg>
                        <span className=" ms-3">Logout</span>
                        </button>
                    </li>
                </ul>
            </div>
            </aside>

            <div className="p-4 sm:ml-64">

            </div>
        </div>
    )
}

export default Sidebar