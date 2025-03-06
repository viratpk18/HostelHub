import { Routes, Route } from "react-router-dom";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import ResetPassword from "./components/auth/ResetPassword";
import Admin from "./components/dashboard/Admin/AdminDashboard";
import Home from "./Home";

import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentFailed from "./pages/PaymentFailed";

import Logout from "./components/dashboard/Admin/Logout";
import ManageRooms from "./components/dashboard/Admin/ManageRooms";
import ManageStudents from "./components/dashboard/Admin/ManageStudents";
import ManagePayments from "./components/dashboard/Admin/ManagePayments";
import Announcements from "./components/dashboard/Admin/Announcements";

import StudentDashboard from "./components/dashboard/Student/StudentDashboard";
import StudentProfile from "./components/dashboard/Student/StudentProfile";
import LeaveRequests from "./components/dashboard/Student/LeaveRequests";
import Complaints from "./components/dashboard/Student/Complaints";
import ViewAnnouncements from "./components/dashboard/Student/ViewAnnouncements";
import Payments from "./components/dashboard/Student/Payments";
import StudentLogout from "./components/dashboard/Student/StudentLogout";

import WardenDashboard from "./components/dashboard/Warden/WardenDashboard";
import WardenComplaints from "./components/dashboard/Warden/WardenComplaints";
import WardenLeaveRequests from "./components/dashboard/Warden/WardenLeaveRequests";
import WardenRoomManagement from "./components/dashboard/Warden/WardenRoomManagement";
import WardenAnnouncements from "./components/dashboard/Warden/WardenAnnouncements";
import WardenLogout from "./components/dashboard/Warden/WardenLogout";


const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />

      <Route path="/payment-success" element={<PaymentSuccess />} />
      <Route path="/payment-failed" element={<PaymentFailed />} />

      <Route path="/dashboard/admin" element={<Admin />} /> 
      <Route path="/admin/logout" element={<Logout />} />
      <Route path="/admin/manage-rooms" element={<ManageRooms />} />
      <Route path="/admin/manage-students" element={<ManageStudents />} />
      <Route path="/admin/manage-payments" element={<ManagePayments />} />
      <Route path="/admin/announcements" element={<Announcements />} />

      <Route path="/dashboard/student" element={<StudentDashboard />} />
      <Route path="/student/profile" element={<StudentProfile />} />
      <Route path="/student/announcements" element={<ViewAnnouncements />} />
      <Route path="/student/leave" element={<LeaveRequests />} />
      <Route path="/student/complaints" element={<Complaints />} />
      <Route path="/student/payments" element={<Payments />} />
      <Route path="/student/logout" element={<StudentLogout />} />

      <Route path="/dashboard/warden" element={<WardenDashboard />} />
      <Route path="/warden/complaints" element={<WardenComplaints />} />
      <Route path="/warden/leaves" element={<WardenLeaveRequests />} />
      <Route path="/warden/rooms" element={<WardenRoomManagement />} />
      <Route path="/warden/announcements" element={<WardenAnnouncements />} />
      <Route path="/warden/logout" element={<WardenLogout />} />


      <Route path="*" element={<h1>404 Not Found</h1>} />
    </Routes>
  );
};

export default App;
