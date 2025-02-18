import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Register from './Components/Auth/Register';
import Login from './Components/Auth/Login';
import ResetPassword from './Components/Auth/ResetPassword';
import Student from './Components/Dashboard/Student';
import Staff from './Components/Dashboard/Staff';
import Admin from './Components/Dashboard/Admin';
import Warden from './Components/Dashboard/Warden';

const App = () => {
  return (
    <div>
      < Router>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/dashboard/student" element={<Student />} />
          <Route path="/dashboard/staff" element={<Staff />} />
          <Route path="/dashboard/admin" element={<Admin />} />
          <Route path="/dashboard/warden" element={<Warden />} />
        </Routes> 
      </Router> 
    </div>
  )
}

export default App


