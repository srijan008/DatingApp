import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import HomePage from "./pages/Home/HomePage";
import UsersPanel from "./pages/Admin/Userspanel";
import UserInfo from "./pages/Admin/UserInfo";
import ClassifiedForm from "./pages/Admin/ClassifiedForm";

import { motion } from "framer-motion";
import  Chart1  from "./pages/Admin/Insights";
import Advertisements from "./pages/Admin/Advertisements";
import MatchTable from "./pages/Admin/Matches";
import SwipeDetails from "./pages/Admin/SwipeDetails";
import Notifications from "./pages/Admin/Notifications";
import EditForm from "./pages/Admin/UpdateAds";
import CreateUserForm from "./pages/Admin/CreateUser";

function AdminLayout({ children }) {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-grow p-4">
        {/* Add animation href the dynamic content */}
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


function AdminRoutes() {
  const location = useLocation();

  // Match and render the appropriate component
  switch (location.pathname) {
    case "/admin/users":
      return <UsersPanel />;
    case "/admin/userinfo/:id":
      return <UserInfo />;
    case "/admin/classifiedform":
      return <ClassifiedForm />;
    case "/admin/charts":
      return <Chart1/>
    case "/admin/advertisements":
      return <Advertisements/>
    case "/admin/matchtable/:id":
      return <MatchTable/>
    case "/admin/swipedetails/:id":
      return <SwipeDetails/>
    case "/admin/notifications":
      return <Notifications/>
    case "/admin/formedit/:id":
      return <EditForm/>    
    case "/admin/createuser":
      return <CreateUserForm/>
    default:
      return <div>Page not found</div>;
  }
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Routes without the Sidebar */}
        <Route path="/" element={<HomePage />} />

        {/* Admin routes with persistent layout */}
        <Route
          path="/admin/*"
          element={
            <AdminLayout>
              {/* Render Admin Routes dynamically */}
              <AdminRoutes />
            </AdminLayout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

