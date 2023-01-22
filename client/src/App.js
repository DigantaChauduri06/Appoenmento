import 'antd/dist/reset.css';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ClipLoader } from 'react-spinners'

// Page Import
import Login from './Pages/Login';
import Register from './Pages/Register';
import Home from './Pages/Home';
import { useSelector } from 'react-redux';
import ProtectedRoutes from './Components/ProtectedRoutes';
import PublicRoute from './Components/PublicRoute';
import ApplyDoctor from './Pages/ApplyDoctor';
import Notification from './Pages/Notification';
import UserList from './Pages/Admin/UserList';
import DoctorList from './Pages/Admin/DoctorList';
import Profile from './Pages/Doctor/Profile';

function App() {
  const { loading } = useSelector(state => state.alerts)
  return (
    <BrowserRouter>
      {
        loading &&
        <div className='loader-parent'>
          <ClipLoader color="#fff"
            size={190}
          />
        </div>
      }
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <Routes>
        <Route path='/login' element={<PublicRoute><Login /></PublicRoute>} />
        <Route path='/register' element={<PublicRoute><Register /></PublicRoute>} />
        <Route path='/' element={<ProtectedRoutes><Home /></ProtectedRoutes>} />
        <Route path='/apply-doctor' element={<ProtectedRoutes><ApplyDoctor /></ProtectedRoutes>} />
        <Route path='/notifications' element={<ProtectedRoutes><Notification /></ProtectedRoutes>} />
        <Route path='/admin/users' element={<ProtectedRoutes><UserList /></ProtectedRoutes>} />
        <Route path='/admin/doctors' element={<ProtectedRoutes><DoctorList /></ProtectedRoutes>} />
        <Route path='/doctor/profile/:doctorId' element={<ProtectedRoutes><Profile /></ProtectedRoutes>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
