import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import HomePage from "./pages/Home/HomePage";
import UsersPanel from "./pages/Admin/Userspanel";
import UserInfo from "./pages/Admin/UserInfo";
import ClassifiedForm from "./pages/Admin/ClassifiedForm";
import Chart1 from "./pages/Admin/Insights";
import Advertisements from "./pages/Admin/Advertisements";
import MatchTable from "./pages/Admin/Matches";
import SwipeDetails from "./pages/Admin/SwipeDetails";
import EditForm from "./pages/Admin/UpdateAds";
import CreateUserForm from "./pages/Admin/CreateUser";
import LoginForm from "./pages/Admin/Login";
import PrivateRoute from "./atoms/PrivateRoute"; // Import the PrivateRoute component
import { RecoilRoot } from "recoil";
import { motion } from 'framer-motion'; // Add this import
import { useEffect, useState } from "react";
import AdminComments from "./pages/Admin/AdminComments";
import SubusersPanel from "./pages/Admin/Subusers";
import { SubusersInfo } from "./pages/Admin/SubUserDetails";
import SuperAdminDashboard from "./pages/Admin/SuperAdminProfile";
import LinkedUsersPage from "./pages/Admin/AdmindetailsPage";
import AdminDetails from "./pages/Admin/AdmindetailsPage";
function AdminLayout({ children }) {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-grow p-4">
        {/* Add animation for dynamic content */}
        <motion.div
          key={children.key} // Unique key for re-render
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 50 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
}

function Paging() {
  const [Login, setLogin] = useState(false);
  const token = window.sessionStorage.getItem('token');

  // Use effect to update login state based on token
  useEffect(() => {
    if (token) {
      setLogin(true);
    }
  }, [token]);

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        
        {/* Conditional Login Route */}
        {Login ? (
          <Route path="/login" element={<Navigate to="/admin/users" />} />
        ) : (
          <Route path="/login" element={<LoginForm />} />
        )}

        {/* Admin Routes (Protected) */}
        <Route
          path="/admin/*"
          element={
            <PrivateRoute>
              <AdminLayout>
                <Routes>
                  <Route path="users" element={<UsersPanel />} />
                  <Route path="userinfo/:id" element={<UserInfo />} />
                  <Route path="classifiedform" element={<ClassifiedForm />} />
                  <Route path="charts" element={<Chart1 />} />
                  <Route path="admincomments" element={<AdminComments/>} />
                  <Route path="advertisements" element={<Advertisements />} />
                  <Route path="matchtable/:id" element={<MatchTable />} />
                  <Route path="swipedetails/:id" element={<SwipeDetails />} />
                  <Route path="editform/:id" element={<EditForm />} />
                  <Route path="userinfo/subusers/:id" element={<SubusersPanel />} />
                  <Route path="userinfo/subusers/:id/:suid" element={<SubusersInfo />} />
                  <Route path="createuser" element={<CreateUserForm />} />
                  <Route path="superadminprofile" element={<SuperAdminDashboard />} />
                  <Route path="linkedusers/:id" element={<AdminDetails />} />
                  <Route path="*" element={<div>Page not found</div>} />
                </Routes>
              </AdminLayout>
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

const App = () => {
  return (
    <RecoilRoot>
      <Paging />
    </RecoilRoot>
  );
};

export default App;
